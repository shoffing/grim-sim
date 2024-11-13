import Character from '@/app/components/character';
import CharacterControls from '@/app/components/character-controls';
import GameControls from '@/app/components/game-controls';
import Reminder from '@/app/components/reminder';
import ReminderControls from '@/app/components/reminder-controls';
import Token, { TokenPosition } from '@/app/components/token';
import * as slice from '@/app/game-slice';
import { selectGameState } from '@/app/game-slice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import CharacterSelect from '@/app/screens/character-select';
import ReminderSelect from '@/app/screens/reminder-select';
import CharacterData from '@/constants/characters/character-data';
import { getCharacterById, getCharactersByEdition } from '@/constants/characters/characters';
import ReminderData from '@/constants/reminder-data';
import Team from '@/constants/team';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { LayoutChangeEvent, LayoutRectangle, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { MD3Theme, Surface, withTheme } from 'react-native-paper';
import { useImmer } from 'use-immer';

interface GrimProps {
  theme: MD3Theme,
}

interface GrimCharacterData {
  data: CharacterData;
  position: TokenPosition;
  team: Team;
  front: boolean;
}

interface GrimReminderData {
  data: ReminderData;
  position: TokenPosition;
  front: boolean;
}

const CHARACTER_SIZE = 128;
const REMINDER_SIZE = 92;

function Grim({ theme }: GrimProps) {
  const router = useRouter();

  const [focused, setFocused] = useState(true);
  useFocusEffect(() => {
    setFocused(true);
    return () => setFocused(false);
  });

  const dispatch = useAppDispatch();
  const { characters: characterIds, edition, initialize } = useAppSelector(state => selectGameState(state.game));
  const gameCharacters = characterIds.map(getCharacterById);

  /** Current characters on the grimoire "board". */
  const [characters, setCharacters] = useImmer<GrimCharacterData[]>(gameCharacters.map(char => {
    return ({ data: char, position: { x: 0, y: 0 }, team: char.team, front: false });
  }));
  const setCharacterPosition = (idx: number, position: TokenPosition) => {
    setCharacters(draft => {
      if (draft[idx]) draft[idx].position = position;
    });
  };
  const setCharacterFront = (idx: number) => {
    setCharacters(draft => {
      draft.forEach((character, oIdx) => {
        character.front = oIdx === idx;
      });
    });
  };
  const addCharacter = (character: CharacterData) => {
    setCharacters(draft => {
      draft.push({
        data: character,
        front: false,
        team: character.team,
        position: (
          layout ?
            {
              x: (layout.width / 2) - CHARACTER_SIZE / 2,
              y: (layout.height / 2) - CHARACTER_SIZE / 2,
            } :
            { x: 0, y: 0 }
        ),
      });
    });
    selectCharacter(characters.length);
  };

  /** Current reminders on the grimoire "board". */
  const [reminders, setReminders] = useImmer<GrimReminderData[]>([]);
  const setReminderPosition = (idx: number, position: TokenPosition) => {
    setReminders(draft => {
      if (draft[idx]) draft[idx].position = position;
    });
  };
  const setReminderFront = (idx: number) => {
    setReminders(draft => {
      draft.forEach((reminder, oIdx) => {
        reminder.front = oIdx === idx;
      });
    });
  };
  const addReminder = (reminder: ReminderData, position?: TokenPosition) => {
    setReminders(draft => {
      draft.push({
        data: reminder,
        front: true,
        position: position || (
          layout ?
            {
              x: (layout.width / 2) - REMINDER_SIZE / 2,
              y: (layout.height / 2) - REMINDER_SIZE / 2,
            } :
            { x: 0, y: 0 }
        ),
      });
    });
    selectReminder(reminders.length);
  };

  const clearSelections = () => {
    setSelectedCharacterIdx(undefined);
    setSelectedReminderIdx(undefined);
  };

  /** Handling CharacterControls. */
  const [selectedCharacterIdx, setSelectedCharacterIdx] = useState<number>();
  const selectCharacter = (idx?: number) => {
    clearSelections();
    setSelectedCharacterIdx(idx);
  };
  const swapSelectedCharacterTeam = () => {
    if (selectedCharacterIdx == null) return;
    setCharacters(draft => {
      draft[selectedCharacterIdx].team = (draft[selectedCharacterIdx].team === Team.Good ? Team.Evil : Team.Good);
    });
  };
  const replaceSelectedCharacterData = (newData: CharacterData) => {
    if (selectedCharacterIdx == null) return;
    setCharacters(draft => void (draft[selectedCharacterIdx].data = newData));
  };
  const removeSelectedCharacter = () => {
    if (selectedCharacterIdx == null) return;
    setCharacters(draft => void (draft.splice(selectedCharacterIdx, 1)));
    setSelectedCharacterIdx(undefined);
  };

  /** Handling character selection. */
  const [characterSelectVisible, setCharacterSelectVisible] = useState(false);
  const showCharacterSelect = () => setCharacterSelectVisible(true);
  const hideCharacterSelect = () => setCharacterSelectVisible(false);
  const onCharacterSelect = (selectedCharacter: CharacterData) => {
    if (selectedCharacterIdx != null) {
      replaceSelectedCharacterData(selectedCharacter);
    } else {
      addCharacter(selectedCharacter);
    }
    hideCharacterSelect();
  };

  /** Handling ReminderControls. */
  const [selectedReminderIdx, setSelectedReminderIdx] = useState<number>();
  const selectReminder = (idx?: number) => {
    clearSelections();
    setSelectedReminderIdx(idx);
  };
  const replaceSelectedReminderData = (newData: ReminderData) => {
    if (selectedReminderIdx == null) return;
    setReminders(draft => void (draft[selectedReminderIdx].data = newData));
  };
  const removeSelectedReminder = () => {
    if (selectedReminderIdx == null) return;
    setReminders(draft => void (draft.splice(selectedReminderIdx, 1)));
    setSelectedReminderIdx(undefined);
  };

  /** Handling reminder selection. */
  const [reminderSelectVisible, setReminderSelectVisible] = useState(false);
  const showReminderSelect = () => setReminderSelectVisible(true);
  const hideReminderSelect = () => setReminderSelectVisible(false);
  const onReminderSelect = (selectedReminder: ReminderData) => {
    if (selectedReminderIdx != null) {
      replaceSelectedReminderData(selectedReminder);
    } else {
      addReminder(selectedReminder, selectedCharacterIdx ? characters[selectedCharacterIdx].position : undefined);
    }
    hideReminderSelect();
  };

  const [layout, setLayout] = useState<LayoutRectangle>();
  const onLayout = (event: LayoutChangeEvent) => {
    setLayout(event.nativeEvent.layout);

    if (initialize) {
      // Position characters in ellipse layout.
      const { width, height } = event.nativeEvent.layout;
      characters.forEach((_c, idx) => {
        const t = idx / characters.length;
        setCharacterPosition(idx, {
          x: (width / 2) + Math.cos(2 * t * Math.PI) * 0.8 * (width / 2) - CHARACTER_SIZE / 2,
          y: (height / 2) + Math.sin(2 * t * Math.PI) * 0.8 * (height / 2) - CHARACTER_SIZE / 2,
        });
      });
      dispatch(slice.setInitialize(false));
    }
  };

  const currentCharacters = characters.map((character, idx) => {
    const onMoveStart = (pos: TokenPosition) => {
      setCharacterPosition(idx, pos);
    };
    const onMoveEnd = (pos: TokenPosition) => {
      setCharacterPosition(idx, pos);
      setCharacterFront(idx);
    };
    const onPress = () => {
      selectCharacter(selectedCharacterIdx === idx ? undefined : idx);
    };
    return (
      <Token
        key={`character-${idx}`}
        testID={`character-${idx}-${character.data.id}`}
        position={character.position}
        front={character.front}
        size={CHARACTER_SIZE}
        selected={idx === selectedCharacterIdx}
        containerLayout={layout}
        onMoveStart={onMoveStart}
        onMoveEnd={onMoveEnd}
        onPress={onPress}>
        <Character
          character={character.data}
          team={character.team}
          nameStyle={{ color: 'black' }}/>
      </Token>
    );
  });

  const currentReminders = reminders.map((reminder, idx) => {
    const onMoveStart = (pos: TokenPosition) => {
      setReminderPosition(idx, pos);
    };
    const onMoveEnd = (pos: TokenPosition) => {
      setReminderPosition(idx, pos);
      setReminderFront(idx);
    };
    const onPress = () => {
      selectReminder(selectedReminderIdx === idx ? undefined : idx);
    };
    return (
      <Token
        key={`reminder-${idx}`}
        testID={`reminder-${idx}-${reminder.data.label}`}
        position={reminder.position}
        front={reminder.front}
        size={REMINDER_SIZE}
        selected={idx === selectedReminderIdx}
        containerLayout={layout}
        onMoveStart={onMoveStart}
        onMoveEnd={onMoveEnd}
        onPress={onPress}>
        <Reminder
          reminder={reminder.data}
          labelStyle={{ color: 'black' }}/>
      </Token>
    );
  });

  const onClearGrim = () => {
    setCharacters([]);
    setReminders([]);
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      borderRadius: theme.roundness,
      flex: 1,
      height: '100%',
      width: '100%',
    },
  });

  // Render nothing if this page is not focused.
  if (!focused) return;

  return (
    <>
      <GameControls
        visible={selectedCharacterIdx == null && selectedReminderIdx == null}
        onAddCharacter={() => showCharacterSelect()}
        onAddReminder={() => showReminderSelect()}
        onGameSetup={() => router.push('/game-setup')}
        onClearGrim={onClearGrim}/>
      <CharacterControls
        visible={selectedCharacterIdx != null}
        onChangeTeam={swapSelectedCharacterTeam}
        onReplace={showCharacterSelect}
        onAddReminder={showReminderSelect}
        onRemove={removeSelectedCharacter}/>
      <ReminderControls
        visible={selectedReminderIdx != null}
        onReplace={showReminderSelect}
        onRemove={removeSelectedReminder}/>
      <CharacterSelect
        visible={characterSelectVisible}
        characters={getCharactersByEdition(edition)}
        onDismiss={hideCharacterSelect}
        onSelect={onCharacterSelect}/>
      <ReminderSelect
        visible={reminderSelectVisible}
        edition={edition}
        characterIds={
          selectedCharacterIdx ?
            [characters[selectedCharacterIdx].data.id] :
            characters.map(c => c.data.id)
        }
        onDismiss={hideReminderSelect}
        onSelect={onReminderSelect}/>
      <TouchableWithoutFeedback onPress={clearSelections} testID="grim" onLayout={onLayout}>
        <Surface mode="elevated" style={styles.container}>
          {currentCharacters}
          {currentReminders}
        </Surface>
      </TouchableWithoutFeedback>
    </>
  );
}

export default withTheme(Grim);
