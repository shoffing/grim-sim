import infoTokens from '@/data/info-tokens.json';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';

export interface InfoToken {
  text: string;
  color: string;
  icon?: string;
  showCharacters: boolean;
}

export interface InfoTokensState {
  default: InfoToken[];
  custom: InfoToken[];
}

export const initialInfoTokensState: InfoTokensState = {
  default: infoTokens,
  custom: [], // Load from storage??
};

export const infoTokensSlice = createSlice({
  name: 'infoTokens',
  initialState: initialInfoTokensState,
  reducers: {
    addCustomToken: (state, { payload }: PayloadAction<InfoToken>) => {
      state.custom = [...state.custom, payload];
    },

    removeCustomToken: (state, { payload }: PayloadAction<InfoToken>) => {
      state.custom = state.custom.filter(token => !_.isEqual(token, payload));
    },

    reset: () => initialInfoTokensState,
  },
});

export const {
  addCustomToken,
  removeCustomToken,
  reset,
} = infoTokensSlice.actions;

export const selectDefaultTokens = (state: InfoTokensState) => state.default;
export const selectCustomTokens = (state: InfoTokensState) => state.custom;

export default infoTokensSlice.reducer;
