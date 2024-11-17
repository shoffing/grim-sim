import charactersReducer from '@/app/state/characters-slice';
import grimReducer from '@/app/state/grim-slice';
import remindersReducer from '@/app/state/reminders-slice';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    grim: grimReducer,
    characters: charactersReducer,
    reminders: remindersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
