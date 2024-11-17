import { GrimPosition } from '@/app/screens/grim';
import ReminderData from '@/constants/reminder-data';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';

export type ReminderStateKey = number;

export interface ReminderState {
  key: ReminderStateKey;
  position: GrimPosition;
  front: boolean;
  data: ReminderData;
}

interface NewReminderState {
  data: ReminderData;
  position?: GrimPosition;
}

interface RemindersState {
  reminders: ReminderState[];
}

const initialState: RemindersState = {
  reminders: [],
};

const reminderStateSetter = <T extends keyof ReminderState>(state: RemindersState, { payload }: PayloadAction<Pick<ReminderState, 'key' | T>>) => {
  state.reminders = state.reminders.map(reminder => reminder.key === payload.key ? { ...reminder, ...payload } : reminder);
};

const nextReminderId = (state: RemindersState) => {
  const last = _.last(state.reminders);
  return last ? last.key + 1 : 0;
};

export const remindersSlice = createSlice({
  name: 'reminders',
  initialState,
  reducers: {
    setReminders: (state, { payload }: PayloadAction<ReminderState[]>) => {
      state.reminders = payload;
    },
    addReminder: (state, { payload }: PayloadAction<NewReminderState>) => {
      state.reminders = [
        ...state.reminders,
        {
          key: nextReminderId(state),
          position: payload.position || { x: 0, y: 0 },
          data: payload.data,
          front: true,
        },
      ];
    },
    setReminderPosition: reminderStateSetter<'position'>,
    setReminderData: reminderStateSetter<'data'>,
    setReminderFront: (state, { payload }: PayloadAction<ReminderStateKey>) => {
      state.reminders = state.reminders.map(reminder => ({ ...reminder, front: reminder.key === payload }));
    },
    removeReminder: (state, { payload }: PayloadAction<ReminderStateKey>) => {
      state.reminders = state.reminders.filter(reminder => reminder.key !== payload);
    },
    reset: () => initialState,
  },
});

export const {
  setReminders,
  addReminder,
  setReminderPosition,
  setReminderData,
  setReminderFront,
  removeReminder,
  reset,
} = remindersSlice.actions;

export const selectReminders = (state: RemindersState) => state.reminders;
export const selectReminderByKey = (state: RemindersState, key: ReminderStateKey) => {
  return selectReminders(state).find(reminder => reminder.key === key);
};

export default remindersSlice.reducer;
