import Character from '@/app/components/character';
import TokenSelect from '@/app/screens/token-select';
import CharacterId from '@/constants/characters/character-id';
import { getCharactersByEdition } from '@/constants/characters/characters';
import { StyleSheet, View } from 'react-native';
import { MD3Theme, Text, TouchableRipple, withTheme } from 'react-native-paper';

interface CharacterSelectProps {
  visible: boolean;
  edition: string;
  onSelect: (character: CharacterId) => void;
  onDismiss: () => void;
  theme: MD3Theme;
}

function CharacterSelect({ visible, edition, onSelect, onDismiss, theme }: CharacterSelectProps) {
  const characters = getCharactersByEdition(edition);
  const characterSelectContent = characters.map((character, idx) => {
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
    });
    return (
      <TouchableRipple
        accessibilityRole="button"
        key={`character-${idx}`}
        onPress={() => onSelect(character.id)}
        style={characterStyle.touchable}
        rippleColor={theme.colors.secondary}
        borderless={true}>
        <View style={characterStyle.container}>
          <Character character={character}/>
          <Text variant="labelLarge" adjustsFontSizeToFit={true} numberOfLines={1}>{character.name}</Text>
        </View>
      </TouchableRipple>
    );
  });
  return <TokenSelect visible={visible} onDismiss={onDismiss} tokens={characterSelectContent}/>;
}

export default withTheme(CharacterSelect);
