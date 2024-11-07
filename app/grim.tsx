import Character from '@/app/character';
import Token from '@/app/token';
import CharacterId from '@/constants/characters/character_id';
import { getCharacterById } from '@/constants/characters/characters';
import _ from 'lodash';
import { useState } from 'react';
import { Animated, LayoutChangeEvent, LayoutRectangle, StyleSheet } from 'react-native';
import { MD3Theme, Surface, withTheme } from 'react-native-paper';

interface GrimProps {
  theme: MD3Theme,
}

const Grim = ({ theme }: GrimProps) => {
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

  const chars = _.sampleSize(CharacterId, 10);
  const rendered = chars.map((id: CharacterId) => {
    return (
      <Token key={id} position={new Animated.ValueXY({ x: 0, y: 0 })} containerLayout={layout}>
        <Character character={getCharacterById(id)}></Character>
      </Token>
    );
  });

  return (
    <Surface mode="elevated" style={styles.container} onLayout={onLayout}>
      {rendered}
    </Surface>
  );
};

export default withTheme(Grim);
