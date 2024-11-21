import { useState } from 'react';
import { ViewStyle } from 'react-native';
import { Button, Dialog, FAB, MD3Theme, Portal, withTheme } from 'react-native-paper';

interface GameControlsProps {
  visible: boolean;
  fabStyle?: ViewStyle,
  onAddCharacter: () => void;
  onAddReminder: () => void;
  onDemonBluffs: () => void;
  onGameSetup: () => void;
  onClearGrim: () => void;
  theme: MD3Theme;
}

export const ACCESSIBILITY_LABEL = 'open game controls';

function GameControls({
                        visible,
                        fabStyle,
                        onAddCharacter,
                        onAddReminder,
                        onDemonBluffs,
                        onGameSetup,
                        onClearGrim,
                        theme,
                      }: GameControlsProps) {
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
              style={{ bottom: 48, position: 'absolute', right: 0 }}>
        <Dialog.Title>Are you sure you want to clear the grimoire?</Dialog.Title>
        <Dialog.Actions>
          <Button testID="cancel-clear-grim" onPress={hideConfirmClearGrim}>Cancel</Button>
          <Button
            testID="confirm-clear-grim"
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
        accessibilityLabel={ACCESSIBILITY_LABEL}
        style={{ transform: [{ scale: 1.1 }], transformOrigin: '100% 100%' }}
        fabStyle={fabStyle}
        variant="primary"
        open={open}
        visible={visible}
        icon={open ? 'arrow-collapse-down' : 'book-open-blank-variant'}
        actions={[
          {
            icon: 'account-plus',
            label: 'Add character',
            onPress: onAddCharacter,
            size: 'medium',
            testID: 'add-character-game',
          },
          {
            icon: 'information-outline',
            label: 'Add reminder',
            onPress: onAddReminder,
            size: 'medium',
            testID: 'add-reminder-game',
          },
          {
            icon: 'emoticon-devil',
            label: 'Demon bluffs',
            onPress: onDemonBluffs,
            size: 'medium',
            testID: 'demon-bluffs-game',
          },
          {
            icon: 'application-cog',
            label: 'Game setup',
            onPress: onGameSetup,
            size: 'medium',
            testID: 'setup-game',
          },
          {
            icon: 'nuke',
            label: 'Clear grimoire',
            labelTextColor: theme.colors.error,
            color: theme.colors.error,
            onPress: showConfirmClearGrim,
            size: 'medium',
            testID: 'clear-grim-game',
          },
        ]}
        onStateChange={({ open }) => setOpen(open)}/>
    </Portal>
  );
}

export default withTheme(GameControls);
