import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

interface PlayerProps {
  name?: string;
  alive?: boolean;
}

function Player({ name, alive }: PlayerProps) {
  return (
    <View style={baseStyles.container}>
      <Text variant="labelMedium">{name}</Text>
      <Text variant="labelMedium">{alive}</Text>
    </View>
  );
}

const baseStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
    width: '100%',
  },
  iconContainer: {
    width: '100%',
    aspectRatio: 1,
    flexShrink: 1,
  },
  icon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  name: {
    flexGrow: 1,
  },
});

export default Player;
