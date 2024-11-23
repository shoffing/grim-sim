import { GrimPosition } from '@/app/screens/grim';
import { ReactNode, useEffect } from 'react';
import { Dimensions, ImageBackground, LayoutRectangle, StyleSheet, View, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { MD3Theme, Text, withTheme } from 'react-native-paper';
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
  position?: GrimPosition;
  fixed?: boolean;
  selected?: boolean;
  size: number;
  centerContent?: ReactNode;
  topLeftContent?: ReactNode;
  topCenterContent?: ReactNode;
  topRightContent?: ReactNode;
  bottomText?: string;
  belowText?: string;
  containerLayout?: LayoutRectangle;
  tokenStyle?: ViewStyle;
  onMove?: (position: GrimPosition) => void;
  onPress?: () => void;
  theme: MD3Theme;
  testID?: string;
}

function Token(props: TokenProps) {
  const {
    position,
    fixed,
    selected,
    size,
    centerContent,
    topLeftContent,
    topCenterContent,
    topRightContent,
    bottomText,
    belowText,
    containerLayout,
    tokenStyle,
    onMove,
    onPress,
    theme,
    testID,
  } = props;
  const offset = useSharedValue(position || { x: 0, y: 0 });
  const interacting = useSharedValue(false);
  const opacity = useDerivedValue(() => withTiming(interacting.value ? 0.666 : 1, { easing: Easing.out(Easing.ease) }));

  // Update offset to position only when it changes.
  useEffect(() => {
    if (position) {
      offset.value = withTiming({ ...position });
    }
  }, [position, offset]);

  const containerWidth = containerLayout?.width ?? Dimensions.get('window').width;
  const containerHeight = containerLayout?.height ?? Dimensions.get('window').height;

  const tap = Gesture.Tap()
    .onBegin(() => interacting.value = true)
    .onEnd(() => onPress && runOnJS(onPress)())
    .onFinalize(() => interacting.value = false);

  const pan = Gesture.Pan()
    .onBegin(() => interacting.value = true)
    .onChange((event) => {
      if (position) {
        offset.value = {
          x: clamp(position.x + event.translationX, 0, containerWidth - size),
          y: clamp(position.y + event.translationY, 0, containerHeight - size),
        };
      }
    })
    .onEnd(() => onMove && runOnJS(onMove)(offset.value))
    .onFinalize(() => interacting.value = false);

  const gestures = fixed ? tap : Gesture.Exclusive(pan, tap);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: fixed ? 0 : offset.value.x },
        { translateY: fixed ? 0 : offset.value.y },
      ],
      opacity: opacity.value,
      zIndex: interacting.value ? 999 : 0,
    };
  });

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      flexDirection: 'column',
      position: fixed ? 'relative' : 'absolute',
    },
    token: {
      alignItems: 'center',
      borderRadius: size * 2,
      height: size,
      justifyContent: 'center',
      width: size,
      ...tokenStyle,
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
    topLeftContent: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      height: '100%',
      justifyContent: 'flex-start',
      position: 'absolute',
      width: '100%',
    },
    topCenterContent: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      height: '100%',
      justifyContent: 'center',
      position: 'absolute',
      width: '100%',
    },
    topRightContent: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      height: '100%',
      justifyContent: 'flex-end',
      position: 'absolute',
      width: '100%',
    },
    centerContent: {
      height: '70%',
      width: '70%',
      top: -10,
    },
    bottomText: {
      ...theme.fonts.labelLarge,
      position: 'absolute',
      letterSpacing: 1,
      fontSize: 18,
    },
    belowText: {
      color: theme.colors.primary,
      padding: 8,
    },
  });
  return (
    <GestureDetector gesture={gestures}>
      <Animated.View
        testID={testID}
        accessibilityRole="button"
        aria-selected={selected}
        style={[styles.container, animatedStyles]}>
        <View style={styles.token}>
          <ImageBackground
            style={styles.tokenBackground}
            imageStyle={styles.tokenBackgroundImageNoise}
            resizeMethod="auto"
            resizeMode="stretch"
            source={require('@/assets/images/token/token-background.webp')}>
            <ImageBackground
              style={styles.tokenBackground}
              imageStyle={styles.tokenBackgroundImageClock}
              resizeMethod="auto"
              resizeMode="contain"
              source={require('@/assets/images/token/clockface.webp')}>
              <View style={styles.topLeftContent}>
                {topLeftContent}
              </View>
              <View style={styles.topCenterContent}>
                {topCenterContent}
              </View>
              <View style={styles.topRightContent}>
                {topRightContent}
              </View>
              <View style={styles.centerContent}>
                {centerContent}
              </View>
            </ImageBackground>
          </ImageBackground>
          <Svg.Svg
            viewBox="0 0 150 150"
            style={styles.bottomText}
            accessible
            role="presentation"
            accessibilityLabel={bottomText}>
            <Svg.Path d="M 13 75 A 1 1 0 0 0 138 75" id="curve" fill="transparent"/>
            {/* TODO: why can't I use custom fonts here? */}
            <Svg.Text x="66.6%"
                      textAnchor="middle"
                      fill="black"
                      fontFamily="serif"
                      letterSpacing="2"
                      fontWeight="800">
              <Svg.TextPath href="#curve">
                {bottomText}
              </Svg.TextPath>
            </Svg.Text>
          </Svg.Svg>
        </View>
        <Text variant="labelMedium" style={styles.belowText}>{belowText}</Text>
      </Animated.View>
    </GestureDetector>
  );
}

export default withTheme(Token);