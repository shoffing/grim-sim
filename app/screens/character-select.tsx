import Character from '@/app/components/character';
import TokenSelect from '@/app/screens/token-select';
import CharacterData from '@/constants/characters/character-data';
import { getCharacterById } from '@/constants/characters/characters';
import { View, StyleSheet } from 'react-native';
import { MD3Theme, withTheme } from 'react-native-paper';

interface CharacterSelectProps {
  visible: boolean;
  characters: CharacterData[];
  onDismiss: () => void;
  onSelect: (character: CharacterData) => void;
  theme: MD3Theme;
}

function CharacterSelect({ visible, characters, onDismiss, onSelect, theme }: CharacterSelectProps) {
  const style = StyleSheet.create({
    name: {
      color: theme.colors.onSurface,
    },
  });
  const characterSelectContent = characters.map(character => {
    return (
      <View key={character.id}>
        <Character character={getCharacterById(character.id)}
                   onPress={() => onSelect(character)}
                   nameStyle={style.name}>
        </Character>
      </View>
    );
  });
  return (
    <TokenSelect visible={visible} onDismiss={onDismiss}>
      {characterSelectContent}
    </TokenSelect>
  );
}

export default withTheme(CharacterSelect);
