import ReminderData from '@/constants/reminder-data';
import { Image, StyleProp, StyleSheet, TextStyle, View } from 'react-native';
import { Text } from 'react-native-paper';

interface ReminderProps {
  reminder: ReminderData;
  labelStyle?: StyleProp<TextStyle>;
}

function Reminder({ reminder, labelStyle }: ReminderProps) {
  return (
    <View style={baseStyles.container}>
      <View style={baseStyles.iconContainer}>
        <Image source={reminder.icon} style={baseStyles.icon}></Image>
      </View>
      <Text variant="labelSmall" style={StyleSheet.compose(baseStyles.label, labelStyle)}>{reminder.label}</Text>
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
  label: {
    flexGrow: 1,
  }
});

export default Reminder;
