import Character from '@/app/components/character';
import Token from '@/app/components/token';
import TokenSelect from '@/app/screens/token_select';
import CharacterId from '@/constants/characters/character_id';
import CharacterType from '@/constants/characters/character_type';
import { getCharacterById, getCharactersByType } from '@/constants/characters/characters';
import { Fragment, useState } from 'react';
import { Animated, LayoutChangeEvent, LayoutRectangle, StyleSheet, View } from 'react-native';
import { MD3Theme, Surface, withTheme } from 'react-native-paper';

interface GrimProps {
  theme: MD3Theme,
}

const Grim = ({ theme }: GrimProps) => {
  const [selectCharacterIdx, setSelectCharacterIdx] = useState<number>();

  const [characters, setCharacters] = useState([getCharacterById(CharacterId.Imp)]);

  const [layout, setLayout] = useState<LayoutRectangle>();
  const onLayout = (event: LayoutChangeEvent) => {
    setLayout(event.nativeEvent.layout);
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      borderRadius: theme.roundness,
      flex: 1,
      height: '100%',
      width: '100%',
    },
  });

  // TODO: move this stuff to a dedicated <CharacterSelect> component.
  const characterSelectContent = getCharactersByType(CharacterType.Townsfolk).map((character) => {
    const onPress = () => {
      setCharacters(characters.map((c, idx) => {
        if (idx === selectCharacterIdx) {
          return character;
        } else {
          return c;
        }
      }));
    };
    return (
      <View key={character.id}>
        <Character character={getCharacterById(character.id)} onPress={onPress}></Character>
      </View>
    );
  });

  const currentCharacters = characters.map((character, idx) => {
    return (
      <Fragment key={character.id}>
        <Token position={new Animated.ValueXY({ x: 0, y: 0 })} containerLayout={layout}>
          <Character character={getCharacterById(character.id)} onPress={() => setSelectCharacterIdx(idx)}></Character>
        </Token>
      </Fragment>
    );
  });

  return (
    <Fragment>
      <TokenSelect visible={selectCharacterIdx != null} onDismiss={() => { setSelectCharacterIdx(undefined) }}>
        {characterSelectContent}
      </TokenSelect>
      <Surface mode="elevated" style={styles.container} onLayout={onLayout}>
        {currentCharacters}
      </Surface>
    </Fragment>
  );
};

export default withTheme(Grim);
