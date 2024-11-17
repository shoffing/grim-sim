import { CharacterStateKey, selectCharacterByKey } from '@/app/state/characters-slice';
import { ReminderStateKey, selectReminderByKey } from '@/app/state/reminders-slice';
import { RootState } from '@/app/state/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LayoutRectangle } from 'react-native';

interface GrimState {
  edition: string;
  layout?: LayoutRectangle;
  selectedCharacterKey?: CharacterStateKey;
  replacingCharacterKey?: CharacterStateKey;
  reminderCharacterKey?: CharacterStateKey;
  selectedReminderKey?: ReminderStateKey;
  replacingReminderKey?: ReminderStateKey;
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

    setSelectedCharacter: (state, { payload }: PayloadAction<CharacterStateKey>) => {
      state.selectedCharacterKey = payload;
    },
    clearSelectedCharacter: (state) => {
      state.selectedCharacterKey = undefined;
    },
    setReplacingCharacter: (state, { payload }: PayloadAction<CharacterStateKey>) => {
      state.replacingCharacterKey = payload;
    },
    clearReplacingCharacter: (state) => {
      state.replacingCharacterKey = undefined;
    },
    setReminderCharacter: (state, { payload }: PayloadAction<CharacterStateKey>) => {
      state.reminderCharacterKey = payload;
    },
    clearReminderCharacter: (state) => {
      state.reminderCharacterKey = undefined;
    },

    setSelectedReminder: (state, { payload }: PayloadAction<ReminderStateKey>) => {
      state.selectedReminderKey = payload;
    },
    clearSelectedReminder: (state) => {
      state.selectedReminderKey = undefined;
    },
    setReplacingReminder: (state, { payload }: PayloadAction<ReminderStateKey>) => {
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
  setSelectedCharacter,
  clearSelectedCharacter,
  setReplacingCharacter,
  clearReplacingCharacter,
  setReminderCharacter,
  clearReminderCharacter,
  setSelectedReminder,
  clearSelectedReminder,
  setReplacingReminder,
  clearReplacingReminder,
  reset,
} = grimSlice.actions;

export const selectLayout = (state: GrimState) => state.layout;
export const selectEdition = (state: GrimState) => state.edition;
export const selectSelectedCharacter = (state: RootState) => {
  return state.grim.selectedCharacterKey != null ? selectCharacterByKey(state.characters, state.grim.selectedCharacterKey) : undefined;
};
export const selectReplacingCharacterKey = (state: GrimState) => state.replacingCharacterKey;
export const selectReminderCharacter = (state: RootState) => {
  return state.grim.reminderCharacterKey != null ? selectCharacterByKey(state.characters, state.grim.reminderCharacterKey) : undefined;
};
export const selectSelectedReminder = (state: RootState) => {
  return state.grim.selectedReminderKey != null ? selectReminderByKey(state.reminders, state.grim.selectedReminderKey) : undefined;
};
export const selectReplacingReminderKey = (state: GrimState) => state.replacingReminderKey;

export default grimSlice.reducer;
