import { Animated, LayoutChangeEvent, LayoutRectangle, StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';
import Token from '@/app/token';
import { useState } from 'react';

const Grim = () => {
  const [layout, setLayout] = useState<LayoutRectangle>();
  const onLayout = (event: LayoutChangeEvent) => {
    setLayout(event.nativeEvent.layout)
  };
  return (
    <Surface mode="flat" style={styles.container} onLayout={onLayout}>
      <Token position={new Animated.ValueXY({ x: 0, y: 0 })} containerLayout={layout}></Token>
      <Token position={new Animated.ValueXY({ x: 200, y: 150 })} containerLayout={layout}></Token>
      <Token position={new Animated.ValueXY({ x: 120, y: 100 })} containerLayout={layout}></Token>
    </Surface>
  )
};

export default Grim;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'green'
  },
})