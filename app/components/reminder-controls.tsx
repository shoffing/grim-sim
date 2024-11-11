import { useState } from 'react';
import { Button, Dialog, FAB, MD3Theme, Portal, withTheme } from 'react-native-paper';

interface ReminderControlsProps {
  visible: boolean;
  onReplace: () => void;
  onRemove: () => void;
  theme: MD3Theme;
}

function ReminderControls({ visible, onReplace, onRemove, theme }: ReminderControlsProps) {
  const [open, setOpen] = useState(false);

  const [confirmRemove, setConfirmRemove] = useState(false);
  const showConfirmRemove = () => setConfirmRemove(true);
  const hideConfirmRemove = () => setConfirmRemove(false);
  const onConfirmRemove = () => {
    hideConfirmRemove();
    onRemove();
  };

  return (
    <Portal>
      <Dialog visible={confirmRemove} onDismiss={hideConfirmRemove}
              style={{ bottom: 48, right: 0, position: 'absolute' }}>
        <Dialog.Title>Are you sure you want to remove this reminder?</Dialog.Title>
        <Dialog.Actions>
          <Button onPress={hideConfirmRemove}>Cancel</Button>
          <Button
            mode="contained"
            icon="delete"
            onPress={onConfirmRemove}
            buttonColor={theme.colors.errorContainer}
            textColor={theme.colors.onErrorContainer}>
            Remove
          </Button>
        </Dialog.Actions>
      </Dialog>
      <FAB.Group
        style={{ transform: [{ scale: 1.1 }], transformOrigin: '100% 100%' }}
        variant="tertiary"
        open={open}
        visible={visible}
        icon={open ? 'cog-off' : 'heart-cog'}
        actions={[
          { icon: 'swap-horizontal', label: 'Replace', onPress: onReplace, size: 'medium' },
          {
            icon: 'delete',
            label: 'Remove',
            labelTextColor: theme.colors.error,
            color: theme.colors.error,
            onPress: showConfirmRemove,
            size: 'medium',
          },
        ]}
        onStateChange={({ open }) => setOpen(open)}/>
    </Portal>
  );
}

export default withTheme(ReminderControls);
