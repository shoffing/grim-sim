import { Surface, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Grim from '@/app/screens/grim';

const Index = () => {
  return (
    <SafeAreaView>
      <Surface mode="flat" style={styles.container}>
        <Text variant="displayLarge" style={styles.header}>Grim Sim</Text>
        <Text variant="headlineSmall" style={styles.header}>A grimoire simulator for Blood on the Clocktower.</Text>
        <Grim />
      </Surface>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-start',
    padding: 16,
    width: '100%',
  },
  header: {
    textAlign: 'center',
  },
  grim: {
    width: '100%',
    height: '100%',
    backgroundColor: 'green'
  },
});
