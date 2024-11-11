enum CharacterType {
  Demon = 'demon',
  Minion = 'minion',
  Townsfolk = 'townsfolk',
  Outsider = 'outsider',
  Traveller = 'traveller',
  Fabled = 'fabled',
}

export default CharacterType;

export const SCRIPT_ORDER = [
  CharacterType.Townsfolk,
  CharacterType.Outsider,
  CharacterType.Minion,
  CharacterType.Demon,
  CharacterType.Traveller,
  CharacterType.Fabled,
];
