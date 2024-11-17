import { GrimPosition } from '@/app/screens/grim';
import _ from 'lodash';
import { PropsWithChildren, ReactNode, useEffect } from 'react';
import { Dimensions, ImageBackground, LayoutRectangle, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { MD3Theme, withTheme } from 'react-native-paper';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

interface TokenProps {
  position?: GrimPosition;
  selected: boolean;
  front: boolean;
  size: number;
  containerLayout?: LayoutRectangle;
  onMove?: (position: GrimPosition) => void;
  onPress?: () => void;
  controls?: ReactNode;
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
    controls,
    theme,
    children,
    testID,
  } = props;
  const offset = useSharedValue(position || { x: 0, y: 0 });
  const moving = useSharedValue(false);
  const hover = useSharedValue(false);

  // Update offset to position only when it changes.
  useEffect(() => {
    if (position) {
      offset.value = position;
    }
  }, [position]);

  const containerWidth = containerLayout?.width ?? Dimensions.get('window').width;
  const containerHeight = containerLayout?.height ?? Dimensions.get('window').height;

  const tap = Gesture.Tap()
    .onBegin(() => hover.value = true)
    .onStart(() => onPress?.())
    .onFinalize(() => hover.value = false)
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
        x: _.clamp((position?.x || 0) + event.translationX, containerWidth - size),
        y: _.clamp((position?.y || 0) + event.translationY, containerHeight - size),
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
      opacity: moving.value || hover.value ? 0.8 : 1,
    };
  });

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      flexDirection: 'column',
      position: 'absolute',
      zIndex: front ? 1 : 0,
    },
    token: {
      alignItems: 'center',
      borderColor: theme.colors.primary,
      borderRadius: size * 2,
      height: size,
      justifyContent: 'center',
      width: size,
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
    <>
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
      {controls}
    </>
  );
}

export default withTheme(Token);