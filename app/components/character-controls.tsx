import { CHARACTER_SIZE } from '@/app/constants';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { CharacterKey, removeCharacter, selectCharacterByKey, swapCharacterTeam } from '@/app/state/characters-slice';
import { setReminderCharacter, setReplacingCharacter } from '@/app/state/grim-slice';
import { useState } from 'react';
import { Button, Dialog, MD3Theme, Menu, Portal, withTheme } from 'react-native-paper';

interface CharacterControlsProps {
  characterKey?: CharacterKey;
  onDismiss: () => void;
  theme: MD3Theme;
}

function CharacterControls({ characterKey, onDismiss, theme }: CharacterControlsProps) {
  const dispatch = useAppDispatch();

  const [confirmingRemoveKey, setConfirmingRemoveKey] = useState<CharacterKey>();
  const showConfirmRemove = (key: CharacterKey) => setConfirmingRemoveKey(key);
  const hideConfirmRemove = () => setConfirmingRemoveKey(undefined);
  const onConfirmRemove = () => {
    confirmingRemoveKey && dispatch(removeCharacter(confirmingRemoveKey));
    hideConfirmRemove();
  };

  // Clear selections when pressing menu items.
  const onPress = (wrapped: () => void) => () => {
    onDismiss();
    wrapped();
  };

  const character = useAppSelector(state => selectCharacterByKey(state.characters, characterKey));
  const position = {
    x: character?.position?.x ?? 0,
    y: (character?.position?.y ?? 0) + CHARACTER_SIZE,
  };

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
    </Portal>
  );
}

export default withTheme(CharacterControls);
