import { GrimPosition } from '@/app/screens/grim';
import CharacterId from '@/constants/characters/character-id';
import { getCharacterById } from '@/constants/characters/characters';
import Team from '@/constants/team';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';

export type CharacterStateKey = number;

export interface CharacterState {
  key: CharacterStateKey;
  position: GrimPosition;
  front: boolean;
  id: CharacterId;
  team: Team;
  selected: boolean;
}

interface NewCharacterState {
  id: CharacterId;
  position?: GrimPosition;
}

interface CharactersState {
  characters: CharacterState[];
}

const initialState: CharactersState = {
  characters: [
    {
      key: 0,
      position: { x: 0, y: 0 },
      front: false,
      id: CharacterId.Imp,
      team: Team.Evil,
      selected: false,
    },
  ],
};

const characterStateSetter = <T extends keyof CharacterState>(state: CharactersState, { payload }: PayloadAction<Pick<CharacterState, 'key' | T>>) => {
  state.characters = state.characters.map(character => character.key === payload.key ? { ...character, ...payload } : character);
};

const nextReminderId = (state: CharactersState) => {
  const last = _.last(state.characters);
  return last ? last.key + 1 : 0;
};

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacters: (state, { payload }: PayloadAction<CharacterState[]>) => {
      state.characters = payload;
    },
    addCharacter: (state, { payload }: PayloadAction<NewCharacterState>) => {
      const data = getCharacterById(payload.id);
      state.characters = [
        ...state.characters,
        {
          key: nextReminderId(state),
          position: payload.position || { x: 0, y: 0 },
          id: payload.id,
          front: true,
          team: data.team,
          selected: false,
        },
      ];
    },
    setCharacterPosition: characterStateSetter<'position'>,
    setCharacterId: characterStateSetter<'id'>,
    swapCharacterTeam: (state, { payload }: PayloadAction<CharacterStateKey>) => {
      state.characters = state.characters.map(character => {
        return character.key === payload ? {
          ...character,
          team: character.team === Team.Good ? Team.Evil : Team.Good,
        } : character;
      });
    },
    setCharacterFront: (state, { payload }: PayloadAction<CharacterStateKey>) => {
      state.characters = state.characters.map(character => ({ ...character, front: character.key === payload }));
    },
    removeCharacter: (state, { payload }: PayloadAction<CharacterStateKey>) => {
      state.characters = state.characters.filter(character => character.key !== payload);
    },
    reset: () => initialState,
  },
});

export const {
  setCharacters,
  addCharacter,
  setCharacterPosition,
  setCharacterId,
  swapCharacterTeam,
  setCharacterFront,
  removeCharacter,
  reset,
} = charactersSlice.actions;

export const selectCharacters = (state: CharactersState) => state.characters;
export const selectCharacterByKey = (state: CharactersState, key: CharacterStateKey) => {
  return selectCharacters(state).find(character => character.key === key);
};

export default charactersSlice.reducer;
