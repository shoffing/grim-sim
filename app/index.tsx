import Grim from '@/app/screens/grim';
import { StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const Index = () => {
  return (
    <SafeAreaView>
      <Surface mode="flat" style={styles.container}>
        <Grim/>
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
    width: '100%',
  },
  header: {
    textAlign: 'center',
  },
  grim: {
    width: '100%',
    height: '100%',
    backgroundColor: 'green',
  },
});
