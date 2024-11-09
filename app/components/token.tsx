import { ReactNode, useRef, useState } from 'react';
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
import { withTheme } from 'react-native-paper';
import { PanResponderGestureState } from 'react-native/Libraries/Interaction/PanResponder';
import { GestureResponderEvent } from 'react-native/Libraries/Types/CoreEventTypes';

const DRAG_THRESHOLD = 20;

const CONTROLS_VISIBLE_BORDER_SIZE = 8;

interface TokenProps {
  position?: Animated.ValueXY;
  containerLayout?: LayoutRectangle;
  onMove?: (position: Animated.ValueXY) => void;
  content: ReactNode;
  controls?: ReactNode;
  theme: MD3Theme;
}

function Token({ position, containerLayout, onMove, content, controls, theme }: TokenProps) {
  const [layout, setLayout] = useState<LayoutRectangle>();
  const onLayout = (event: LayoutChangeEvent) => {
    setLayout(event.nativeEvent.layout);
  };

  const [controlsVisible, setControlsVisible] = useState(false);
  const toggleControls = () => setControlsVisible(!controlsVisible);

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
    },
    token: {
      alignItems: 'center',
      backgroundColor: 'white',
      borderColor: theme.colors.primary,
      borderRadius: 9999,
      borderStyle: 'solid',
      borderWidth: controlsVisible ? CONTROLS_VISIBLE_BORDER_SIZE : 0,
      height: 128 + (controlsVisible ? CONTROLS_VISIBLE_BORDER_SIZE * 2 : 0),
      justifyContent: 'center',
      left: controlsVisible ? -CONTROLS_VISIBLE_BORDER_SIZE : 0,
      top: controlsVisible ? -CONTROLS_VISIBLE_BORDER_SIZE : 0,
      width: 128 + (controlsVisible ? CONTROLS_VISIBLE_BORDER_SIZE * 2 : 0),
    },
    tokenContent: {
      height: '70%',
      width: '70%',
    },
  });
  return (
    <Animated.View style={styles.container} onLayout={onLayout} {...panResponder.panHandlers}>
      <TouchableWithoutFeedback onPress={toggleControls}>
        <View style={styles.token}>
          <View style={styles.tokenContent}>
            {content}
          </View>
        </View>
      </TouchableWithoutFeedback>
      {controlsVisible && controls}
    </Animated.View>
  );
}

export default withTheme(Token);