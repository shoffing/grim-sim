import CharacterData from '@/constants/characters/character_data';
import Team from '@/constants/team';
import { useState } from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageURISource,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

interface CharacterProps {
  character?: CharacterData;
}

const Character = ({ character }: CharacterProps) => {
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

  const handlePress = (event: GestureResponderEvent) => {
    // Switch team logic (move to <Player> eventually).
    if (team === Team.Good) {
      setTeam(Team.Evil);
    } else if (team === Team.Evil) {
      setTeam(Team.Good);
    } else {
      setTeam(Team.Good);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={baseStyles.container}>
        <Image source={getIcon()} style={baseStyles.icon}></Image>
        <Text>{character.name}</Text>
      </View>
    </TouchableWithoutFeedback>
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
