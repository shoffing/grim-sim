import charactersReducer from '@/app/state/characters-slice';
import grimReducer from '@/app/state/grim-slice';
import remindersReducer from '@/app/state/reminders-slice';
import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  grim: grimReducer,
  characters: charactersReducer,
  reminders: remindersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
