import { ViewStyle } from 'react-native';
import { MD3Theme } from 'react-native-paper';

export const baseModalContainer: (theme: MD3Theme) => ViewStyle = (_theme) => ({
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
});

export const baseModalContent: (theme: MD3Theme) => ViewStyle = (theme) => ({
  backgroundColor: theme.colors.surface,
  flexBasis: 'auto',
  flexDirection: 'column',
  maxHeight: '80%',
  width: '80%',
  alignItems: 'flex-start',
  padding: 16,
});

export const baseModalScroll: (theme: MD3Theme) => ViewStyle = (_theme) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  flex: 0,
});

export const baseModalCloseButton: (theme: MD3Theme) => ViewStyle = (_theme) => ({
  position: 'absolute',
  top: -16,
  right: -16,
});
