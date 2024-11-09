import Character from '@/app/components/character';
import CharacterControls from '@/app/components/character-controls';
import Token from '@/app/components/token';
import { selectGameState } from '@/app/game-slice';
import { useAppSelector } from '@/app/hooks';
import CharacterSelect from '@/app/screens/character-select';
import CharacterData from '@/constants/characters/character-data';
import { CHARACTERS, getCharacterById, getCharactersByEdition } from '@/constants/characters/characters';
import Team from '@/constants/team';
import { useState } from 'react';
import { Animated, LayoutChangeEvent, LayoutRectangle, StyleSheet } from 'react-native';
import { MD3Theme, Surface, withTheme } from 'react-native-paper';
import ValueXY = Animated.ValueXY;

interface GrimProps {
  theme: MD3Theme,
}

interface GrimCharacterData {
  data: CharacterData;
  position: ValueXY;
  team: Team;
}

function Grim({ theme }: GrimProps) {
  const { characters: characterIds, edition } = useAppSelector(state => selectGameState(state.game));
  const gameCharacters = characterIds.map(getCharacterById);

  /** Current characters on the grimoire "board". */
  const [characters, setCharacters] = useState<GrimCharacterData[]>(
    gameCharacters.map(char => ({ data: char, position: new ValueXY(), team: char.team })),
  );
  const setCharacterPosition = (ofIdx: number, position: ValueXY) => {
    setCharacters(characters.map((character, idx) => {
      return idx === ofIdx ? { ...character, position } : character;
    }));
  };
  const swapCharacterTeam = (ofIdx: number) => {
    console.log('swap team', ofIdx);
    setCharacters(characters.map((character, idx) => {
      return idx === ofIdx ?
        { ...character, team: (character.team === Team.Good ? Team.Evil : Team.Good) } :
        character;
    }));
  };
  const setCharacterData = (ofIdx: number, data: CharacterData) => {
    setCharacters(characters.map((character, idx) => {
      return idx === selectCharacterIdx ? { ...character, data } : character;
    }));
  };

  /** Handling character selection. */
  const [selectCharacterIdx, setSelectCharacterIdx] = useState<number>();
  const showCharacterSelect = (idx: number) => setSelectCharacterIdx(idx);
  const hideCharacterSelect = () => setSelectCharacterIdx(undefined);
  const characterSelectVisible = () => selectCharacterIdx != null;
  const onCharacterSelect = (selectedCharacter: CharacterData) => {
    setCharacterData(selectCharacterIdx || -1, selectedCharacter);
    hideCharacterSelect();
  };

  const [layout, setLayout] = useState<LayoutRectangle>();
  const onLayout = (event: LayoutChangeEvent) => {
    setLayout(event.nativeEvent.layout);
  };

  const currentCharacters = characters.map((character, idx) => {
    const tokenContent = (
      <Character
        nameStyle={{ color: 'black' }}
        character={getCharacterById(character.data.id)}
        team={character.team}/>
    );
    const tokenControls = (
      <CharacterControls
        onReplace={() => showCharacterSelect(idx)}
        onChangeTeam={() => swapCharacterTeam(idx)}/>
    );
    return (
      <Token
        key={character.data.id}
        position={character.position}
        containerLayout={layout}
        onMove={pos => setCharacterPosition(idx, pos)}
        content={tokenContent}
        controls={tokenControls}/>
    );
  });

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      borderRadius: theme.roundness,
      flex: 1,
      height: '100%',
      width: '100%',
    },
  });
  return (
    <>
      <CharacterSelect
        characters={getCharactersByEdition(edition)}
        visible={characterSelectVisible()}
        onDismiss={hideCharacterSelect}
        onSelect={onCharacterSelect}/>
      <Surface mode="elevated" style={styles.container} onLayout={onLayout}>
        {currentCharacters}
      </Surface>
    </>
  );
}

export default withTheme(Grim);
