import Character from '@/app/components/character';
import Token from '@/app/components/token';
import ShowFullScreen from '@/app/screens/show-full-screen';
import CharacterId from '@/constants/characters/character-id';
import CharacterType from '@/constants/characters/character-type';
import { getCharacterById } from '@/constants/characters/characters';
import { colorContainer, ColorContainerType, onColorContainer } from '@/constants/colors';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MD3Theme, Text, withTheme } from 'react-native-paper';

interface ShowFullScreenCharacterProps {
  visible: boolean;
  characterId?: CharacterId;
  onDismiss: () => void;
  theme: MD3Theme;
}

function ShowFullScreenCharacter({ visible, characterId, onDismiss, theme }: ShowFullScreenCharacterProps) {
  if (characterId == null) return;

  const character = getCharacterById(characterId);
  const color = {
    [CharacterType.Demon]: 'red',
    [CharacterType.Minion]: 'red',
    [CharacterType.Townsfolk]: 'blue',
    [CharacterType.Outsider]: 'blue',
    [CharacterType.Traveller]: 'purple',
    [CharacterType.Fabled]: 'amber',
  }[character.type] as ColorContainerType;

  const styles = StyleSheet.create({
    abilityText: {
      backgroundColor: colorContainer(theme.dark, color),
      borderColor: 'black',
      borderRadius: 32,
      borderWidth: 6,
      color: onColorContainer(theme.dark, color),
      fontFamily: 'GermaniaOne',
      margin: 12,
      marginBottom: 24,
      padding: 24,
      textAlign: 'center',
      textAlignVertical: 'center',
    },
  });

  return (
    <ShowFullScreen
      visible={visible}
      color={color}
      tall
      onDismiss={onDismiss}>
      <View style={{ position: 'relative', top: 32, flexDirection: 'column', gap: 24 }}>
        <Text variant="displaySmall" style={styles.abilityText} adjustsFontSizeToFit>
          {character.ability}
        </Text>
        <GestureHandlerRootView style={{}}>
          <Token
            fixed
            size={Dimensions.get('window').width * 0.6}
            tokenStyle={{ aspectRatio: 1, borderWidth: 8, borderColor: 'black' }}
            centerContent={
              <Character character={character} team={character.team}/>
            }
            bottomText={character.name}/>
        </GestureHandlerRootView>
      </View>
    </ShowFullScreen>
  );
}

export default withTheme(ShowFullScreenCharacter);
