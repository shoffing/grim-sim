import { Animated, Dimensions, LayoutRectangle, PanResponder, StyleSheet, Text } from 'react-native';
import { useRef } from 'react';

interface TokenProps {
  position?: Animated.ValueXY;
  containerLayout?: LayoutRectangle;
}

const Token = ({ position, containerLayout }: TokenProps) => {
  const pan = useRef(position || new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.extractOffset();
      },
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false },
      ),
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    }),
  ).current;

  const containerWidth = containerLayout?.width || Dimensions.get('window').width;
  const containerHeight = containerLayout?.height || Dimensions.get('window').height;
  console.log(containerWidth, containerHeight);
  const translateX = Animated.diffClamp(pan.x, 0, containerWidth);
  const translateY = Animated.diffClamp(pan.y, 0, containerHeight);
  const style = StyleSheet.compose(
    baseStyles.container,
    { transform: [{ translateX }, { translateY }] },
  );

  return (
    <Animated.View style={style} {...panResponder.panHandlers}>
      <Text>TOKEN</Text>
    </Animated.View>
  );
};

const baseStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: 64,
    width: 64,
    borderRadius: 64,
    backgroundColor: 'red',
  },
});

export default Token;