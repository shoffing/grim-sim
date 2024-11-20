import { CHARACTER_SIZE } from '@/app/constants';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  CharacterKey,
  killPlayer,
  removeCharacter,
  restorePlayerGhostVote,
  revivePlayer,
  selectCharacterByKey,
  setPlayerName,
  swapCharacterTeam,
  usePlayerGhostVote,
} from '@/app/state/characters-slice';
import { setReminderCharacter, setReplacingCharacter } from '@/app/state/grim-slice';
import { useEffect, useState } from 'react';
import { Button, Dialog, Divider, MD3Theme, Menu, Portal, TextInput, withTheme } from 'react-native-paper';

interface CharacterControlsProps {
  characterKey?: CharacterKey;
  onDismiss: () => void;
  theme: MD3Theme;
}

function CharacterControls({ characterKey, onDismiss, theme }: CharacterControlsProps) {
  const dispatch = useAppDispatch();
  const character = useAppSelector(state => selectCharacterByKey(state.characters, characterKey));

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

  const position = {
    x: character?.position?.x ?? 0,
    y: (character?.position?.y ?? 0) + CHARACTER_SIZE,
  };

  const alive = character?.player?.alive ?? true;
  const ghostVote = character?.player?.ghostVote ?? true;

  return (
    <Portal>
      <Menu
        anchor={position}
        visible={!!characterKey}
        onDismiss={onDismiss}
        mode="flat">
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
            testID={ghostVote ? 'revive-player-character' : 'restore-ghost-vote-character'}
            onPress={onPress(() => characterKey && dispatch(ghostVote ? usePlayerGhostVote(characterKey) : restorePlayerGhostVote(characterKey)))}/>
        }
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
