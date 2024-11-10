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
import { DimensionValue } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import { GestureResponderEvent } from 'react-native/Libraries/Types/CoreEventTypes';

const DRAG_THRESHOLD = 20;

export interface TokenPosition {
  x: number;
  y: number;
}

interface TokenProps {
  position?: Animated.ValueXY;
  selected: boolean;
  front: boolean;
  size: number;
  containerLayout?: LayoutRectangle;
  onMoveStart?: (position: TokenPosition) => void;
  onMoveEnd?: (position: TokenPosition) => void;
  onPress?: () => void;
  theme: MD3Theme;
}

function Token(props: PropsWithChildren<TokenProps>) {
  const {
    position: initialPosition,
    selected,
    front,
    size,
    containerLayout,
    onMoveStart,
    onMoveEnd,
    onPress,
    theme,
    children,
  } = props;

  const selectedBorderSize = Math.round(size / 16);

  const [layout, setLayout] = useState<LayoutRectangle>();
  const onLayout = (event: LayoutChangeEvent) => {
    setLayout(event.nativeEvent.layout);
  };

  const position = useRef<TokenPosition>({x: 0, y: 0});

  const pan = useRef(initialPosition ?? new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_e, gestureState) => {
        return Math.sqrt(Math.pow(gestureState.dx, 2) + Math.pow(gestureState.dy, 2)) > DRAG_THRESHOLD;
      },
      onPanResponderGrant: () => {
        onMoveStart?.(position.current);
        pan.extractOffset();
      },
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false },
      ),
      onPanResponderRelease: () => {
        onMoveEnd?.(position.current);
        pan.extractOffset();
      },
    }),
  ).current;

  // Constrain the token's position to be within its container's layout rect.
  const containerWidth = containerLayout?.width ?? Dimensions.get('window').width;
  const containerHeight = containerLayout?.height ?? Dimensions.get('window').height;
  const translateX = Animated.diffClamp(pan.x, 0, containerWidth - (layout?.width ?? 0));
  const translateY = Animated.diffClamp(pan.y, 0, containerHeight - (layout?.height ?? 0));
  translateX.addListener(({value}) => position.current = { ...position.current, x: value });
  translateY.addListener(({value}) => position.current = { ...position.current, y: value });

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
      borderRadius: size * 2,
      borderStyle: 'solid',
      borderWidth: selected ? selectedBorderSize : 0,
      height: size + (selected ? selectedBorderSize * 2 : 0),
      justifyContent: 'center',
      left: selected ? -selectedBorderSize : 0,
      top: selected ? -selectedBorderSize : 0,
      width: size + (selected ? selectedBorderSize * 2 : 0),
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