import Character from '@/app/components/character';
import GrimModal from '@/app/components/grim-modal';
import { useAppSelector } from '@/app/hooks';
import { selectReplacingCharacter } from '@/app/state/grim-slice';
import CharacterData from '@/constants/characters/character-data';
import CharacterId from '@/constants/characters/character-id';
import CharacterType from '@/constants/characters/character-type';
import { getCharactersByEdition, getCharactersByType } from '@/constants/characters/characters';
import _ from 'lodash';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, IconButton, MD3Theme, Switch, Text, withTheme } from 'react-native-paper';

export interface CharacterSelectAction {
  icon: string;
  iconColor?: string;
  containerColor?: string;
  onAction: (id: CharacterId) => void;
  testID?: string;
}

interface CharacterSelectProps {
  visible: boolean;
  edition: string;
  filter?: (character: CharacterData) => boolean;
  characterActions?: CharacterSelectAction[];
  onDismiss: () => void;
  theme: MD3Theme;
}

function CharacterSelect({ visible, edition, filter, characterActions, onDismiss, theme }: CharacterSelectProps) {
  const replacingCharacter = useAppSelector(state => selectReplacingCharacter(state));

  const [showTravellers, setShowTravellers] = useState(false);
  const [showFabled, setShowFabled] = useState(false);

  const characters = [
    ...getCharactersByEdition(edition),
    ...getCharactersByType(CharacterType.Fabled),
  ];
  const filteredCharacters = filter ? characters.filter(filter) : characters;
  const visibleCharacters = filteredCharacters.filter(character => {
    switch (character.type) {
      case CharacterType.Traveller:
        return showTravellers;
      case CharacterType.Fabled:
        return showFabled;
    }
    return true;
  });

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      gap: 20,
    },
    characterGroup: {
      flexDirection: 'column',
      padding: 12,
      gap: 8,
    },
    characterGroupButtons: {
      flexDirection: 'row',
      padding: 8,
      gap: 8,
      flexWrap: 'wrap',
    },
    characterActions: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  });

  const groups = _.groupBy(visibleCharacters, character => character.type);
  const renderCharacterGroup = (label: string, type: CharacterType) => {
    const groupCharacters = groups[type];
    if (groupCharacters && groupCharacters.length > 0) {
      const characterButtons = groupCharacters.map((character, idx) => {
        const replacing = replacingCharacter?.id === character.id;
        const characterStyle = StyleSheet.create({
          touchable: {},
          container: {
            alignItems: 'center',
            borderColor: replacing ? theme.colors.outline : undefined,
            borderRadius: 8,
            borderWidth: replacing ? 2 : undefined,
            flexDirection: 'column',
            gap: 8,
            height: 'auto',
            justifyContent: 'flex-start',
            minWidth: 150,
            opacity: replacing ? 0.666 : 1,
            padding: 8,
            width: '30%',
          },
          text: {
            textAlign: 'center',
          },
          name: {
            fontFamily: 'GermaniaOne',
          },
          ability: {},
        });

        const actions = characterActions ? (
          <View style={styles.characterActions}>
            {characterActions.map((action, idx) =>
              <IconButton
                key={`character-${character.id}-action-${idx}`}
                mode="contained"
                size={32}
                icon={action.icon}
                containerColor={action.containerColor}
                iconColor={action.iconColor}
                onPress={() => action.onAction(character.id)}
                testID={`${action.testID}-${character.id}`}/>,
            )}
          </View>
        ) : null;

        return (
          <View key={`character-button-${character.id}`}
                style={characterStyle.container}
                testID={`${character.id}${replacing ? '_replacing' : ''}`}>
            <Character character={character}/>
            <View style={{ marginTop: -16 }}>
              {actions}
            </View>
            <Text variant="headlineSmall"
                  adjustsFontSizeToFit={true}
                  numberOfLines={1}
                  style={[characterStyle.text, characterStyle.name]}>
              {character.name}
            </Text>
            <Text variant="bodyMedium"
                  adjustsFontSizeToFit={true}
                  style={[characterStyle.text, characterStyle.ability]}>
              {character.ability}
            </Text>
          </View>
        );
      });
      return (
        <Card key={`character-group-${type}`} style={styles.characterGroup} mode="elevated">
          <Card.Content>
            <Text variant="headlineLarge">{label}</Text>
            <View style={styles.characterGroupButtons}>
              {characterButtons}
            </View>
          </Card.Content>
        </Card>
      );
    }
  };

  const tokens = (
    <View style={styles.container}>
      {renderCharacterGroup('Demons', CharacterType.Demon)}
      {renderCharacterGroup('Minions', CharacterType.Minion)}
      {renderCharacterGroup('Townsfolk', CharacterType.Townsfolk)}
      {renderCharacterGroup('Outsiders', CharacterType.Outsider)}
      {renderCharacterGroup('Travellers', CharacterType.Traveller)}
      {renderCharacterGroup('Fabled', CharacterType.Fabled)}
    </View>
  );

  const actions = (
    <View style={{ alignSelf: 'flex-end', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <Text variant="labelLarge">Show travellers</Text>
      <Switch value={showTravellers}
              onValueChange={value => setShowTravellers(value)}
              testID="characters-show-travellers"/>

      <Text variant="labelLarge">Show fabled</Text>
      <Switch value={showFabled}
              onValueChange={value => setShowFabled(value)}
              testID="characters-show-fabled"/>
    </View>
  );

  return (
    <GrimModal visible={visible}
               bottomContent={actions}
               onDismiss={onDismiss}
               testID="character-select">
      {tokens}
    </GrimModal>
  );
}

export default withTheme(CharacterSelect);
