import CharacterData from '@/constants/characters/character-data';
import Team from '@/constants/team';
import { useState } from 'react';
import { Image, ImageURISource, StyleProp, StyleSheet, TextStyle, View } from 'react-native';
import { Text } from 'react-native-paper';

interface CharacterProps {
  character?: CharacterData;
  team?: Team;
  nameStyle?: StyleProp<TextStyle>;
}

function Character({ character, nameStyle, team }: CharacterProps) {
  if (character == null) return null;

  const getIcon = (): ImageURISource => {
    if (team !== character.team) {
      if (team === Team.Good && character.icon.blue) {
        return character.icon.blue;
      } else if (team === Team.Evil && character.icon.red) {
        return character.icon.red;
      }
    }
    return character.icon.default;
  };

  return (
    <View style={baseStyles.container}>
      <View style={baseStyles.iconContainer}>
        <Image source={getIcon()} style={baseStyles.icon}></Image>
      </View>
      <Text variant="labelLarge" style={StyleSheet.compose(baseStyles.name, nameStyle)}>{character.name}</Text>
    </View>
  );
}

const baseStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
    width: '100%',
  },
  iconContainer: {
    width: '100%',
    aspectRatio: 1,
    flexShrink: 1,
  },
  icon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  name: {
    flexGrow: 1,
  }
});

export default Character;
