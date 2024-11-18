import { GrimPosition } from '@/app/screens/grim';
import { PropsWithChildren, ReactNode, useEffect } from 'react';
import { Dimensions, ImageBackground, LayoutRectangle, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { MD3Theme, withTheme } from 'react-native-paper';
import Animated, {
  clamp,
  Easing,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import * as Svg from 'react-native-svg';

interface TokenProps {
  position: GrimPosition;
  size: number;
  text?: string;
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
    size,
    text,
    containerLayout,
    onMove,
    onPress,
    controls,
    theme,
    children,
    testID,
  } = props;
  const offset = useSharedValue(position || { x: 0, y: 0 });
  const interacting = useSharedValue(false);
  const opacity = useDerivedValue(() => withTiming(interacting.value ? 0.666 : 1, { easing: Easing.out(Easing.ease) }));

  // Update offset to position only when it changes.
  useEffect(() => {
    if (position) {
      offset.value = withTiming(position);
    }
  }, [position]);

  const containerWidth = containerLayout?.width ?? Dimensions.get('window').width;
  const containerHeight = containerLayout?.height ?? Dimensions.get('window').height;

  const tap = Gesture.Tap()
    .onBegin(() => interacting.value = true)
    .onStart(() => runOnJS(onPress)?.())
    .onFinalize(() => interacting.value = false);

  const pan = Gesture.Pan()
    .onStart(() => {
      interacting.value = true;
    })
    .onChange((event) => {
      offset.value = {
        x: clamp(position.x + event.translationX, 0, containerWidth - size),
        y: clamp(position.y + event.translationY, 0, containerHeight - size),
      };
    })
    .onFinalize(() => {
      interacting.value = false;
      runOnJS(onMove)?.(offset.value);
    });

  const gestures = Gesture.Exclusive(pan, tap);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
      ],
      opacity: opacity.value,
      zIndex: interacting.value ? 999 : 0,
    };
  });

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      flexDirection: 'column',
      position: 'absolute',
    },
    token: {
      alignItems: 'center',
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
      top: -10,
    },
    text: {
      ...theme.fonts.labelLarge,
      position: 'absolute',
      letterSpacing: 1,
      fontSize: 18,
    },
  });
  return (
    <>
      <GestureDetector gesture={gestures}>
        <Animated.View
          testID={testID}
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
            <Svg.Svg viewBox="0 0 150 150" style={styles.text}>
              <Svg.Path d="M 13 75 A 1 1 0 0 0 138 75" id="curve" fill="transparent"/>
              <Svg.Text x="66.6%" textAnchor="middle" fill="black">
                <Svg.TextPath href="#curve">
                  {text}
                </Svg.TextPath>
              </Svg.Text>
            </Svg.Svg>
          </View>
        </Animated.View>
      </GestureDetector>
      {controls}
    </>
  );
}

export default withTheme(Token);