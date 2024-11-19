import { CharacterKey, selectCharacterByKey } from '@/app/state/characters-slice';
import { ReminderKey } from '@/app/state/reminders-slice';
import { RootState } from '@/app/state/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LayoutRectangle } from 'react-native';

interface GrimState {
  edition: string;
  layout?: LayoutRectangle;
  selectedCharacterKey?: CharacterKey;
  replacingCharacterKey?: CharacterKey;
  reminderCharacterKey?: CharacterKey;
  selectedReminderKey?: ReminderKey;
  replacingReminderKey?: ReminderKey;
}

const initialState: GrimState = {
  edition: 'tb',
};

export const grimSlice = createSlice({
  name: 'grim',
  initialState,
  reducers: {
    setEdition: (state, { payload }: PayloadAction<string>) => {
      state.edition = payload;
    },

    setLayout: (state, { payload }: PayloadAction<LayoutRectangle>) => {
      state.layout = payload;
    },

    setReplacingCharacter: (state, { payload }: PayloadAction<CharacterKey>) => {
      state.replacingCharacterKey = payload;
    },
    clearReplacingCharacter: (state) => {
      state.replacingCharacterKey = undefined;
    },
    setReminderCharacter: (state, { payload }: PayloadAction<CharacterKey>) => {
      state.reminderCharacterKey = payload;
    },
    clearReminderCharacter: (state) => {
      state.reminderCharacterKey = undefined;
    },

    setReplacingReminder: (state, { payload }: PayloadAction<ReminderKey>) => {
      state.replacingReminderKey = payload;
    },
    clearReplacingReminder: (state) => {
      state.replacingReminderKey = undefined;
    },

    reset: () => initialState,
  },
});

export const {
  setLayout,
  setEdition,
  setReplacingCharacter,
  clearReplacingCharacter,
  setReminderCharacter,
  clearReminderCharacter,
  setReplacingReminder,
  clearReplacingReminder,
  reset,
} = grimSlice.actions;

export const selectLayout = (state: GrimState) => state.layout;
export const selectEdition = (state: GrimState) => state.edition;
export const selectReplacingCharacterKey = (state: GrimState) => state.replacingCharacterKey;
export const selectReminderCharacter = (state: RootState) => {
  return state.grim.reminderCharacterKey != null ? selectCharacterByKey(state.characters, state.grim.reminderCharacterKey) : undefined;
};
export const selectReplacingReminderKey = (state: GrimState) => state.replacingReminderKey;

export default grimSlice.reducer;
