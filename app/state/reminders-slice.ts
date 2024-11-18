import { GrimPosition } from '@/app/screens/grim';
import ReminderData from '@/constants/reminder-data';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export interface ReminderState {
  key: string;
  position: GrimPosition;
  front: boolean;
  data: ReminderData;
}

interface NewReminderState {
  data: ReminderData;
  position?: GrimPosition;
}

interface RemindersState {
  reminders: Record<string, ReminderState>;
}

const initialState: RemindersState = {
  reminders: {},
};

export const remindersSlice = createSlice({
  name: 'reminders',
  initialState,
  reducers: {
    setReminders: (state, { payload }: PayloadAction<ReminderState[]>) => {
      state.reminders = _.keyBy(payload, 'key');
    },
    addReminder: (state, { payload }: PayloadAction<NewReminderState>) => {
      const key = uuidv4();
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
    removeReminder: (state, { payload }: PayloadAction<string>) => {
      delete state.reminders[payload];
    },
    reset: () => initialState,
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
export const selectReminderByKey = (state: RemindersState, key: string) => selectReminders(state)[key];

export default remindersSlice.reducer;
