import { useState } from 'react';
import { Button, Dialog, FAB, MD3Theme, Portal, withTheme } from 'react-native-paper';

interface GameControlsProps {
  visible: boolean;
  onAddCharacter: () => void;
  onAddReminder: () => void;
  onGameSetup: () => void;
  onClearGrim: () => void;
  theme: MD3Theme;
}

function GameControls({ visible, onAddCharacter, onAddReminder, onGameSetup, onClearGrim, theme }: GameControlsProps) {
  const [open, setOpen] = useState(false);

  const [confirmClearGrim, setConfirmClearGrim] = useState(false);
  const showConfirmClearGrim = () => setConfirmClearGrim(true);
  const hideConfirmClearGrim = () => setConfirmClearGrim(false);
  const onConfirmClearGrim = () => {
    hideConfirmClearGrim();
    onClearGrim();
  };

  return (
    <Portal>
      <Dialog visible={confirmClearGrim} onDismiss={hideConfirmClearGrim}
              style={{ bottom: 48, right: 0, position: 'absolute' }}>
        <Dialog.Title>Are you sure you want to clear the grimoire?</Dialog.Title>
        <Dialog.Actions>
          <Button onPress={hideConfirmClearGrim}>Cancel</Button>
          <Button
            mode="contained"
            icon="delete"
            onPress={onConfirmClearGrim}
            buttonColor={theme.colors.errorContainer}
            textColor={theme.colors.onErrorContainer}>
            Clear
          </Button>
        </Dialog.Actions>
      </Dialog>
      <FAB.Group
        style={{ transform: [{ scale: 1.1 }], transformOrigin: '100% 100%' }}
        variant="primary"
        open={open}
        visible={visible}
        icon={open ? 'cog-off' : 'cog'}
        actions={[
          { icon: 'account-plus', label: 'Add character', onPress: onAddCharacter, size: 'medium' },
          { icon: 'information-outline', label: 'Add reminder', onPress: onAddReminder, size: 'medium' },
          { icon: 'application-cog', label: 'Game setup', onPress: onGameSetup, size: 'medium' },
          {
            icon: 'nuke',
            label: 'Clear grimoire',
            labelTextColor: theme.colors.error,
            color: theme.colors.error,
            onPress: showConfirmClearGrim,
            size: 'medium',
          },
        ]}
        onStateChange={({ open }) => setOpen(open)}/>
    </Portal>
  );
}

export default withTheme(GameControls);
