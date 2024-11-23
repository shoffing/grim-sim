import Character from '@/app/components/character';
import CharacterControls from '@/app/components/character-controls';
import GameControls from '@/app/components/game-controls';
import Reminder from '@/app/components/reminder';
import ReminderControls from '@/app/components/reminder-controls';
import Token from '@/app/components/token';
import { CHARACTER_SIZE, REMINDER_SIZE } from '@/app/constants';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import CharacterSelect from '@/app/screens/character-select';
import DemonBluffs from '@/app/screens/demon-bluffs';
import InfoTokens from '@/app/screens/info-tokens';
import ReminderSelect from '@/app/screens/reminder-select';
import ShowFullScreenCharacter from '@/app/screens/show-full-screen-character';
import * as charactersSlice from '@/app/state/characters-slice';
import { CharacterState } from '@/app/state/characters-slice';
import * as grimSlice from '@/app/state/grim-slice';
import * as remindersSlice from '@/app/state/reminders-slice';
import { ReminderKey } from '@/app/state/reminders-slice';
import CharacterId from '@/constants/characters/character-id';
import { getCharacterById } from '@/constants/characters/characters';
import { colorContainer, onColorContainer } from '@/constants/colors';
import ReminderData from '@/constants/reminder-data';
import { useFocusEffect, useRouter } from 'expo-router';
import _ from 'lodash';
import React, { useCallback, useState } from 'react';
import {
  Image,
  ImageBackground,
  LayoutChangeEvent,
  LayoutRectangle,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { MD3Theme, Portal, Text, withTheme } from 'react-native-paper';

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
  InfoTokens,
  DemonBluffs,
}

function Grim({ theme }: GrimProps) {
  const baseNightBadge: ViewStyle = {
    alignItems: 'center',
    borderRadius: 999,
    elevation: 99,
    height: '30%',
    justifyContent: 'center',
    padding: 4,
    position: 'relative',
    width: '30%',
    zIndex: 99,
  };
  const baseNightBadgeText: TextStyle = {
    fontFamily: 'GermaniaOne-Regular',
    fontSize: 128,
    textAlign: 'center',
  };
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
    firstNightBadge: {
      ...baseNightBadge,
      backgroundColor: colorContainer(theme.dark, 'blue'),
      right: 6,
    },
    firstNightBadgeText: {
      ...baseNightBadgeText,
      color: onColorContainer(theme.dark, 'blue'),
    },
    otherNightBadge: {
      ...baseNightBadge,
      backgroundColor: colorContainer(theme.dark, 'red'),
      left: 6,
    },
    otherNightBadgeText: {
      ...baseNightBadgeText,
      color: onColorContainer(theme.dark, 'red'),
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

  const edition = useAppSelector(state => grimSlice.selectEdition(state.grim));

  const layout = useAppSelector(state => grimSlice.selectLayout(state.grim));

  const replacingCharacterKey = useAppSelector(state => grimSlice.selectReplacingCharacterKey(state.grim));
  const reminderCharacter = useAppSelector(state => grimSlice.selectReminderCharacter(state));
  const replacingReminderKey = useAppSelector(state => grimSlice.selectReplacingReminderKey(state.grim));

  /** Handle character selection (and controls display). */
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterState>();
  const clearSelectedCharacter = () => setSelectedCharacter(undefined);

  /** Handle reminder selection (and controls display). */
  const [selectedReminderKey, setSelectedReminderKey] = useState<ReminderKey>();
  const clearSelectedReminder = () => setSelectedReminderKey(undefined);

  /** Handling adding new character */
  const [addingNewCharacter, setAddingNewCharacter] = useState(false);
  const showAddNewCharacter = () => setAddingNewCharacter(true);
  const hideAddNewCharacter = () => setAddingNewCharacter(false);

  /** Handling adding new reminder */
  const [addingNewReminder, setAddingNewReminder] = useState(false);
  const showAddNewReminder = () => setAddingNewReminder(true);
  const hideAddNewReminder = () => setAddingNewReminder(false);

  /** Handling showing character tokens. */
  const [showingCharacter, setShowingCharacter] = useState<CharacterState>();
  const showCharacter = (character?: CharacterState) => setShowingCharacter(character);
  const hideCharacter = () => setShowingCharacter(undefined);

  /** Handling info tokens */
  const [infoTokensVisible, setInfoTokensVisible] = useState(false);
  const showInfoTokens = () => setInfoTokensVisible(true);
  const hideInfoTokens = () => setInfoTokensVisible(false);

  /** Handling demon bluffs */
  const [demonBluffsVisible, setDemonBluffsVisible] = useState(false);
  const showDemonBluffs = () => setDemonBluffsVisible(true);
  const hideDemonBluffs = () => setDemonBluffsVisible(false);

  const onLayout = (event: LayoutChangeEvent) => {
    dispatch(grimSlice.setLayout(event.nativeEvent.layout));
  };

  const firstNightOrder: CharacterId[] = _(Object.values(characters))
    .map(character => getCharacterById(character.id))
    .filter(data => !!data.firstNight && data.firstNight > 0)
    .sortBy(data => data.firstNight)
    .map(data => data.id)
    .value();

  const otherNightOrder: CharacterId[] = _(Object.values(characters))
    .map(character => getCharacterById(character.id))
    .filter(data => !!data.otherNight && data.otherNight > 0)
    .sortBy(data => data.otherNight)
    .map(data => data.id)
    .value();

  const currentCharacters = Object.values(characters).map((character, idx) => {
    const selected = character.key === selectedCharacter?.key;
    const onPress = () => {
      setSelectedCharacter(character);
    };
    const onMove = (position: GrimPosition) => {
      dispatch(charactersSlice.moveCharacter({ key: character.key, position }));
    };
    const characterData = getCharacterById(character.id);

    const alive = character.player.alive;
    const ghostVote = character.player.ghostVote;

    const firstNightIdx = firstNightOrder.indexOf(character.id);
    const firstNightLabel = firstNightIdx >= 0 ? firstNightIdx + 1 : null;
    const otherNightIdx = otherNightOrder.indexOf(character.id);
    const otherNightLabel = otherNightIdx >= 0 ? otherNightIdx + 1 : null;

    return (
      <Token
        key={`character-${character.key}`}
        testID={`character-${idx}-${character.id}`}
        position={character.position}
        selected={selected}
        size={CHARACTER_SIZE}
        topLeftContent={
          firstNightLabel ?
            <View style={styles.firstNightBadge}>
              <Text style={styles.firstNightBadgeText} adjustsFontSizeToFit>
                {firstNightLabel}
              </Text>
            </View> :
            null
        }
        topCenterContent={!alive ?
          <Image style={styles.shroud} source={require('@/assets/images/token/shroud.webp')}
                 testID="shroud"/> : undefined}
        topRightContent={
          otherNightLabel ?
            <View style={styles.otherNightBadge}>
              <Text style={styles.otherNightBadgeText} adjustsFontSizeToFit>
                {otherNightLabel}
              </Text>
            </View> :
            null
        }
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
  if (addingNewCharacter || replacingCharacterKey != null) {
    currentScreen = Screen.CharacterSelect;
  } else if (addingNewReminder || replacingReminderKey != null || reminderCharacter != null) {
    currentScreen = Screen.ReminderSelect;
  } else if (infoTokensVisible) {
    currentScreen = Screen.InfoTokens;
  } else if (demonBluffsVisible) {
    currentScreen = Screen.DemonBluffs;
  }

  // Render nothing if this page is not focused.
  if (!focused) return;

  return (
    <>
      <GestureDetector gesture={tapGrim}>
        <ImageBackground
          testID="grim"
          onLayout={onLayout}
          source={require('@/assets/images/grim/grim-background.webp')}
          style={styles.container}
          imageStyle={{ opacity: 0.0345, resizeMode: 'repeat', transform: [{ scale: 1 }] }}>
          {currentCharacters}
          {currentReminders}
        </ImageBackground>
      </GestureDetector>

      <Portal.Host>
        <GameControls
          visible={focused && currentScreen === Screen.Grim}
          onAddCharacter={showAddNewCharacter}
          onAddReminder={showAddNewReminder}
          onInfoTokens={showInfoTokens}
          onDemonBluffs={showDemonBluffs}
          onGameSetup={() => router.navigate('/game-setup')}
          onClearGrim={onClearGrim}/>
        <CharacterControls characterKey={selectedCharacter?.key}
                           onShow={() => showCharacter(selectedCharacter)}
                           onDismiss={clearSelectedCharacter}/>
        <ReminderControls reminderKey={selectedReminderKey}
                          onDismiss={clearSelectedReminder}/>
      </Portal.Host>

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
      <InfoTokens
        visible={currentScreen === Screen.InfoTokens}
        onDismiss={hideInfoTokens}/>
      <DemonBluffs
        visible={currentScreen === Screen.DemonBluffs}
        onDismiss={hideDemonBluffs}/>

      <ShowFullScreenCharacter
        visible={!!showingCharacter}
        characterId={showingCharacter?.id}
        onDismiss={hideCharacter}/>
    </>
  );
}

export default withTheme(Grim);
