import charactersReducer from '@/app/state/characters-slice';
import grimReducer from '@/app/state/grim-slice';
import infoTokensReducer from '@/app/state/info-tokens-slice';
import remindersReducer from '@/app/state/reminders-slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { getPersistConfig } from 'redux-deep-persist';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistCombineReducers,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

const rootReducers = {
  grim: grimReducer,
  characters: charactersReducer,
  reminders: remindersReducer,
  infoTokens: infoTokensReducer,
};

const rootReducer = combineReducers(rootReducers);

const persistConfig = getPersistConfig({
  key: 'root',
  storage: AsyncStorage,
  blacklist: [
    // State that we do not want to persist.
    'grim.layout',
    'grim.selectedCharacterKey',
    'grim.replacingCharacterKey',
    'grim.reminderCharacterKey',
    'grim.selectedReminderKey',
    'grim.replacingReminderKey',
  ],
  rootReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: persistCombineReducers(persistConfig, rootReducers),
    preloadedState: preloadedState as RootState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
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

export const persistor = persistStore(store);
