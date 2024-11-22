import { GrimPosition } from '@/app/screens/grim';
import ReminderData from '@/constants/reminder-data';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export type ReminderKey = string & { __brand: 'Reminder Key' };

export interface ReminderState {
  key: ReminderKey;
  position: GrimPosition;
  front: boolean;
  data: ReminderData;
}

interface NewReminderState {
  data: ReminderData;
  position?: GrimPosition;
}

export interface RemindersState {
  reminders: Record<ReminderKey, ReminderState>;
}

export const initialRemindersState: RemindersState = {
  reminders: {},
};

export const remindersSlice = createSlice({
  name: 'reminders',
  initialState: initialRemindersState,
  reducers: {
    setReminders: (state, { payload }: PayloadAction<ReminderState[]>) => {
      state.reminders = _.keyBy(payload, 'key');
    },
    addReminder: (state, { payload }: PayloadAction<NewReminderState>) => {
      const key = uuidv4() as ReminderKey;
      state.reminders[key] = {
        key: key,
        position: payload.position || { x: 0, y: 0 },
        data: payload.data,
        front: true,
      };
    },
    moveReminder: (state, { payload }: PayloadAction<Pick<ReminderState, 'key' | 'position'>>) => {
      for (const reminder of Object.values(state.reminders)) {
        if (reminder.key === payload.key) {
          reminder.position = payload.position;
          reminder.front = true;
        } else {
          reminder.front = false;
        }
      }
    },
    setReminderData: (state, { payload }: PayloadAction<Pick<ReminderState, 'key' | 'data'>>) => {
      state.reminders[payload.key].data = payload.data;
    },
    removeReminder: (state, { payload }: PayloadAction<ReminderKey>) => {
      delete state.reminders[payload];
    },
    reset: () => initialRemindersState,
  },
});

export const {
  setReminders,
  addReminder,
  moveReminder,
  setReminderData,
  removeReminder,
  reset,
} = remindersSlice.actions;

export const selectReminders = (state: RemindersState) => state.reminders;
export const selectReminderByKey = (state: RemindersState, key?: ReminderKey) => key ? selectReminders(state)[key] : undefined;

export default remindersSlice.reducer;
