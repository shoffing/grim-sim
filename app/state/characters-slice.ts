import { GrimPosition } from '@/app/screens/grim';
import CharacterId from '@/constants/characters/character-id';
import { getCharacterById } from '@/constants/characters/characters';
import Team from '@/constants/team';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import 'react-native-get-random-values';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

export type CharacterKey = string & { __brand: 'Character Key' };

export interface CharacterState {
  key: CharacterKey;
  position: GrimPosition;
  id: CharacterId;
  team: Team;
  selected: boolean;
}

interface NewCharacterState {
  id: CharacterId;
  position?: GrimPosition;
}

interface CharactersState {
  characters: Record<CharacterKey, CharacterState>;
}

const initialState: CharactersState = {
  characters: {},
};

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacters: (state, { payload }: PayloadAction<CharacterState[]>) => {
      state.characters = _.keyBy(payload, 'key');
    },
    addCharacter: (state, { payload }: PayloadAction<NewCharacterState>) => {
      const data = getCharacterById(payload.id);
      const key = uuidv4() as CharacterKey;
      state.characters[key] = {
        key,
        position: payload.position || { x: 0, y: 0 },
        id: payload.id,
        team: data.team,
        selected: false,
      };
    },
    setCharacterId: (state, { payload }: PayloadAction<Pick<CharacterState, 'key' | 'id'>>) => {
      state.characters[payload.key].id = payload.id;
    },
    moveCharacter: (state, { payload }: PayloadAction<Pick<CharacterState, 'key' | 'position'>>) => {
      state.characters[payload.key].position = payload.position;
    },
    swapCharacterTeam: (state, { payload }: PayloadAction<CharacterKey>) => {
      state.characters[payload].team = state.characters[payload].team === Team.Good ? Team.Evil : Team.Good;
    },
    removeCharacter: (state, { payload }: PayloadAction<CharacterKey>) => {
      delete state.characters[payload];
    },
    reset: () => initialState,
  },
});

export const {
  setCharacters,
  addCharacter,
  moveCharacter,
  setCharacterId,
  swapCharacterTeam,
  removeCharacter,
  reset,
} = charactersSlice.actions;

export const selectCharacters = (state: CharactersState) => state.characters;
export const selectCharacterByKey = (state: CharactersState, key?: CharacterKey) => key ? selectCharacters(state)[key] : undefined;

export default charactersSlice.reducer;
