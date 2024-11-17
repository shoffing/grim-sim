import { REMINDER_SIZE } from '@/app/constants';
import { useAppDispatch } from '@/app/hooks';
import { clearSelectedReminder, setReplacingReminder } from '@/app/state/grim-slice';
import { useState } from 'react';
import { Button, Dialog, MD3Theme, Menu, Portal, withTheme } from 'react-native-paper';
import { ReminderState, removeReminder } from '../state/reminders-slice';

interface ReminderControlsProps {
  reminder: ReminderState;
  selectedReminder?: ReminderState;
  theme: MD3Theme;
}

function ReminderControls({ reminder, selectedReminder, theme }: ReminderControlsProps) {
  const dispatch = useAppDispatch();

  const [confirmRemove, setConfirmRemove] = useState(false);
  const showConfirmRemove = () => setConfirmRemove(true);
  const hideConfirmRemove = () => setConfirmRemove(false);
  const onConfirmRemove = () => {
    hideConfirmRemove();
    dispatch(removeReminder(reminder.key));
  };

  // Hide controls when pressing menu items.
  const onPress = (wrapped: () => void) => () => {
    dispatch(clearSelectedReminder());
    wrapped();
  };

  const position = {
    x: reminder.position.x,
    y: reminder.position.y + REMINDER_SIZE,
  };

  return (
    <Portal>
      <Menu
        anchor={position}
        visible={selectedReminder === reminder}
        onDismiss={() => dispatch(clearSelectedReminder())}>
        <Menu.Item leadingIcon="swap-horizontal" title="Replace" testID="replace-reminder"
                   onPress={onPress(() => dispatch(setReplacingReminder(reminder.key)))}/>
        <Menu.Item leadingIcon="delete" title="Remove" testID="delete-reminder"
                   onPress={onPress(showConfirmRemove)}/>
      </Menu>
      <Dialog visible={confirmRemove} onDismiss={hideConfirmRemove}>
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
