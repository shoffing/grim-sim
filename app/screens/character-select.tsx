import Character from '@/app/components/character';
import { useAppSelector } from '@/app/hooks';
import TokenSelect from '@/app/screens/token-select';
import { selectReplacingCharacter } from '@/app/state/grim-slice';
import CharacterData from '@/constants/characters/character-data';
import CharacterId from '@/constants/characters/character-id';
import { getCharactersByEdition } from '@/constants/characters/characters';
import { StyleSheet, View } from 'react-native';
import { MD3Theme, Text, TouchableRipple, withTheme } from 'react-native-paper';

interface CharacterSelectProps {
  visible: boolean;
  edition: string;
  filter?: (character: CharacterData) => boolean;
  onSelect: (character: CharacterId) => void;
  onDismiss: () => void;
  theme: MD3Theme;
}

function CharacterSelect({ visible, edition, filter, onSelect, onDismiss, theme }: CharacterSelectProps) {
  const replacingCharacter = useAppSelector(state => selectReplacingCharacter(state));

  const characters = getCharactersByEdition(edition);
  const filteredCharacters = filter ? characters.filter(filter) : characters;
  const characterSelectContent = filteredCharacters.map((character, idx) => {
    const replacing = replacingCharacter?.id === character.id;
    const characterStyle = StyleSheet.create({
      touchable: {
        borderRadius: 16,
      },
      container: {
        alignItems: 'center',
        borderColor: replacing ? theme.colors.outline : undefined,
        borderRadius: 16,
        borderWidth: replacing ? 2 : undefined,
        flexDirection: 'column',
        flexShrink: 1,
        gap: 8,
        height: 'auto',
        justifyContent: 'center',
        opacity: replacing ? 0.666 : 1,
        padding: 16,
        width: 120,
      },
    });
    return (
      <TouchableRipple
        accessibilityRole="button"
        key={`character-${idx}`}
        onPress={() => onSelect(character.id)}
        style={characterStyle.touchable}
        rippleColor={theme.colors.secondary}
        borderless={true}
        testID={replacing ? 'replacing' : undefined}>
        <View style={characterStyle.container} testID={`select-${character.id}`}>
          <Character character={character}/>
          <Text variant="labelLarge" adjustsFontSizeToFit={true} numberOfLines={1}>{character.name}</Text>
        </View>
      </TouchableRipple>
    );
  });
  return <TokenSelect visible={visible} onDismiss={onDismiss} tokens={characterSelectContent}/>;
}

export default withTheme(CharacterSelect);
