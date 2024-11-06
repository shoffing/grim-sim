import { Text, Animated, Dimensions, LayoutChangeEvent, LayoutRectangle, PanResponder, StyleSheet } from 'react-native';
import { PropsWithChildren, useRef, useState } from 'react';

interface TokenProps {
  position?: Animated.ValueXY;
  containerLayout?: LayoutRectangle;
}

const Token = ({ position, containerLayout, children }: PropsWithChildren<TokenProps>) => {
  const pan = useRef(position ?? new Animated.ValueXY()).current;
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

  const [layout, setLayout] = useState<LayoutRectangle>();
  const onLayout = (event: LayoutChangeEvent) => {
    setLayout(event.nativeEvent.layout);
  };

  // Constrain the token's position to be within its container's layout rect.
  const containerWidth = containerLayout?.width ?? Dimensions.get('window').width;
  const containerHeight = containerLayout?.height ?? Dimensions.get('window').height;
  const translateX = Animated.diffClamp(pan.x, 0, containerWidth - (layout?.width ?? 0));
  const translateY = Animated.diffClamp(pan.y, 0, containerHeight - (layout?.height ?? 0));
  const style = StyleSheet.compose(
    baseStyles.container,
    { transform: [{ translateX }, { translateY }] },
  );

  return (
    <Animated.View style={style} onLayout={onLayout} {...panResponder.panHandlers}>
      {children}
    </Animated.View>
  );
};

const baseStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: 'auto',
    width: 'auto',
    borderRadius: 9999,
    backgroundColor: 'white',
  },
});

export default Token;