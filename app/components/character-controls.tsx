import { useState } from 'react';
import { Button, Dialog, FAB, MD3Theme, Portal, withTheme } from 'react-native-paper';

interface CharacterControlsProps {
  visible: boolean;
  onReplace: () => void;
  onAddReminder: () => void;
  onChangeTeam: () => void;
  onRemove: () => void;
  theme: MD3Theme;
}

export const ACCESSIBILITY_LABEL = 'open character controls';

function CharacterControls({
                             visible,
                             onReplace,
                             onAddReminder,
                             onChangeTeam,
                             onRemove,
                             theme,
                           }: CharacterControlsProps) {
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
        <Dialog.Title>Are you sure you want to remove this character?</Dialog.Title>
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
        accessibilityLabel={ACCESSIBILITY_LABEL}
        style={{ transform: [{ scale: 1.1 }], transformOrigin: '100% 100%' }}
        variant="secondary"
        open={open}
        visible={visible}
        icon={open ? 'cog-off' : 'account-cog'}
        actions={[
          {
            icon: 'swap-horizontal',
            label: 'Replace',
            onPress: onReplace,
            size: 'medium',
            testID: 'replace-character',
          },
          {
            icon: 'account-group',
            label: 'Change team',
            onPress: onChangeTeam,
            size: 'medium',
            testID: 'change-team-character',
          },
          {
            icon: 'information-outline',
            label: 'Add reminder',
            onPress: onAddReminder,
            size: 'medium',
            testID: 'add-reminder-character',
          },
          {
            icon: 'delete',
            label: 'Remove',
            labelTextColor: theme.colors.error,
            color: theme.colors.error,
            onPress: showConfirmRemove,
            size: 'medium',
            testID: 'delete-character',
          },
        ]}
        onStateChange={({ open }) => setOpen(open)}/>
    </Portal>
  );
}

export default withTheme(CharacterControls);
