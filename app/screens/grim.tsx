import Character from '@/app/components/character';
import CharacterControls from '@/app/components/character-controls';
import GameControls from '@/app/components/game-controls';
import Reminder from '@/app/components/reminder';
import ReminderControls from '@/app/components/reminder-controls';
import Token from '@/app/components/token';
import { CHARACTER_SIZE, REMINDER_SIZE } from '@/app/constants';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import CharacterSelect from '@/app/screens/character-select';
import ReminderSelect from '@/app/screens/reminder-select';
import * as charactersSlice from '@/app/state/characters-slice';
import * as grimSlice from '@/app/state/grim-slice';
import * as remindersSlice from '@/app/state/reminders-slice';
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
  const characters = useAppSelector(state => charactersSlice.selectCharacters(state.characters));
  const reminders = useAppSelector(state => remindersSlice.selectReminders(state.reminders));

  const edition = useAppSelector(state => grimSlice.selectEdition(state.grim));

  const selectedCharacter = useAppSelector(state => grimSlice.selectSelectedCharacter(state));
  const replacingCharacterKey = useAppSelector(state => grimSlice.selectReplacingCharacterKey(state.grim));
  const reminderCharacter = useAppSelector(state => grimSlice.selectReminderCharacter(state));

  const selectedReminder = useAppSelector(state => grimSlice.selectSelectedReminder(state));
  const replacingReminderKey = useAppSelector(state => grimSlice.selectReplacingReminderKey(state.grim));

  /** Handling adding new character */
  const [addingNewCharacter, setAddingNewCharacter] = useState(false);
  const showAddNewCharacter = () => setAddingNewCharacter(true);
  const hideAddNewCharacter = () => setAddingNewCharacter(false);

  /** Handling adding new character */
  const [addingNewReminder, setAddingNewReminder] = useState(false);
  const showAddNewReminder = () => setAddingNewReminder(true);
  const hideAddNewReminder = () => setAddingNewReminder(false);

  const onLayout = (event: LayoutChangeEvent) => {
    dispatch(grimSlice.setLayout(event.nativeEvent.layout));
  };

  const currentCharacters = characters.map((character, idx) => {
    const onPress = () => {
      dispatch(grimSlice.setSelectedCharacter(character.key));
    };
    const onMove = (position: GrimPosition) => {
      dispatch(charactersSlice.setCharacterPosition({ key: character.key, position }));
      dispatch(charactersSlice.setCharacterFront(character.key));
    };
    const characterData = getCharacterById(character.id);
    return (
      <Token
        key={`character-${character.key}`}
        testID={`character-${idx}-${character.id}`}
        selected={character.key === selectedCharacter?.key}
        position={character.position}
        front={character.front}
        size={CHARACTER_SIZE}
        text={characterData.name}
        onMove={onMove}
        onPress={onPress}
        controls={<CharacterControls character={character} selectedCharacter={selectedCharacter}/>}>
        <Character character={characterData} team={character.team}/>
      </Token>
    );
  });

  const currentReminders = reminders.map((reminder, idx) => {
    const onPress = () => {
      dispatch(grimSlice.setSelectedReminder(reminder.key));
    };
    const onMove = (position: GrimPosition) => {
      dispatch(remindersSlice.setReminderPosition({ key: reminder.key, position }));
      dispatch(remindersSlice.setReminderFront(reminder.key));
    };
    return (
      <Token
        key={`reminder-${reminder.key}`}
        testID={`reminder-${idx}-${reminder.data.label}`}
        selected={reminder.key === selectedCharacter?.key}
        position={reminder.position}
        front={reminder.front}
        size={REMINDER_SIZE}
        text={reminder.data.label}
        onMove={onMove}
        onPress={onPress}
        controls={<ReminderControls reminder={reminder} selectedReminder={selectedReminder}/>}>
        <Reminder reminder={reminder.data}/>
      </Token>
    );
  });

  const onClearGrim = () => {
    dispatch(charactersSlice.setCharacters([]));
    dispatch(remindersSlice.setReminders([]));
  };

  const tapGrim = Gesture.Tap().onStart(() => {
    dispatch(grimSlice.clearSelectedCharacter());
    dispatch(grimSlice.clearSelectedReminder());
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
    dispatch(grimSlice.clearReplacingCharacter());
    hideAddNewCharacter();
  };
  const onCharacterSelect = (id: CharacterId) => {
    if (replacingCharacterKey != null) {
      // Replacing an existing character.
      dispatch(charactersSlice.setCharacterId({ key: replacingCharacterKey, id }));
    } else {
      // Adding a new character.
      dispatch(charactersSlice.addCharacter({ id }));
    }
    dismissCharacterSelect();
  };

  const dismissReminderSelect = () => {
    dispatch(grimSlice.clearReplacingReminder());
    dispatch(grimSlice.clearReminderCharacter());
    hideAddNewReminder();
  };
  const onReminderSelect = (data: ReminderData) => {
    if (replacingReminderKey != null) {
      // Replacing an existing reminder.
      dispatch(remindersSlice.setReminderData({ key: replacingReminderKey, data }));
    } else if (reminderCharacter) {
      // Adding a new reminder to a character.
      dispatch(remindersSlice.addReminder({ data, position: reminderCharacter.position }));
    } else {
      // Adding a new reminder.
      dispatch(remindersSlice.addReminder({ data }));
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
