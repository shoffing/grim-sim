import { CHARACTER_SIZE } from '@/app/constants';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  castPlayerGhostVote,
  CharacterKey,
  killPlayer,
  removeCharacter,
  restorePlayerGhostVote,
  revivePlayer,
  selectCharacterByKey,
  setPlayerName,
  swapCharacterTeam,
} from '@/app/state/characters-slice';
import { setReminderCharacter, setReplacingCharacter } from '@/app/state/grim-slice';
import { getCharacterById } from '@/constants/characters/characters';
import { colorContainer, onColorContainer } from '@/constants/colors';
import { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import { Button, Dialog, Divider, MD3Theme, Menu, Portal, Text, TextInput, withTheme } from 'react-native-paper';

interface CharacterControlsProps {
  characterKey?: CharacterKey;
  onShow: () => void;
  onDismiss: () => void;
  theme: MD3Theme;
}

function CharacterControls({ characterKey, onShow, onDismiss, theme }: CharacterControlsProps) {
  const dispatch = useAppDispatch();
  const character = useAppSelector(state => selectCharacterByKey(state.characters, characterKey));
  const characterData = character && getCharacterById(character.id);

  // Confirmation dialog for remving this character.
  const [confirmingRemoveKey, setConfirmingRemoveKey] = useState<CharacterKey>();
  const showConfirmRemove = (key: CharacterKey) => setConfirmingRemoveKey(key);
  const hideConfirmRemove = () => setConfirmingRemoveKey(undefined);
  const onConfirmRemove = () => {
    confirmingRemoveKey && dispatch(removeCharacter(confirmingRemoveKey));
    hideConfirmRemove();
  };

  // Form dialog for setting this character's player's name.
  const [name, setName] = useState(character?.player?.name);
  useEffect(() => setName(character?.player?.name), [character]);
  const [settingNameKey, setSettingNameKey] = useState<CharacterKey>();
  const showSetName = (key: CharacterKey) => setSettingNameKey(key);
  const hideSetName = () => setSettingNameKey(undefined);
  const onSetName = () => {
    if (name != null) {
      settingNameKey && dispatch(setPlayerName({ key: settingNameKey, name }));
    }
    hideSetName();
  };

  // Clear selections when pressing menu items.
  const onPress = (wrapped: () => void) => () => {
    onDismiss();
    wrapped();
  };

  const position = character?.position ? {
    x: character.position.x + CHARACTER_SIZE / 2,
    y: character.position.y + CHARACTER_SIZE / 2,
  } : { x: 0, y: 0 };

  const alive = character?.player?.alive ?? true;
  const ghostVote = character?.player?.ghostVote ?? true;

  const styles = StyleSheet.create({
    menuContent: {
      flexDirection: 'row',
      maxWidth: Dimensions.get('window').width / 2,
      maxHeight: Dimensions.get('window').height / 2,
      flexWrap: 'nowrap',
    },
    menuItemsContainer: {
      maxHeight: '100%',
      flexGrow: 1,
      width: '100%',
    },
    characterInfo: {
      flexGrow: 0,
      flexShrink: 1,
      borderColor: theme.colors.outline,
      borderRightWidth: 2,
      maxHeight: '100%',
      flexDirection: 'column',
      display: 'flex',
    },
    characterInfoText: {
      padding: 8,
      margin: 8,
      borderRadius: 8,
    },
    nameText: {
      fontFamily: 'GermaniaOne-Regular',
    },
    abilityText: {
      marginTop: 0,
      fontStyle: 'italic',
      backgroundColor: colorContainer(theme.dark, 'brown'),
      color: onColorContainer(theme.dark, 'brown'),
    },
    firstNightText: {
      backgroundColor: colorContainer(theme.dark, 'blue'),
      color: onColorContainer(theme.dark, 'blue'),
    },
    otherNightText: {
      backgroundColor: colorContainer(theme.dark, 'red'),
      color: onColorContainer(theme.dark, 'red'),
    },
  });

  return (
    <Portal>
      <Menu
        anchor={position}
        visible={!!characterKey}
        onDismiss={onDismiss}
        contentStyle={styles.menuContent}
        mode="flat">
        <ScrollView style={styles.characterInfo}>
          <Text style={[styles.characterInfoText, styles.nameText]} variant="headlineSmall">{characterData?.name}</Text>
          <Text style={[styles.characterInfoText, styles.abilityText]}
                variant="bodySmall">{characterData?.ability}</Text>
          {characterData?.firstNightReminder ?
            <Text style={[styles.characterInfoText, styles.firstNightText]} variant="bodySmall">
              <Text variant="labelMedium" style={styles.firstNightText}>First
                night:</Text> {characterData?.firstNightReminder}
            </Text> : null}
          {characterData?.otherNightReminder ?
            <Text style={[styles.characterInfoText, styles.otherNightText]} variant="bodySmall">Other
              nights: {characterData?.otherNightReminder}</Text> : null}
        </ScrollView>
        <ScrollView style={styles.menuItemsContainer}>
          <Menu.Item leadingIcon="eye" title="Show" testID="show-character"
                     onPress={onPress(onShow)}/>
          <Menu.Item leadingIcon="swap-horizontal" title="Replace" testID="replace-character"
                     onPress={onPress(() => characterKey && dispatch(setReplacingCharacter(characterKey)))}/>
          <Menu.Item leadingIcon="account-group" title="Change team" testID="change-team-character"
                     onPress={onPress(() => characterKey && dispatch(swapCharacterTeam(characterKey)))}/>
          <Menu.Item leadingIcon="information-outline" title="Add reminder" testID="add-reminder-character"
                     onPress={onPress(() => characterKey && dispatch(setReminderCharacter(characterKey)))}/>
          <Menu.Item leadingIcon="delete" title="Remove" testID="delete-character"
                     onPress={onPress(() => characterKey && showConfirmRemove(characterKey))}/>


          <Divider/>

          <Menu.Item leadingIcon="account-edit" title="Set player name" testID="set-player-name-character"
                     onPress={onPress(() => characterKey && showSetName(characterKey))}/>
          <Menu.Item
            leadingIcon={alive ? 'grave-stone' : 'emoticon-excited'}
            title={alive ? 'Kill player' : 'Revive player'}
            testID={alive ? 'kill-player-character' : 'revive-player-character'}
            titleStyle={alive ? { color: theme.colors.error } : undefined}
            onPress={onPress(() => characterKey && dispatch(alive ? killPlayer(characterKey) : revivePlayer(characterKey)))}/>
          {
            /** If dead... */
            !alive &&
            <Menu.Item
              leadingIcon={ghostVote ? 'ghost-off' : 'ghost'}
              title={ghostVote ? 'Use ghost vote' : 'Restore ghost vote'}
              testID={ghostVote ? 'use-ghost-vote-character' : 'restore-ghost-vote-character'}
              onPress={onPress(() => characterKey && dispatch(ghostVote ? castPlayerGhostVote(characterKey) : restorePlayerGhostVote(characterKey)))}/>
          }
        </ScrollView>
      </Menu>

      <Dialog visible={!!confirmingRemoveKey} onDismiss={hideConfirmRemove}>
        <Dialog.Title>Are you sure you want to remove this character?</Dialog.Title>
        <Dialog.Actions>
          <Button testID="cancel-remove-character" onPress={hideConfirmRemove}>Cancel</Button>
          <Button
            testID="confirm-remove-character"
            mode="contained"
            icon="delete"
            onPress={onConfirmRemove}
            buttonColor={theme.colors.errorContainer}
            textColor={theme.colors.onErrorContainer}>
            Remove
          </Button>
        </Dialog.Actions>
      </Dialog>

      <Dialog visible={!!settingNameKey} onDismiss={hideSetName}>
        <Dialog.Title>Set player name</Dialog.Title>
        <Dialog.Content>
          <TextInput
            autoFocus
            onSubmitEditing={onSetName}
            onChangeText={setName}
            label="Name"
            value={name}
            testID="name-text-input"/>
        </Dialog.Content>
        <Dialog.Actions>
          <Button testID="cancel-set-name" onPress={hideSetName}>Cancel</Button>
          <Button
            testID="confirm-set-name"
            mode="contained"
            icon="content-save"
            onPress={onSetName}>
            Set name
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

export default withTheme(CharacterControls);
