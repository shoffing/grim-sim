// import CharacterId from '@/constants/characters/character-id';
// import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
//
// interface SetupState {
//   edition: string;
//   playerCount: number;
//   characterIds: CharacterId[];
// }
//
// const initialState: SetupState = {
//   edition: 'tb',
//   playerCount: 8,
//   characterIds: [CharacterId.Imp],
// };
//
// export const setupSlice = createSlice({
//   name: 'setup',
//   initialState,
//   reducers: {
//     setEdition: (state, { payload }: PayloadAction<string>) => {
//       state.edition = payload;
//     },
//     setPlayerCount: (state, { payload }: PayloadAction<number>) => {
//       state.playerCount = payload;
//     },
//     setCharacters: (state, { payload }: PayloadAction<CharacterId[]>) => {
//       state.characterIds = payload;
//     },
//     reset: () => initialState,
//   },
// });
//
// export const { setEdition, setPlayerCount, setCharacters, reset } = setupSlice.actions;
//
// const selectEdition = (state: SetupState) => state.edition;
// const selectPlayerCount = (state: SetupState) => state.playerCount;
// const selectCharacterIds = (state: SetupState) => state.characterIds;
// export const selectSetupState = createSelector(
//   [selectEdition, selectPlayerCount, selectCharacterIds],
//   (edition, playerCount, characterIds) => {
//     return {
//       edition,
//       playerCount,
//       characterIds,
//     };
//   });
//
// export default setupSlice.reducer;
