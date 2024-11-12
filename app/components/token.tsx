import { PropsWithChildren, useRef } from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  LayoutRectangle,
  PanResponder,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { MD3Theme, withTheme } from 'react-native-paper';

const DRAG_THRESHOLD = 10;

export interface TokenPosition {
  x: number;
  y: number;
}

interface TokenProps {
  position?: TokenPosition;
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
    position: iPosition,
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
  const position = iPosition ?? { x: 0, y: 0 };
  const movingPosition = useRef(position);
  const dragOffset = useRef({ x: 0, y: 0 });

  const selectedBorderSize = Math.round(size / 16);

  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_e, gestureState) => {
        dragOffset.current = {
          x: gestureState.dx,
          y: gestureState.dy,
        };
        return Math.sqrt(Math.pow(gestureState.dx, 2) + Math.pow(gestureState.dy, 2)) > DRAG_THRESHOLD;
      },
      onPanResponderGrant: () => {
        // Compensate for drag threshold.
        pan.setOffset({
          x: dragOffset.current.x + movingPosition.current.x,
          y: dragOffset.current.y + movingPosition.current.y,
        });
        onMoveStart?.(movingPosition.current);
      },
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false },
      ),
      onPanResponderRelease: () => {
        onMoveEnd?.(movingPosition.current);
        pan.extractOffset();
      },
    }),
  ).current;

  // Updates to position from props.
  pan.setOffset(position);
  movingPosition.current = position;

  // Constrain the token's position to be within its container's layout rect.
  const containerWidth = containerLayout?.width ?? Dimensions.get('window').width;
  const containerHeight = containerLayout?.height ?? Dimensions.get('window').height;
  const translateX = Animated.diffClamp(pan.x, 0, containerWidth - size);
  const translateY = Animated.diffClamp(pan.y, 0, containerHeight - size);
  translateX.addListener(({ value }) => movingPosition.current = { ...movingPosition.current, x: value });
  translateY.addListener(({ value }) => movingPosition.current = { ...movingPosition.current, y: value });

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
      backgroundColor: 'green',
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
    tokenBackground: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    tokenBackgroundImageNoise: {
      borderRadius: size * 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tokenBackgroundImageClock: {
      borderRadius: size * 2,
      opacity: 0.15,
      transform: [{ scale: 0.9 }],
    },
    tokenContent: {
      height: '70%',
      width: '70%',
    },
  });
  return (
    <Animated.View style={styles.container} {...panResponder.panHandlers}>
      <TouchableWithoutFeedback
        onPress={onPress}
        aria-selected={selected}
        accessibilityRole="button">
        <View style={styles.token}>
          <ImageBackground
            style={styles.tokenBackground}
            imageStyle={styles.tokenBackgroundImageNoise}
            resizeMethod="auto"
            resizeMode="stretch"
            source={require('@/assets/images/character-token-noise.webp')}>
            <ImageBackground
              style={styles.tokenBackground}
              imageStyle={styles.tokenBackgroundImageClock}
              resizeMethod="auto"
              resizeMode="contain"
              source={require('@/assets/images/clockface.webp')}>
              <View style={styles.tokenContent}>
                {children}
              </View>
            </ImageBackground>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
}

export default withTheme(Token);