import CharacterIcon from '@/constants/characters/character_icon';
import CharacterId from '@/constants/characters/character_id';
import CharacterType from '@/constants/characters/character_type';
import Team from '@/constants/team';

import data from '@/data/characters.json';

class CharacterData {
  id: CharacterId;
  icon: CharacterIcon;
  type: CharacterType;
  name: string;
  ability: string;
  reminders: string[] = [];

  get team(): Team {
    switch (this.type) {
      case CharacterType.Demon:
      case CharacterType.Minion:
        return Team.Evil;
      case CharacterType.Townsfolk:
      case CharacterType.Outsider:
        return Team.Good;
      default:
        return Team.None;
    }
  }

  constructor(id: CharacterId, icon: CharacterIcon) {
    this.id = id;
    this.icon = icon;

    const characterData = data.find(c => c.id === id);
    if (characterData == null) {
      throw new Error(`Character import failed, "${id}" was not found.`);
    }
    this.type = characterData.type as CharacterType;
    this.name = characterData.name;
    this.ability = characterData.ability;
    this.reminders = characterData.reminders;
  }
}

export default CharacterData;
