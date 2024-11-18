import CharacterData from '@/constants/characters/character-data';
import Team from '@/constants/team';
import { Image, ImageURISource, StyleProp, StyleSheet, TextStyle, View } from 'react-native';
import { Text } from 'react-native-paper';
import * as Svg from 'react-native-svg';

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
        <Image
          source={getIcon()}
          style={baseStyles.icon}
          alt={`${character.name} (${team || character.team})`} />
      </View>
      <Svg.Svg height="100%" width="100%" viewBox="0 0 100 100" style={baseStyles.name}>
        <Svg.G id="circle">
          <Svg.Circle
            r={50}
            x={50}
            y={50}
            fill="none"
            stroke="none"
            strokeWidth={0}
          />
        </Svg.G>
        <Svg.Text fill="#000" fontSize="12" textAnchor="middle">
          <Svg.TextPath href="#circle">
            Text along aff
          </Svg.TextPath>
        </Svg.Text>
      </Svg.Svg>
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
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  }
});

export default Character;
