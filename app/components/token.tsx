import { PropsWithChildren, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  LayoutChangeEvent,
  LayoutRectangle,
  PanResponder,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { MD3Theme, withTheme } from 'react-native-paper';

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

  const position = useRef<TokenPosition>({ x: 0, y: 0 });

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
  translateX.addListener(({ value }) => position.current = { ...position.current, x: value });
  translateY.addListener(({ value }) => position.current = { ...position.current, y: value });

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
    <Animated.View style={styles.container} onLayout={onLayout} {...panResponder.panHandlers}>
      <TouchableWithoutFeedback onPress={onPress}>
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