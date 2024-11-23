import GrimModal from '@/app/components/grim-modal';
import Reminder from '@/app/components/reminder';
import { useAppSelector } from '@/app/hooks';
import { selectReplacingReminder } from '@/app/state/grim-slice';
import CharacterId from '@/constants/characters/character-id';
import CharacterType, { SCRIPT_ORDER } from '@/constants/characters/character-type';
import { getCharacterById } from '@/constants/characters/characters';
import ReminderData from '@/constants/reminder-data';

import characterData from '@/data/characters.json';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
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
  const replacingReminder = useAppSelector(state => selectReplacingReminder(state));

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

  // Set show all to false when characterIds changes.
  useEffect(() => setShowAll(false), [characterIds]);

  const reminderSelectContent = (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {
        reminders.map((reminder, idx) => {
          const replacing = _.isEqual(replacingReminder?.data, reminder);
          const reminderStyle = StyleSheet.create({
            touchable: {
              borderRadius: 16,
            },
            container: {
              alignItems: 'center',
              borderColor: replacing ? theme.colors.outline : undefined,
              borderRadius: 16,
              borderWidth: replacing ? 2 : undefined,
              flexDirection: 'column',
              flexShrink: 1,
              gap: 8,
              height: 'auto',
              justifyContent: 'center',
              opacity: replacing ? 0.666 : 1,
              padding: 16,
              width: 120,
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
              borderless={true}
              testID={replacing ? 'replacing' : undefined}>
              <View style={reminderStyle.container}>
                <Reminder reminder={reminder}/>
                <Text variant="labelLarge" adjustsFontSizeToFit={true} numberOfLines={1}>{reminder.label}</Text>
              </View>
            </TouchableRipple>
          );
        })
      }
    </View>
  );

  const actions = (
    <View style={{ alignSelf: 'flex-end', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <Text variant="labelLarge">Show all</Text>
      <Switch value={showAll} onValueChange={value => setShowAll(value)} testID="reminders-show-all"/>
    </View>
  );

  return (
    <GrimModal visible={visible}
               bottomContent={actions}
               onDismiss={onDismiss}
               testID="reminder-select">
      {reminderSelectContent}
    </GrimModal>
  );
}

export default withTheme(ReminderSelect);
