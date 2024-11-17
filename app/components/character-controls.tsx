import { GrimPosition } from '@/app/screens/grim';
import { useState } from 'react';
import { Button, Dialog, MD3Theme, Menu, Portal, withTheme } from 'react-native-paper';

interface CharacterControlsProps {
  visible: boolean;
  position: GrimPosition;
  onDismiss: () => void;
  hideControls: () => void;
  onReplace: () => void;
  onAddReminder: () => void;
  onChangeTeam: () => void;
  onRemove: () => void;
  theme: MD3Theme;
}

export const ACCESSIBILITY_LABEL = 'open character controls';

function CharacterControls({
                             visible,
                             position,
                             onDismiss,
                             hideControls,
                             onReplace,
                             onAddReminder,
                             onChangeTeam,
                             onRemove,
                             theme,
                           }: CharacterControlsProps) {

  const [confirmRemove, setConfirmRemove] = useState(false);
  const showConfirmRemove = () => setConfirmRemove(true);
  const hideConfirmRemove = () => {
    onDismiss();
    setConfirmRemove(false);
  };
  const onConfirmRemove = () => {
    hideConfirmRemove();
    onRemove();
  };

  // Hide controls when pressing menu items.
  const onPress = (wrapped: () => void) => () => {
    hideControls();
    wrapped();
  };

  return (
    <Portal>
      <Menu
        anchor={position}
        visible={visible}
        onDismiss={onDismiss}>
        <Menu.Item leadingIcon="swap-horizontal" title="Replace" onPress={onPress(onReplace)}/>
        <Menu.Item leadingIcon="account-group" title="Change team" onPress={onPress(onChangeTeam)}/>
        <Menu.Item leadingIcon="information-outline" title="Add reminder" onPress={onPress(onAddReminder)}/>
        <Menu.Item leadingIcon="delete" title="Remove" onPress={onPress(showConfirmRemove)}/>
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
