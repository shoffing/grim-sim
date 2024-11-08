import CharacterIcon from '@/constants/characters/character_icon';
import CharacterId from '@/constants/characters/character_id';
import CharacterType from '@/constants/characters/character_type';
import Edition from '@/constants/editions/edition_id';
import Team from '@/constants/team';

import data from '@/data/characters.json';

/*
  {
    "id": "innkeeper",
    "name": "Innkeeper",
    "edition": "bmr",
    "type": "townsfolk",
    "firstNight": 0,
    "firstNightReminder": "",
    "otherNight": 9,
    "otherNightReminder": "The previously protected and drunk players lose those markers. The Innkeeper points to two players. Those players are protected. One is drunk.",
    "reminders": [
      "Protected",
      "Drunk"
    ],
    "setup": false,
    "ability": "Each night*, choose 2 players: they can't die tonight, but 1 is drunk until dusk."
  },
 */

class CharacterData {
  id: CharacterId;
  icon: CharacterIcon;
  type: CharacterType;
  edition: string;
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
    this.edition = characterData.edition;
  }
}

export default CharacterData;
