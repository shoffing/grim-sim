import Character from '@/app/components/character';
import TokenSelect from '@/app/screens/token_select';
import CharacterData from '@/constants/characters/character_data';
import { getCharacterById } from '@/constants/characters/characters';
import { View } from 'react-native';

interface CharacterSelectProps {
  visible: boolean;
  characters: CharacterData[];
  onDismiss: () => void;
  onSelect: (character: CharacterData) => void;
}

function CharacterSelect({ visible, characters, onDismiss, onSelect }: CharacterSelectProps) {
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
}

export default CharacterSelect;
