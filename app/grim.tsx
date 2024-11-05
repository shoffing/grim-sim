import { Animated, LayoutChangeEvent, LayoutRectangle, StyleSheet } from 'react-native';
import { MD3Theme, Surface, withTheme } from 'react-native-paper';
import Token from '@/app/token';
import { useState } from 'react';

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

  return (
    <Surface mode="elevated" style={styles.container} onLayout={onLayout}>
      <Token position={new Animated.ValueXY({ x: 0, y: 0 })} containerLayout={layout}></Token>
      <Token position={new Animated.ValueXY({ x: 200, y: 150 })} containerLayout={layout}></Token>
      <Token position={new Animated.ValueXY({ x: 120, y: 100 })} containerLayout={layout}></Token>
    </Surface>
  );
};

export default withTheme(Grim);
