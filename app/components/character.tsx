import TokenSelect from '@/app/screens/token_select';
import CharacterData from '@/constants/characters/character_data';
import CharacterType from '@/constants/characters/character_type';
import { getCharactersByType } from '@/constants/characters/characters';
import Team from '@/constants/team';
import { Fragment, useState } from 'react';
import { Image, ImageURISource, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

interface CharacterProps {
  character?: CharacterData;
  onPress?: () => void;
}

const Character = ({ character, onPress }: CharacterProps) => {
  if (character == null) return null;

  const [team, setTeam] = useState(character.team);

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
    <Fragment>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={baseStyles.container}>
          <Image source={getIcon()} style={baseStyles.icon}></Image>
          <Text>{character.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    </Fragment>
  );
};

const baseStyles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    alignItems: 'center',
    width: 128,
    height: 128,
    display: 'flex',
    justifyContent: 'center',
  },
  icon: {
    maxWidth: '75%',
    maxHeight: '60%',
    resizeMode: 'center',
  }
});

export default Character;
