import { PropsWithChildren, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  LayoutChangeEvent,
  LayoutRectangle,
  PanResponder,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { MD3Theme, withTheme } from 'react-native-paper';
import { PanResponderGestureState } from 'react-native/Libraries/Interaction/PanResponder';
import { GestureResponderEvent } from 'react-native/Libraries/Types/CoreEventTypes';

const DRAG_THRESHOLD = 20;

const CONTROLS_VISIBLE_BORDER_SIZE = 8;

interface TokenProps {
  position?: Animated.ValueXY;
  selected: boolean;
  front: boolean;
  containerLayout?: LayoutRectangle;
  onMoveStart?: (position: Animated.ValueXY) => void;
  onMoveEnd?: (position: Animated.ValueXY) => void;
  onPress?: () => void;
  theme: MD3Theme;
}

function Token(props: PropsWithChildren<TokenProps>) {
  const { position, selected, front, containerLayout, onMoveStart, onMoveEnd, onPress, theme, children } = props;

  const [layout, setLayout] = useState<LayoutRectangle>();
  const onLayout = (event: LayoutChangeEvent) => {
    setLayout(event.nativeEvent.layout);
  };

  const pan = useRef(position ?? new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        return Math.sqrt(Math.pow(gestureState.dx, 2) + Math.pow(gestureState.dy, 2)) > DRAG_THRESHOLD;
      },
      onPanResponderGrant: () => {
        pan.extractOffset();
        onMoveStart?.(pan);
      },
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false },
      ),
      onPanResponderRelease: () => {
        pan.extractOffset();
        onMoveEnd?.(pan);
      },
    }),
  ).current;

  // Constrain the token's position to be within its container's layout rect.
  const containerWidth = containerLayout?.width ?? Dimensions.get('window').width;
  const containerHeight = containerLayout?.height ?? Dimensions.get('window').height;
  const translateX = Animated.diffClamp(pan.x, 0, containerWidth - (layout?.width ?? 0));
  const translateY = Animated.diffClamp(pan.y, 0, containerHeight - (layout?.height ?? 0));

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      flexDirection: 'column',
      position: 'absolute',
      transform: [{ translateX }, { translateY }],
      zIndex: front ? 1 : 0,
    },
    token: {
      alignItems: 'center',
      backgroundColor: 'white',
      borderColor: theme.colors.primary,
      borderRadius: 9999,
      borderStyle: 'solid',
      borderWidth: selected ? CONTROLS_VISIBLE_BORDER_SIZE : 0,
      height: 128 + (selected ? CONTROLS_VISIBLE_BORDER_SIZE * 2 : 0),
      justifyContent: 'center',
      left: selected ? -CONTROLS_VISIBLE_BORDER_SIZE : 0,
      top: selected ? -CONTROLS_VISIBLE_BORDER_SIZE : 0,
      width: 128 + (selected ? CONTROLS_VISIBLE_BORDER_SIZE * 2 : 0),
    },
    tokenContent: {
      height: '70%',
      width: '70%',
    },
  });
  return (
    <Animated.View style={styles.container} onLayout={onLayout} {...panResponder.panHandlers}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.token}>
          <View style={styles.tokenContent}>
            {children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
}

export default withTheme(Token);