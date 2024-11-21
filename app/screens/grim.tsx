import Character from '@/app/components/character';
import CharacterControls from '@/app/components/character-controls';
import CharacterTokenShower from '@/app/screens/character-token-shower';
import GameControls from '@/app/components/game-controls';
import Reminder from '@/app/components/reminder';
import ReminderControls from '@/app/components/reminder-controls';
import Token from '@/app/components/token';
import { CHARACTER_SIZE, REMINDER_SIZE } from '@/app/constants';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import CharacterSelect from '@/app/screens/character-select';
import DemonBluffs from '@/app/screens/demon-bluffs';
import ReminderSelect from '@/app/screens/reminder-select';
import * as charactersSlice from '@/app/state/characters-slice';
import { CharacterKey } from '@/app/state/characters-slice';
import * as grimSlice from '@/app/state/grim-slice';
import * as remindersSlice from '@/app/state/reminders-slice';
import { ReminderKey } from '@/app/state/reminders-slice';
import CharacterId from '@/constants/characters/character-id';
import { getCharacterById } from '@/constants/characters/characters';
import ReminderData from '@/constants/reminder-data';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Image, LayoutChangeEvent, LayoutRectangle, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { MD3Theme, Surface, withTheme } from 'react-native-paper';

interface GrimProps {
  theme: MD3Theme,
}

export interface GrimPosition {
  x: number;
  y: number;
}

const characterSpawnPos = (layout: LayoutRectangle) => ({
  x: layout ? layout.width - CHARACTER_SIZE - 64 : 0,
  y: layout ? layout.height - CHARACTER_SIZE - 64 : 0,
});

const reminderSpawnPos = (layout: LayoutRectangle) => ({
  x: layout ? layout.width - REMINDER_SIZE - 64 : 0,
  y: layout ? layout.height - REMINDER_SIZE - 64 : 0,
});

// To prevent issues with zIndex overlapping, make sure to show only one screen at a time.
enum Screen {
  Grim,
  CharacterSelect,
  ReminderSelect,
  DemonBluffs,
  TokenShower,
}

function Grim({ theme }: GrimProps) {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      height: '100%',
      width: '100%',
    },
    shroud: {
      height: CHARACTER_SIZE / 1.5,
      resizeMode: 'contain',
      width: CHARACTER_SIZE / 1.5,
    },
    ghostVote: {
      borderColor: theme.colors.tertiary,
      borderRadius: CHARACTER_SIZE,
      borderStyle: 'dotted',
      borderWidth: CHARACTER_SIZE / 20,
    },
  });

  const router = useRouter();

  const [focused, setFocused] = useState(true);
  useFocusEffect(
    useCallback(() => {
      setFocused(true);
      return () => setFocused(false);
    }, []),
  );

  const dispatch = useAppDispatch();
  const characters = useAppSelector(state => charactersSlice.selectCharacters(state.characters));
  const reminders = useAppSelector(state => remindersSlice.selectReminders(state.reminders));
  const demonBluffs = useAppSelector(state => charactersSlice.selectDemonBluffs(state.characters));

  const edition = useAppSelector(state => grimSlice.selectEdition(state.grim));

  const layout = useAppSelector(state => grimSlice.selectLayout(state.grim));

  const replacingCharacterKey = useAppSelector(state => grimSlice.selectReplacingCharacterKey(state.grim));
  const reminderCharacter = useAppSelector(state => grimSlice.selectReminderCharacter(state));
  const replacingReminderKey = useAppSelector(state => grimSlice.selectReplacingReminderKey(state.grim));

  /** Handle character selection (and controls display). */
  const [selectedCharacterKey, setSelectedCharacterKey] = useState<CharacterKey>();
  const clearSelectedCharacter = () => setSelectedCharacterKey(undefined);

  /** Handle reminder selection (and controls display). */
  const [selectedReminderKey, setSelectedReminderKey] = useState<ReminderKey>();
  const clearSelectedReminder = () => setSelectedReminderKey(undefined);

  /** Handling adding new character */
  const [addingNewCharacter, setAddingNewCharacter] = useState(false);
  const showAddNewCharacter = () => setAddingNewCharacter(true);
  const hideAddNewCharacter = () => setAddingNewCharacter(false);

  /** Handling adding new character */
  const [addingNewReminder, setAddingNewReminder] = useState(false);
  const showAddNewReminder = () => setAddingNewReminder(true);
  const hideAddNewReminder = () => setAddingNewReminder(false);

  /** Handling demon bluffs */
  const [demonBluffsVisible, setDemonBluffsVisible] = useState(false);
  const showDemonBluffs = () => setDemonBluffsVisible(true);
  const hideDemonBluffs = () => setDemonBluffsVisible(false);
  const showDemonBluffTokens = () => {
    setShowingCharactersText('These characters are not in play.');
    setShowingCharacterIds(demonBluffs);
  };

  /** Handling showing characters in full-screen */
  const [showingCharacterIds, setShowingCharacterIds] = useState<CharacterId[]>([]);
  const [showingCharactersText, setShowingCharactersText] = useState<string>();
  const hideShowingCharacters = () => {
    setShowingCharacterIds([]);
    setShowingCharactersText(undefined);
  };

  const onLayout = (event: LayoutChangeEvent) => {
    dispatch(grimSlice.setLayout(event.nativeEvent.layout));
  };

  const currentCharacters = Object.values(characters).map((character, idx) => {
    const selected = character.key === selectedCharacterKey;
    const onPress = () => {
      setSelectedCharacterKey(character.key);
    };
    const onMove = (position: GrimPosition) => {
      dispatch(charactersSlice.moveCharacter({ key: character.key, position }));
    };
    const characterData = getCharacterById(character.id);

    const alive = character.player.alive;
    const ghostVote = character.player.ghostVote;

    return (
      <Token
        key={`character-${character.key}`}
        testID={`character-${idx}-${character.id}`}
        position={character.position}
        selected={selected}
        size={CHARACTER_SIZE}
        topCenterContent={!alive ?
          <Image style={styles.shroud} source={require('@/assets/images/token/shroud.webp')}
                 testID="shroud"/> : undefined}
        centerContent={<Character character={characterData} team={character.team}/>}
        bottomText={characterData.name}
        belowText={character?.player?.name}
        tokenStyle={(!alive && ghostVote) ? styles.ghostVote : undefined}
        onMove={onMove}
        onPress={onPress}/>
    );
  });

  const currentReminders = Object.values(reminders).map((reminder, idx) => {
    const selected = reminder.key === selectedReminderKey;
    const onPress = () => {
      setSelectedReminderKey(reminder.key);
    };
    const onMove = (position: GrimPosition) => {
      dispatch(remindersSlice.moveReminder({ key: reminder.key, position }));
    };
    return (
      <Token
        key={`reminder-${reminder.key}`}
        testID={`reminder-${idx}-${reminder.data.label}`}
        position={reminder.position}
        selected={selected}
        size={REMINDER_SIZE}
        centerContent={<Reminder reminder={reminder.data}/>}
        bottomText={reminder.data.label}
        onMove={onMove}
        onPress={onPress}/>
    );
  });

  const onClearGrim = () => {
    dispatch(charactersSlice.setCharacters([]));
    dispatch(remindersSlice.setReminders([]));
  };

  const tapGrim = Gesture.Tap().onStart(() => {
    clearSelectedCharacter();
    clearSelectedReminder();
  }).runOnJS(true);

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
      dispatch(charactersSlice.addCharacter({ id, position: layout ? characterSpawnPos(layout) : undefined }));
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
      dispatch(remindersSlice.addReminder({ data, position: layout ? reminderSpawnPos(layout) : undefined }));
    }
    dismissReminderSelect();
  };

  /** Handle screen visibility. Order these conditionals by screen precedence. */
  let currentScreen: Screen = Screen.Grim;
  if (showingCharacterIds.length > 0) {
    currentScreen = Screen.TokenShower;
  } else if (addingNewCharacter || replacingCharacterKey != null) {
    currentScreen = Screen.CharacterSelect;
  } else if (addingNewReminder || replacingReminderKey != null || reminderCharacter != null) {
    currentScreen = Screen.ReminderSelect;
  } else if (demonBluffsVisible) {
    currentScreen = Screen.DemonBluffs;
  }

  // Render nothing if this page is not focused.
  if (!focused) return;

  return (
    <>
      <GestureDetector gesture={tapGrim}>
        <Surface mode="elevated" style={styles.container} testID="grim" onLayout={onLayout}>
          {currentCharacters}
          {currentReminders}
        </Surface>
      </GestureDetector>

      <GameControls
        visible={focused && currentScreen === Screen.Grim}
        onAddCharacter={showAddNewCharacter}
        onAddReminder={showAddNewReminder}
        onDemonBluffs={showDemonBluffs}
        onGameSetup={() => router.navigate('/game-setup')}
        onClearGrim={onClearGrim}/>
      <CharacterControls characterKey={selectedCharacterKey} onDismiss={clearSelectedCharacter}/>
      <ReminderControls reminderKey={selectedReminderKey} onDismiss={clearSelectedReminder}/>

      <CharacterSelect
        visible={currentScreen === Screen.CharacterSelect}
        onSelect={onCharacterSelect}
        onDismiss={dismissCharacterSelect}
        edition={edition}/>
      <ReminderSelect
        visible={currentScreen === Screen.ReminderSelect}
        edition={edition}
        characterIds={
          reminderCharacter ? [reminderCharacter.id] : Object.values(characters).map(c => c.id)
        }
        onSelect={onReminderSelect}
        onDismiss={dismissReminderSelect}/>
      <DemonBluffs
        visible={currentScreen === Screen.DemonBluffs}
        onShowBluffs={showDemonBluffTokens}
        onDismiss={hideDemonBluffs}/>
      <CharacterTokenShower
        visible={currentScreen === Screen.TokenShower}
        characterIds={showingCharacterIds}
        text={showingCharactersText}
        onDismiss={hideShowingCharacters}/>
    </>
  );
}

export default withTheme(Grim);
