import Character from '@/app/components/character';
import CharacterControls from '@/app/components/character-controls';
import Token from '@/app/components/token';
import { selectGameState } from '@/app/game-slice';
import { useAppSelector } from '@/app/hooks';
import CharacterSelect from '@/app/screens/character-select';
import CharacterData from '@/constants/characters/character-data';
import { getCharacterById, getCharactersByEdition } from '@/constants/characters/characters';
import Team from '@/constants/team';
import { useState } from 'react';
import { Animated, LayoutChangeEvent, LayoutRectangle, StyleSheet } from 'react-native';
import { MD3Theme, Surface, withTheme } from 'react-native-paper';
import ValueXY = Animated.ValueXY;
import { produce } from 'immer';
import { useImmer } from 'use-immer';

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
  const [characters, setCharacters] = useImmer(gameCharacters.map(char => {
    return ({ data: char, position: new ValueXY(), team: char.team });
  }));
  const setCharacterPosition = (character: GrimCharacterData, position: ValueXY) => {
    setCharacters(draft => {
      const char = draft.find(c => c === character);
      if (char) char.position = position;
    });
  };

  /** Handling CharacterControls. */
  const [selectedCharacterIdx, setSelectedCharacterIdx] = useState<number>();
  const swapSelectedCharacterTeam = () => {
    if (selectedCharacterIdx == null) return;
    setCharacters(draft => {
      draft[selectedCharacterIdx].team = (draft[selectedCharacterIdx].team === Team.Good ? Team.Evil : Team.Good);
    });
  };
  const replaceSelectedCharacterData = (newData: CharacterData) => {
    if (selectedCharacterIdx == null) return;
    setCharacters(draft => void (draft[selectedCharacterIdx].data = newData));
  };
  const removeSelectedCharacter = () => {
    if (selectedCharacterIdx == null) return;
    setCharacters(draft => void (draft.splice(selectedCharacterIdx, 1)));
    setSelectedCharacterIdx(undefined);
  };

  /** Handling character selection. */
  const [characterSelectVisible, setCharacterSelectVisible] = useState(false);
  const showCharacterSelect = () => setCharacterSelectVisible(true);
  const hideCharacterSelect = () => setCharacterSelectVisible(false);
  const onCharacterSelect = (selectedCharacter: CharacterData) => {
    if (selectedCharacterIdx != null) {
      replaceSelectedCharacterData(selectedCharacter);
    }
    hideCharacterSelect();
  };

  const [layout, setLayout] = useState<LayoutRectangle>();
  const onLayout = (event: LayoutChangeEvent) => {
    setLayout(event.nativeEvent.layout);
  };

  const currentCharacters = characters.map((character, idx) => {
    const onMove = (pos: ValueXY) => {
      setCharacterPosition(character, pos);
    };
    const onPress = () => {
      setSelectedCharacterIdx(selectedCharacterIdx === idx ? undefined : idx);
    };
    return (
      <Token
        key={character.data.id}
        position={character.position}
        selected={idx === selectedCharacterIdx}
        containerLayout={layout}
        onMove={onMove}
        onPress={onPress}>
        <Character
          nameStyle={{ color: 'black' }}
          character={getCharacterById(character.data.id)}
          team={character.team}/>
      </Token>
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
        visible={characterSelectVisible}
        onDismiss={hideCharacterSelect}
        onSelect={onCharacterSelect}/>
      <CharacterControls
        visible={selectedCharacterIdx != null}
        onChangeTeam={swapSelectedCharacterTeam}
        onReplace={showCharacterSelect}
        onRemove={removeSelectedCharacter}/>
      <Surface mode="elevated" style={styles.container} onLayout={onLayout}>
        {currentCharacters}
      </Surface>
    </>
  );
}

export default withTheme(Grim);
