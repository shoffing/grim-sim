import Reminder from '@/app/components/reminder';
import TokenSelect from '@/app/screens/token-select';
import CharacterId from '@/constants/characters/character-id';
import CharacterType, { SCRIPT_ORDER } from '@/constants/characters/character-type';
import { getCharacterById } from '@/constants/characters/characters';
import ReminderData from '@/constants/reminder-data';

import characterData from '@/data/characters.json';
import _ from 'lodash';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { MD3Theme, Switch, Text, TouchableRipple, withTheme } from 'react-native-paper';

interface ReminderSelectProps {
  visible: boolean;
  edition: string;
  characterIds: CharacterId[];
  onDismiss: () => void;
  onSelect: (reminder: ReminderData) => void;
  theme: MD3Theme;
}

function ReminderSelect({ visible, edition, characterIds, onDismiss, onSelect, theme }: ReminderSelectProps) {
  const [showAll, setShowAll] = useState(false);

  const reminders: ReminderData[] = _(characterData)
    .filter(data => data.edition === edition)
    .filter(data => showAll || characterIds.includes(data.id as CharacterId))
    .sort((a, b) => SCRIPT_ORDER.indexOf(a.type as CharacterType) - SCRIPT_ORDER.indexOf(b.type as CharacterType))
    .flatMap(data => data.reminders.map(reminder => ({
      icon: getCharacterById(data.id as CharacterId)?.icon?.default,
      label: reminder,
    })))
    .value();

  if (!showAll && reminders.length === 0) {
    setShowAll(true);
  }

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
        accessibilityRole="button"
        key={`reminder-${idx}`}
        onPress={() => onSelect(reminder)}
        style={reminderStyle.touchable}
        rippleColor={theme.colors.secondary}
        borderless={true}>
        <View style={reminderStyle.container}>
          <Reminder reminder={reminder}/>
          <Text variant="labelLarge" adjustsFontSizeToFit={true} numberOfLines={1}>{reminder.label}</Text>
        </View>
      </TouchableRipple>
    );
  });
  const actions = (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <Text variant="labelLarge">Show all</Text>
      <Switch value={showAll} onValueChange={value => setShowAll(value)} testID="reminders-show-all"/>
    </View>
  );
  return <TokenSelect visible={visible} onDismiss={onDismiss} tokens={reminderSelectContent} actions={actions}/>;
}

export default withTheme(ReminderSelect);
