import Character from '@/app/components/character';
import TokenSelect from '@/app/screens/token_select';
import CharacterData from '@/constants/characters/character_data';
import CharacterType from '@/constants/characters/character_type';
import { getCharacterById, getCharactersByType } from '@/constants/characters/characters';
import { View } from 'react-native';

interface CharacterSelectProps {
  visible: boolean;
  onDismiss: () => void;
  onSelect: (character: CharacterData) => void;
}

const CharacterSelect = ({ visible, onDismiss, onSelect }: CharacterSelectProps) => {
  const characters = [
    ...getCharactersByType(CharacterType.Townsfolk),
    ...getCharactersByType(CharacterType.Outsider),
    ...getCharactersByType(CharacterType.Minion),
    ...getCharactersByType(CharacterType.Demon),
    ...getCharactersByType(CharacterType.Traveller),
    ...getCharactersByType(CharacterType.Fabled),
  ];
  const characterSelectContent = characters.map(character => {
    return (
      <View key={character.id}>
        <Character character={getCharacterById(character.id)} onPress={() => onSelect(character)}></Character>
      </View>
    );
  });
  return (
    <TokenSelect visible={visible} onDismiss={onDismiss}>
      {characterSelectContent}
    </TokenSelect>
  );
};

export default CharacterSelect;
