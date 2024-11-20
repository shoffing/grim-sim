import { REMINDER_SIZE } from '@/app/constants';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setReplacingReminder } from '@/app/state/grim-slice';
import { useState } from 'react';
import { Button, Dialog, MD3Theme, Menu, Portal, withTheme } from 'react-native-paper';
import { ReminderKey, removeReminder, selectReminderByKey } from '../state/reminders-slice';

interface ReminderControlsProps {
  reminderKey?: ReminderKey;
  onDismiss: () => void;
  theme: MD3Theme;
}

function ReminderControls({ reminderKey, onDismiss, theme }: ReminderControlsProps) {
  const dispatch = useAppDispatch();

  const [confirmingRemoveKey, setConfirmingRemoveKey] = useState<ReminderKey>();
  const showConfirmRemove = (key: ReminderKey) => setConfirmingRemoveKey(key);
  const hideConfirmRemove = () => setConfirmingRemoveKey(undefined);
  const onConfirmRemove = () => {
    confirmingRemoveKey && dispatch(removeReminder(confirmingRemoveKey));
    hideConfirmRemove();
  };

  // Hide controls when pressing menu items.
  const onPress = (wrapped: () => void) => () => {
    onDismiss();
    wrapped();
  };

  const reminder = useAppSelector(state => selectReminderByKey(state.reminders, reminderKey));
  const position = reminder?.position ? {
    x: reminder.position.x + REMINDER_SIZE / 2,
    y: reminder.position.y + REMINDER_SIZE / 2,
  } : { x: 0, y: 0 };

  return (
    <Portal>
      <Menu
        anchor={position}
        visible={!!reminderKey}
        onDismiss={onDismiss}>
        <Menu.Item leadingIcon="swap-horizontal" title="Replace" testID="replace-reminder"
                   onPress={onPress(() => reminderKey && dispatch(setReplacingReminder(reminderKey)))}/>
        <Menu.Item leadingIcon="delete" title="Remove" testID="delete-reminder"
                   onPress={onPress(() => reminderKey && showConfirmRemove(reminderKey))}/>
      </Menu>
      <Dialog visible={!!confirmingRemoveKey} onDismiss={hideConfirmRemove}>
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
