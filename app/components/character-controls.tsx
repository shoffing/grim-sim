import { CHARACTER_SIZE } from '@/app/constants';
import { useAppDispatch } from '@/app/hooks';
import { CharacterState, removeCharacter, swapCharacterTeam } from '@/app/state/characters-slice';
import { clearSelectedCharacter, setReminderCharacter, setReplacingCharacter } from '@/app/state/grim-slice';
import { useState } from 'react';
import { Button, Dialog, MD3Theme, Menu, Portal, withTheme } from 'react-native-paper';

interface CharacterControlsProps {
  character: CharacterState;
  selectedCharacter?: CharacterState;
  theme: MD3Theme;
}

function CharacterControls({ character, selectedCharacter, theme }: CharacterControlsProps) {
  const dispatch = useAppDispatch();

  const [confirmRemove, setConfirmRemove] = useState(false);
  const showConfirmRemove = () => setConfirmRemove(true);
  const hideConfirmRemove = () => setConfirmRemove(false);
  const onConfirmRemove = () => {
    hideConfirmRemove();
    dispatch(removeCharacter(character.key));
  };

  // Clear selections when pressing menu items.
  const onPress = (wrapped: () => void) => () => {
    dispatch(clearSelectedCharacter());
    wrapped();
  };

  const position = {
    x: character.position.x,
    y: character.position.y + CHARACTER_SIZE,
  };

  return (
    <Portal>
      <Menu
        anchor={position}
        visible={selectedCharacter === character}
        onDismiss={() => dispatch(clearSelectedCharacter())}
        style={{ opacity: selectedCharacter === character ? 1 : 0 }}
        mode="flat">
        <Menu.Item leadingIcon="swap-horizontal" title="Replace" testID="replace-character"
                   onPress={onPress(() => dispatch(setReplacingCharacter(character.key)))}/>
        <Menu.Item leadingIcon="account-group" title="Change team" testID="change-team-character"
                   onPress={onPress(() => dispatch(swapCharacterTeam(character.key)))}/>
        <Menu.Item leadingIcon="information-outline" title="Add reminder" testID="add-reminder-character"
                   onPress={onPress(() => dispatch(setReminderCharacter(character.key)))}/>
        <Menu.Item leadingIcon="delete" title="Remove" testID="delete-character"
                   onPress={onPress(showConfirmRemove)}/>
      </Menu>
      <Dialog visible={confirmRemove} onDismiss={hideConfirmRemove}>
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
