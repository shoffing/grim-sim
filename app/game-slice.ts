import CharacterId from '@/constants/characters/character-id';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
  edition: string;
  playerCount: number;
  characters: CharacterId[];
}

const initialState: GameState = {
  edition: 'tb',
  playerCount: 8,
  characters: [CharacterId.Imp],
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
  },
});

export const { setEdition, setPlayerCount, setCharacters } = gameSlice.actions;

const selectEdition = (state: GameState) => state.edition;
const selectPlayerCount = (state: GameState) => state.playerCount;
const selectCharacters = (state: GameState) => state.characters;
export const selectGameState = createSelector([selectEdition, selectPlayerCount, selectCharacters], (edition, playerCount, characters) => {
  return {edition, playerCount, characters};
});

export default gameSlice.reducer;
