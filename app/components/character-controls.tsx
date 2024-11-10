import { useState } from 'react';
import { Button, Dialog, FAB, MD3Theme, Portal, withTheme } from 'react-native-paper';

interface CharacterControlsProps {
  visible: boolean;
  onReplace: () => void;
  onChangeTeam: () => void;
  onRemove: () => void;
  theme: MD3Theme;
}

function CharacterControls({ visible, onReplace, onChangeTeam, onRemove, theme }: CharacterControlsProps) {
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
        open={open}
        visible={visible}
        icon={open ? 'cog-off' : 'cog'}
        actions={[
          { icon: 'swap-horizontal', label: 'Replace', onPress: onReplace },
          { icon: 'account-group', label: 'Change Team', onPress: onChangeTeam },
          {
            icon: 'delete',
            label: 'Remove',
            labelTextColor: theme.colors.error,
            color: theme.colors.error,
            onPress: showConfirmRemove,
          },
        ]}
        onStateChange={({ open }) => setOpen(open)}/>
    </Portal>
  );
}

export default withTheme(CharacterControls);
