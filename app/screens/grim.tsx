import Character from '@/app/components/character';
import Token from '@/app/components/token';
import { selectGameState } from '@/app/game_slice';
import { useAppSelector } from '@/app/hooks';
import CharacterSelect from '@/app/screens/character_select';
import CharacterData from '@/constants/characters/character_data';
import { CHARACTERS, getCharacterById } from '@/constants/characters/characters';
import { useState } from 'react';
import { Animated, LayoutChangeEvent, LayoutRectangle, StyleSheet } from 'react-native';
import { MD3Theme, Surface, withTheme } from 'react-native-paper';
import ValueXY = Animated.ValueXY;

interface GrimProps {
  theme: MD3Theme,
}

interface PositionedCharacterData {
  data: CharacterData;
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

  const { characters: characterIds } = useAppSelector(state => selectGameState(state.game));
  const gameCharacters = characterIds.map(getCharacterById);

  /** Current characters on the grimoire "board". */
  const [characters, setCharacters] = useState<PositionedCharacterData[]>(
    gameCharacters.map(char => ({ data: char, position: new ValueXY() })),
  );
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
      <Token key={character.data.id} position={character.position} containerLayout={layout}
             onMove={pos => setCharacterPosition(idx, pos)}>
        <Character character={getCharacterById(character.data.id)}
                   onPress={() => showCharacterSelect(idx)}></Character>
      </Token>
    );
  });

  return (
    <>
      <CharacterSelect characters={CHARACTERS}
                       visible={characterSelectVisible()}
                       onDismiss={hideCharacterSelect}
                       onSelect={onCharacterSelect}>
      </CharacterSelect>
      <Surface mode="elevated" style={styles.container} onLayout={onLayout}>
        {currentCharacters}
      </Surface>
    </>
  );
};

export default withTheme(Grim);
