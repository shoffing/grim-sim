import Character from '@/app/components/character';
import Token from '@/app/components/token';
import CharacterSelect from '@/app/screens/character_select';
import Character_data from '@/constants/characters/character_data';
import CharacterData from '@/constants/characters/character_data';
import CharacterId from '@/constants/characters/character_id';
import { getCharacterById } from '@/constants/characters/characters';
import { Fragment, useState } from 'react';
import { Animated, LayoutChangeEvent, LayoutRectangle, StyleSheet } from 'react-native';
import { MD3Theme, Surface, withTheme } from 'react-native-paper';
import ValueXY = Animated.ValueXY;

interface GrimProps {
  theme: MD3Theme,
}

interface PositionedCharacterData {
  data: Character_data;
  position: ValueXY;
}

const Grim = ({ theme }: GrimProps) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      borderRadius: theme.roundness,
      flex: 1,
      height: '100%',
      width: '100%',
    },
  });

  /** Current characters on the grimoire "board". */
  const [characters, setCharacters] = useState<PositionedCharacterData[]>([{
    data: getCharacterById(CharacterId.Imp),
    position: new ValueXY(),
  }]);
  const setCharacterPosition = (ofIdx: number, position: ValueXY) => {
    setCharacters(characters.map((character, idx) => {
      return idx === ofIdx ? { ...character, position } : character;
    }));
  };

  /** Handling character selection. */
  const [selectCharacterIdx, setSelectCharacterIdx] = useState<number>();
  const showCharacterSelect = (idx: number) => setSelectCharacterIdx(idx);
  const hideCharacterSelect = () => setSelectCharacterIdx(undefined);
  const characterSelectVisible = () => selectCharacterIdx != null;
  const onCharacterSelect = (selectedCharacter: CharacterData) => {
    setCharacters(characters.map((character, idx) => {
      return idx === selectCharacterIdx ? { ...character, data: selectedCharacter } : character;
    }));
    hideCharacterSelect();
  };

  const [layout, setLayout] = useState<LayoutRectangle>();
  const onLayout = (event: LayoutChangeEvent) => {
    setLayout(event.nativeEvent.layout);
  };

  const currentCharacters = characters.map((character, idx) => {
    return (
      <Fragment key={character.data.id}>
        <Token position={character.position} containerLayout={layout} onMove={pos => setCharacterPosition(idx, pos)}>
          <Character character={getCharacterById(character.data.id)}
                     onPress={() => showCharacterSelect(idx)}></Character>
        </Token>
      </Fragment>
    );
  });

  return (
    <Fragment>
      <CharacterSelect visible={characterSelectVisible()}
                       onDismiss={hideCharacterSelect}
                       onSelect={onCharacterSelect}>
      </CharacterSelect>
      <Surface mode="elevated" style={styles.container} onLayout={onLayout}>
        {currentCharacters}
      </Surface>
    </Fragment>
  );
};

export default withTheme(Grim);
