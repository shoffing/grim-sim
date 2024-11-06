import { Image, View } from 'react-native';
import { CharacterData } from '@/app/data/character_data';

interface CharacterProps {
  character?: CharacterData
}

const Character = ({ character }: CharacterProps) => {
  if (character == null) return null;

  return (
    <View>
      <Image source={character.icon.default} style={{width: 128, height: 128}}></Image>
      <Image source={character.icon.red} style={{width: 128, height: 128}}></Image>
      <Image source={character.icon.blue} style={{width: 128, height: 128}}></Image>
    </View>
  );
};

export default Character;
