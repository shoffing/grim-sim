import { GrimPosition } from '@/app/screens/grim';
import { useState } from 'react';
import { Button, Dialog, MD3Theme, Menu, Portal, withTheme } from 'react-native-paper';

interface ReminderControlsProps {
  visible: boolean;
  position: GrimPosition;
  onDismiss: () => void;
  hideControls: () => void;
  onReplace: () => void;
  onRemove: () => void;
  theme: MD3Theme;
}

export const ACCESSIBILITY_LABEL = 'open reminder controls';

function ReminderControls({ visible, position, onDismiss, hideControls, onReplace, onRemove, theme }: ReminderControlsProps) {
  const [confirmRemove, setConfirmRemove] = useState(false);
  const showConfirmRemove = () => setConfirmRemove(true);
  const hideConfirmRemove = () => setConfirmRemove(false);
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
        <Menu.Item leadingIcon="delete" title="Remove" onPress={onPress(showConfirmRemove)}/>
      </Menu>
      <Dialog visible={confirmRemove} onDismiss={hideConfirmRemove}
              style={{ bottom: 48, right: 0, position: 'absolute' }}>
        <Dialog.Title>Are you sure you want to remove this reminder?</Dialog.Title>
        <Dialog.Actions>
          <Button onPress={hideConfirmRemove} testID="cancel-delete-reminder">Cancel</Button>
          <Button
            mode="contained"
            icon="delete"
            onPress={onConfirmRemove}
            buttonColor={theme.colors.errorContainer}
            textColor={theme.colors.onErrorContainer}
            testID="confirm-delete-reminder">
            Remove
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

export default withTheme(ReminderControls);
