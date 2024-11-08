import { PropsWithChildren, useRef, useState } from 'react';
import { Animated, Dimensions, LayoutChangeEvent, LayoutRectangle, PanResponder, StyleSheet } from 'react-native';
import { PanResponderGestureState } from 'react-native/Libraries/Interaction/PanResponder';
import { GestureResponderEvent } from 'react-native/Libraries/Types/CoreEventTypes';

const DRAG_THRESHOLD = 20;

interface TokenProps {
  position?: Animated.ValueXY;
  containerLayout?: LayoutRectangle;
  onMove?: (position: Animated.ValueXY) => void;
}

const Token = ({ position, containerLayout, onMove, children }: PropsWithChildren<TokenProps>) => {
  const pan = useRef(position ?? new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        return Math.sqrt(Math.pow(gestureState.dx, 2) + Math.pow(gestureState.dy, 2)) > DRAG_THRESHOLD;
      },
      onPanResponderGrant: () => {
        pan.extractOffset();
      },
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false },
      ),
      onPanResponderRelease: () => {
        pan.extractOffset();
        onMove?.(pan);
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
    borderRadius: 9999,
    backgroundColor: 'white',
  },
});

export default Token;