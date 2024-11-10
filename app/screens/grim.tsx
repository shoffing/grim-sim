import Character from '@/app/components/character';
import CharacterControls from '@/app/components/character-controls';
import Reminder from '@/app/components/reminder';
import ReminderControls from '@/app/components/reminder-controls';
import Token, { TokenPosition } from '@/app/components/token';
import { selectGameState } from '@/app/game-slice';
import { useAppSelector } from '@/app/hooks';
import CharacterSelect from '@/app/screens/character-select';
import ReminderSelect from '@/app/screens/reminder-select';
import CharacterData from '@/constants/characters/character-data';
import { getCharacterById, getCharactersByEdition } from '@/constants/characters/characters';
import ReminderData from '@/constants/reminder-data';
import Team from '@/constants/team';
import { useState } from 'react';
import { Animated, ImageURISource, LayoutChangeEvent, LayoutRectangle, StyleSheet } from 'react-native';
import { MD3Theme, Surface, withTheme } from 'react-native-paper';
import ValueXY = Animated.ValueXY;
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

function Grim({ theme }: GrimProps) {
  const { characters: characterIds, edition } = useAppSelector(state => selectGameState(state.game));
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

  /** Handling CharacterControls. */
  const [selectedCharacterIdx, setSelectedCharacterIdx] = useState<number>();
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
    }
    hideCharacterSelect();
  };

  /** Handling ReminderControls. */
  const [selectedReminderIdx, setSelectedReminderIdx] = useState<number>();
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
      setReminders(draft => {
        draft.push({
          data: selectedReminder,
          position: selectedCharacterIdx != null ? characters[selectedCharacterIdx].position : { x: 0, y: 0 },
          front: true,
        });
      });
    }
    hideReminderSelect();
  };

  const [layout, setLayout] = useState<LayoutRectangle>();
  const onLayout = (event: LayoutChangeEvent) => {
    setLayout(event.nativeEvent.layout);
  };

  const currentCharacters = characters.map((character, idx) => {
    const onMoveStart = () => {
      setCharacterFront(idx);
    };
    const onMoveEnd = (pos: TokenPosition) => {
      setCharacterPosition(idx, pos);
    };
    const onPress = () => {
      setSelectedCharacterIdx(selectedCharacterIdx === idx ? undefined : idx);
      setSelectedReminderIdx(undefined);
    };
    return (
      <Token
        key={`character-${idx}`}
        position={new ValueXY(character.position)}
        front={character.front}
        size={128}
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
    const onMoveStart = () => {
      setReminderFront(idx);
    };
    const onMoveEnd = (pos: TokenPosition) => {
      setReminderPosition(idx, pos);
    };
    const onPress = () => {
      setSelectedReminderIdx(selectedReminderIdx === idx ? undefined : idx);
      setSelectedCharacterIdx(undefined);
    };
    return (
      <Token
        key={`reminder-${idx}`}
        position={new ValueXY(reminder.position)}
        front={reminder.front}
        size={92}
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

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      borderRadius: theme.roundness,
      flex: 1,
      height: '100%',
      width: '100%',
    },
  });
  return (
    <>
      <CharacterSelect
        characters={getCharactersByEdition(edition)}
        visible={characterSelectVisible}
        onDismiss={hideCharacterSelect}
        onSelect={onCharacterSelect}/>
      <CharacterControls
        visible={selectedCharacterIdx != null}
        onChangeTeam={swapSelectedCharacterTeam}
        onReplace={showCharacterSelect}
        onAddReminder={showReminderSelect}
        onRemove={removeSelectedCharacter}/>
      <ReminderSelect
        characterIds={
          selectedCharacterIdx ?
            [characters[selectedCharacterIdx].data.id] :
            characters.map(c => c.data.id)
        }
        visible={reminderSelectVisible}
        onDismiss={hideReminderSelect}
        onSelect={onReminderSelect}/>
      <ReminderControls
        visible={selectedReminderIdx != null}
        onReplace={showReminderSelect}
        onRemove={removeSelectedReminder}/>
      <Surface mode="elevated" style={styles.container} onLayout={onLayout}>
        {currentCharacters}
        {currentReminders}
      </Surface>
    </>
  );
}

export default withTheme(Grim);
