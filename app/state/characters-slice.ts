import { GrimPosition } from '@/app/screens/grim';
import CharacterId from '@/constants/characters/character-id';
import { getCharacterById } from '@/constants/characters/characters';
import Team from '@/constants/team';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import 'react-native-get-random-values';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

export type CharacterKey = string & { __brand: 'Character Key' };

export interface PlayerState {
  name?: string;
  alive: boolean;
  ghostVote: boolean;
}

export interface CharacterState {
  key: CharacterKey;
  position: GrimPosition;
  id: CharacterId;
  team: Team;
  player: PlayerState;
}

interface NewCharacterState {
  id: CharacterId;
  position?: GrimPosition;
  player?: PlayerState;
}

export interface CharactersState {
  characters: Record<CharacterKey, CharacterState>;
  demonBluffs: CharacterId[];
}

export const initialCharactersState: CharactersState = {
  characters: {},
  demonBluffs: [],
};

export const charactersSlice = createSlice({
  name: 'characters',
  initialState: initialCharactersState,
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
        player: {
          alive: true,
          ghostVote: true,
        },
      };
    },
    setDemonBluffs: (state, { payload }: PayloadAction<CharacterId[]>) => {
      state.demonBluffs = payload;
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
    setPlayerName: (state, { payload }: PayloadAction<Pick<CharacterState, 'key'> & Pick<PlayerState, 'name'>>) => {
      state.characters[payload.key].player.name = payload.name;
    },
    killPlayer: (state, { payload }: PayloadAction<CharacterKey>) => {
      state.characters[payload].player.alive = false;
      state.characters[payload].player.ghostVote = true;
    },
    revivePlayer: (state, { payload }: PayloadAction<CharacterKey>) => {
      state.characters[payload].player.alive = true;
      state.characters[payload].player.ghostVote = true;
    },
    castPlayerGhostVote: (state, { payload }: PayloadAction<CharacterKey>) => {
      state.characters[payload].player.ghostVote = false;
    },
    restorePlayerGhostVote: (state, { payload }: PayloadAction<CharacterKey>) => {
      state.characters[payload].player.ghostVote = true;
    },
    reset: () => initialCharactersState,
  },
});

export const {
  setCharacters,
  addCharacter,
  setDemonBluffs,
  moveCharacter,
  setCharacterId,
  swapCharacterTeam,
  removeCharacter,
  setPlayerName,
  killPlayer,
  revivePlayer,
  castPlayerGhostVote,
  restorePlayerGhostVote,
  reset,
} = charactersSlice.actions;

export const selectCharacters = (state: CharactersState) => state.characters;
export const selectCharacterByKey = (state: CharactersState, key?: CharacterKey) => key ? selectCharacters(state)[key] : undefined;

export const selectDemonBluffs = (state: CharactersState) => state.demonBluffs;

export default charactersSlice.reducer;
