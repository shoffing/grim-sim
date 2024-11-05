import { Image, View } from 'react-native';
import { CharacterData } from '@/app/data/character_data';

interface CharacterProps {
  character?: CharacterData
}

const Character = ({ character }: CharacterProps) => {
  if (character == null) return null;

  return (
    <View>
      <Image source={character.icon}></Image>
    </View>
  );
};

export default Character;
