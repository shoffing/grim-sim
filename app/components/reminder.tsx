import ReminderData from '@/constants/reminder-data';
import { Image, StyleSheet, View } from 'react-native';

interface ReminderProps {
  reminder: ReminderData;
}

function Reminder({ reminder }: ReminderProps) {
  return (
    <View style={baseStyles.container}>
      <View style={baseStyles.iconContainer}>
        <Image source={reminder.icon} style={baseStyles.icon}/>
      </View>
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
    alignItems: 'center',
    aspectRatio: 1,
    flexShrink: 1,
    justifyContent: 'center',
    width: '100%',
  },
  icon: {
    height: '90%',
    resizeMode: 'contain',
    width: '90%',
  },
});

export default Reminder;
