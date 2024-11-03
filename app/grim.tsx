import { Surface, Text } from 'react-native-paper';
import { Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Grim = () => {
  return (
    <SafeAreaView>
      <Surface mode="flat" style={styles.surface}>
        <Text variant="displayLarge" style={styles.header}>Grim Sim</Text>
        <Text variant="headlineSmall" style={styles.header}>A grimoire simulator for Blood on the Clocktower.</Text>
        <Image source={require('@/assets/images/characters/demons/imp.webp')}></Image>
      </Surface>
    </SafeAreaView>
  );
};

export default Grim;

const styles = StyleSheet.create({
  surface: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-start',
    padding: 16,
    width: '100%',
  },
  header: {
    textAlign: 'center',
  },
});
