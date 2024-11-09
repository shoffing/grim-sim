import Character from '@/app/components/character';
import TokenSelect from '@/app/screens/token-select';
import CharacterData from '@/constants/characters/character-data';
import { getCharacterById } from '@/constants/characters/characters';
import { View, StyleSheet } from 'react-native';
import { MD3Theme, Text, TouchableRipple, withTheme } from 'react-native-paper';

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
    const characterStyle = StyleSheet.create({
      touchable: {
        borderRadius: 16,
      },
      container: {
        width: 120,
        height: 'auto',
        borderRadius: 16,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        flexShrink: 1,
        gap: 8,
      },
      font: {
        color: theme.colors.onSurface,
      },
    });
    return (
      <TouchableRipple
        onPress={() => onSelect(character)}
        key={character.id}
        style={characterStyle.touchable}
        rippleColor={theme.colors.secondary}
        borderless={true}>
        <View style={characterStyle.container}>
          <Character
            character={character}
            nameStyle={characterStyle.font}>
          </Character>
        </View>
      </TouchableRipple>
    );
  });
  return (
    <TokenSelect visible={visible} onDismiss={onDismiss}>
      {characterSelectContent}
    </TokenSelect>
  );
}

export default withTheme(CharacterSelect);
