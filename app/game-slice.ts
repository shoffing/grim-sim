import CharacterId from '@/constants/characters/character-id';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
  edition: string;
  playerCount: number;
  characters: CharacterId[];

  // Whether initialization of a new game needs to happen.
  // Layout the tokens in an ellipse, etc.
  initialize: boolean;
}

const initialState: GameState = {
  edition: 'tb',
  playerCount: 8,
  characters: [CharacterId.Imp],
  initialize: false,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setEdition: (state, { payload }: PayloadAction<string>) => {
      state.edition = payload;
    },
    setPlayerCount: (state, { payload }: PayloadAction<number>) => {
      state.playerCount = payload;
    },
    setCharacters: (state, { payload }: PayloadAction<CharacterId[]>) => {
      state.characters = payload;
    },
    setInitialize: (state, { payload }: PayloadAction<boolean>) => {
      state.initialize = payload;
    },
  },
});

export const { setEdition, setPlayerCount, setCharacters, setInitialize } = gameSlice.actions;

const selectEdition = (state: GameState) => state.edition;
const selectPlayerCount = (state: GameState) => state.playerCount;
const selectCharacters = (state: GameState) => state.characters;
const selectInitialize = (state: GameState) => state.initialize;
export const selectGameState = createSelector(
  [selectEdition, selectPlayerCount, selectCharacters, selectInitialize],
  (edition, playerCount, characters, initialize) => {
    return {
      edition,
      playerCount,
      characters,
      initialize,
    };
  });

export default gameSlice.reducer;
