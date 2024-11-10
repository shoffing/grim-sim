import Reminder from '@/app/components/reminder';
import TokenSelect from '@/app/screens/token-select';
import CharacterId from '@/constants/characters/character-id';
import { getCharacterById } from '@/constants/characters/characters';
import ReminderData from '@/constants/reminder-data';

import characterData from '@/data/characters.json';
import { StyleSheet, View } from 'react-native';
import { MD3Theme, TouchableRipple, withTheme } from 'react-native-paper';

interface ReminderSelectProps {
  visible: boolean;
  characterIds: CharacterId[];
  onDismiss: () => void;
  onSelect: (reminder: ReminderData) => void;
  theme: MD3Theme;
}

function ReminderSelect({ visible, characterIds, onDismiss, onSelect, theme }: ReminderSelectProps) {
  const reminders: ReminderData[] = characterData
    .filter(data => characterIds.includes(data.id as CharacterId))
    .flatMap(data => data.reminders.map(reminder => ({
      icon: getCharacterById(data.id as CharacterId)?.icon?.default,
      label: reminder,
    })));

  const reminderSelectContent = reminders.map((reminder, idx) => {
    const reminderStyle = StyleSheet.create({
      touchable: {
        borderRadius: 16,
      },
      container: {
        width: 120,
        height: 'auto',
        borderRadius: 16,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        flexShrink: 1,
        gap: 8,
      },
      font: {
        color: theme.colors.onSurface,
      },
    });
    return (
      <TouchableRipple
        key={`reminder-${idx}`}
        onPress={() => onSelect(reminder)}
        style={reminderStyle.touchable}
        rippleColor={theme.colors.secondary}
        borderless={true}>
        <View style={reminderStyle.container}>
          <Reminder reminder={reminder}/>
        </View>
      </TouchableRipple>
    );
  });
  return (
    <TokenSelect visible={visible} onDismiss={onDismiss}>
      {reminderSelectContent}
    </TokenSelect>
  );
}

export default withTheme(ReminderSelect);
