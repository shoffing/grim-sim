import Character from '@/app/components/character';
import CharacterControls from '@/app/components/character-controls';
import GameControls from '@/app/components/game-controls';
import Player from '@/app/components/player';
import Reminder from '@/app/components/reminder';
import ReminderControls from '@/app/components/reminder-controls';
import Token from '@/app/components/token';
import { CHARACTER_SIZE, REMINDER_SIZE } from '@/app/constants';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import CharacterSelect from '@/app/screens/character-select';
import ReminderSelect from '@/app/screens/reminder-select';
import {
  addCharacter,
  selectCharacters,
  setCharacterFront,
  setCharacterId,
  setCharacterPosition,
  setCharacters,
} from '@/app/state/characters-slice';
import {
  clearReminderCharacter,
  clearReplacingCharacter,
  clearReplacingReminder,
  clearSelectedCharacter,
  clearSelectedReminder,
  selectEdition,
  selectReminderCharacter,
  selectReplacingCharacterKey,
  selectReplacingReminderKey,
  selectSelectedCharacter,
  selectSelectedReminder,
  setLayout,
  setSelectedCharacter,
  setSelectedReminder,
} from '@/app/state/grim-slice';
import {
  addReminder,
  selectReminders,
  setReminderData,
  setReminderFront,
  setReminderPosition,
  setReminders,
} from '@/app/state/reminders-slice';
import CharacterId from '@/constants/characters/character-id';
import { getCharacterById } from '@/constants/characters/characters';
import ReminderData from '@/constants/reminder-data';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { LayoutChangeEvent, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { MD3Theme, Surface, withTheme } from 'react-native-paper';

interface GrimProps {
  theme: MD3Theme,
}

export interface GrimPosition {
  x: number;
  y: number;
}

function Grim({ theme }: GrimProps) {
  const router = useRouter();

  const [focused, setFocused] = useState(true);
  useFocusEffect(() => {
    setFocused(true);
    return () => setFocused(false);
  });

  const dispatch = useAppDispatch();
  const characters = useAppSelector(state => selectCharacters(state.characters));
  const reminders = useAppSelector(state => selectReminders(state.reminders));

  const edition = useAppSelector(state => selectEdition(state.grim));

  const selectedCharacter = useAppSelector(state => selectSelectedCharacter(state));
  const replacingCharacterKey = useAppSelector(state => selectReplacingCharacterKey(state.grim));
  const reminderCharacter = useAppSelector(state => selectReminderCharacter(state));

  const selectedReminder = useAppSelector(state => selectSelectedReminder(state));
  const replacingReminderKey = useAppSelector(state => selectReplacingReminderKey(state.grim));

  /** Handling adding new character */
  const [addingNewCharacter, setAddingNewCharacter] = useState(false);
  const showAddNewCharacter = () => setAddingNewCharacter(true);
  const hideAddNewCharacter = () => setAddingNewCharacter(false);

  /** Handling adding new character */
  const [addingNewReminder, setAddingNewReminder] = useState(false);
  const showAddNewReminder = () => setAddingNewReminder(true);
  const hideAddNewReminder = () => setAddingNewReminder(false);

  const onLayout = (event: LayoutChangeEvent) => {
    dispatch(setLayout(event.nativeEvent.layout));
  };

  const currentCharacters = characters.map((character, idx) => {
    const onPress = () => {
      dispatch(setSelectedCharacter(character.key));
    };
    const onMove = (position: GrimPosition) => {
      dispatch(setCharacterPosition({ key: character.key, position }));
      dispatch(setCharacterFront(character.key));
    };
    return (
      <Token
        key={`character-${character.key}`}
        testID={`character-${idx}-${character.id}`}
        selected={character.key === selectedCharacter?.key}
        position={character.position}
        front={character.front}
        size={CHARACTER_SIZE}
        onMove={onMove}
        onPress={onPress}
        controls={<CharacterControls character={character} selectedCharacter={selectedCharacter}/>}>
        <Character
          character={getCharacterById(character.id)}
          team={character.team}
          nameStyle={{ color: 'black' }}/>
        <Player name="Steve" alive={true}/>
      </Token>
    );
  });

  const currentReminders = reminders.map((reminder, idx) => {
    const onPress = () => {
      dispatch(setSelectedReminder(reminder.key));
    };
    const onMove = (position: GrimPosition) => {
      dispatch(setReminderPosition({ key: reminder.key, position }));
      dispatch(setReminderFront(reminder.key));
    };
    return (
      <Token
        key={`reminder-${reminder.key}`}
        testID={`reminder-${idx}-${reminder.data.label}`}
        selected={reminder.key === selectedCharacter?.key}
        position={reminder.position}
        front={reminder.front}
        size={REMINDER_SIZE}
        onMove={onMove}
        onPress={onPress}
        controls={<ReminderControls reminder={reminder} selectedReminder={selectedReminder}/>}>
        <Reminder
          reminder={reminder.data}
          labelStyle={{ color: 'black' }}/>
      </Token>
    );
  });

  const onClearGrim = () => {
    dispatch(setCharacters([]));
    dispatch(setReminders([]));
  };

  const tapGrim = Gesture.Tap().onStart(() => {
    dispatch(clearSelectedCharacter());
    dispatch(clearSelectedReminder());
  }).runOnJS(true);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      borderRadius: theme.roundness,
      flex: 1,
      height: '100%',
      width: '100%',
    },
  });

  const dismissCharacterSelect = () => {
    dispatch(clearReplacingCharacter());
    hideAddNewCharacter();
  };
  const onCharacterSelect = (id: CharacterId) => {
    if (replacingCharacterKey != null) {
      // Replacing an existing character.
      dispatch(setCharacterId({ key: replacingCharacterKey, id }));
    } else {
      // Adding a new character.
      dispatch(addCharacter({ id }));
    }
    dismissCharacterSelect();
  };

  const dismissReminderSelect = () => {
    dispatch(clearReplacingReminder());
    dispatch(clearReminderCharacter());
    hideAddNewReminder();
  };
  const onReminderSelect = (data: ReminderData) => {
    if (replacingReminderKey != null) {
      // Replacing an existing reminder.
      dispatch(setReminderData({ key: replacingReminderKey, data }));
    } else if (reminderCharacter) {
      // Adding a new reminder to a character.
      dispatch(addReminder({ data, position: reminderCharacter.position }));
    } else {
      // Adding a new reminder.
      dispatch(addReminder({ data }));
    }
    dismissReminderSelect();
  };

  // Render nothing if this page is not focused.
  if (!focused) return;

  return (
    <>
      <GameControls
        visible={true}
        fabStyle={{ zIndex: 9999 }}
        onAddCharacter={() => showAddNewCharacter()}
        onAddReminder={() => showAddNewReminder()}
        onGameSetup={() => router.push('/game-setup')}
        onClearGrim={onClearGrim}/>
      <CharacterSelect
        visible={addingNewCharacter || replacingCharacterKey != null}
        onSelect={onCharacterSelect}
        onDismiss={dismissCharacterSelect}
        edition={edition}/>
      <ReminderSelect
        visible={addingNewReminder || replacingReminderKey != null || reminderCharacter != null}
        edition={edition}
        characterIds={
          selectedCharacter ? [selectedCharacter.id] : characters.map(c => c.id)
        }
        onSelect={onReminderSelect}
        onDismiss={dismissReminderSelect}/>
      <GestureDetector gesture={tapGrim}>
        <Surface mode="elevated" style={styles.container} testID="grim" onLayout={onLayout}>
          {currentCharacters}
          {currentReminders}
        </Surface>
      </GestureDetector>
    </>
  );
}

export default withTheme(Grim);
