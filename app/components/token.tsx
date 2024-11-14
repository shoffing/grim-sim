import _ from 'lodash';
import { PropsWithChildren, useEffect } from 'react';
import { Dimensions, ImageBackground, LayoutRectangle, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { MD3Theme, withTheme } from 'react-native-paper';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

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
  onMove?: (position: TokenPosition) => void;
  onPress?: () => void;
  theme: MD3Theme;
  testID: string;
}

function Token(props: PropsWithChildren<TokenProps>) {
  const {
    position,
    selected,
    front,
    size,
    containerLayout,
    onMove,
    onPress,
    theme,
    children,
    testID,
  } = props;
  const selectedBorderSize = Math.round(size / 16);
  const offset = useSharedValue(position || {x: 0, y: 0});
  const moving = useSharedValue(false);

  // Update offset to position only when it changes.
  useEffect(() => {
    if (position) {
      offset.value = position;
    }
  }, [position]);

  const containerWidth = containerLayout?.width ?? Dimensions.get('window').width;
  const containerHeight = containerLayout?.height ?? Dimensions.get('window').height;

  const tap = Gesture.Tap()
    .onStart(() => onPress?.())
    .runOnJS(true);
  const pan = Gesture.Pan()
    .onStart(() => moving.value = true)
    .onChange((event) => {
      if (moving.value) {
        offset.value = {
          x: _.clamp(offset.value.x + event.changeX, 0, containerWidth - size),
          y: _.clamp(offset.value.y + event.changeY, 0, containerHeight - size),
        };
      }
    })
    .onEnd((event) => {
      moving.value = false;
      onMove?.({
        x: (position?.x || 0) + event.translationX,
        y: (position?.y || 0) + event.translationY,
      });
    })
    .runOnJS(true);
  const gestures = Gesture.Exclusive(pan, tap);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
      ],
    };
  }, [offset]);

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      flexDirection: 'column',
      position: 'absolute',
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
    <GestureDetector gesture={gestures}>
      <Animated.View
        testID={testID}
        aria-selected={selected}
        accessibilityRole="button"
        style={[styles.container, animatedStyles]}>
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
      </Animated.View>
    </GestureDetector>
  );
}

export default withTheme(Token);