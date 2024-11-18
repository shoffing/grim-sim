import CharacterData from '@/constants/characters/character-data';
import Team from '@/constants/team';
import { Image, ImageURISource, StyleSheet, View } from 'react-native';

interface CharacterProps {
  character?: CharacterData;
  team?: Team;
}

function Character({ character, team }: CharacterProps) {
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
          alt={`${character.name} (${team || character.team})`}/>
      </View>
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
    alignItems: 'center',
    aspectRatio: 1,
    flexShrink: 1,
    justifyContent: 'center',
    width: '100%',
  },
  icon: {
    height: '90%',
    resizeMode: 'contain',
    width: '90%',
  },
});

export default Character;
