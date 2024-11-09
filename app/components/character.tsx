import CharacterData from '@/constants/characters/character_data';
import Team from '@/constants/team';
import { Fragment, useState } from 'react';
import {
  Image,
  ImageURISource,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

interface CharacterProps {
  character?: CharacterData;
  onPress?: () => void;
  nameStyle?: StyleProp<TextStyle>;
}

function Character({ character, onPress, nameStyle }: CharacterProps) {
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
          <Text style={nameStyle}>{character.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    </Fragment>
  );
}

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
