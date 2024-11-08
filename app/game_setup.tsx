import Character from '@/app/components/character';
import CharacterId from '@/constants/characters/character_id';
import CharacterType from '@/constants/characters/character_type';
import CharacterData from '@/constants/characters/character_data';
import { getCharactersByEdition } from '@/constants/characters/characters';

import editions from '@/data/editions.json';
import Slider from '@react-native-community/slider';
import _ from 'lodash';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, MD3Theme, Portal, RadioButton, Surface, Text, withTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import game from '@/data/game.json';

interface GameSetupProps {
  theme: MD3Theme,
}

const GameSetup = ({ theme }: GameSetupProps) => {
  const style = StyleSheet.create({
    container: {
      padding: 8,
      gap: 8,
    },
    card: {
      backgroundColor: theme.colors.surface,
    },
    sliderContainer: {
      flexDirection: 'row',
    },
    slider: {
      flex: 1,
    },
    charactersContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  });

  const [edition, setEdition] = useState('tb');
  const [playerCount, setPlayerCount] = useState(8);
  const [selectedCharacters, setSelectedCharacters] = useState<CharacterData[]>([]);

  const typeCountTargets = game[_.clamp(playerCount - 5, 0, game.length - 1)];

  const editionForm = (
    <Card style={style.card}>
      <Card.Title title="Select Edition"/>
      <Card.Content>
        <RadioButton.Group onValueChange={newEdition => setEdition(newEdition)} value={edition}>
          {editions.map(e => <RadioButton.Item key={e.id} label={e.name} value={e.id}/>)}
          <RadioButton.Item label="Custom" value="__custom__"/>
        </RadioButton.Group>
      </Card.Content>
    </Card>
  );

  const playersForm = (
    <Card style={style.card}>
      <Card.Title title="Players"/>
      <Card.Content>
        <Text variant="labelSmall">
          {typeCountTargets.townsfolk} Townsfolk,&nbsp;
          {typeCountTargets.outsider} Outsiders,&nbsp;
          {typeCountTargets.minion} Minions,&nbsp;
          {typeCountTargets.demon} Demons
        </Text>
        <View style={style.sliderContainer}>
          <Text variant="labelLarge">{playerCount}</Text>
          <Slider style={style.slider}
                  value={playerCount}
                  onValueChange={setPlayerCount}
                  step={1}
                  minimumValue={5}
                  maximumValue={20}/>
        </View>
      </Card.Content>
    </Card>
  );

  const characters = getCharactersByEdition(edition);
  const townsfolk = characters.filter(c => c.type === CharacterType.Townsfolk);
  const outsiders = characters.filter(c => c.type === CharacterType.Outsider);
  const minions = characters.filter(c => c.type === CharacterType.Minion);
  const demons = characters.filter(c => c.type === CharacterType.Demon);
  const townsfolkCount = selectedCharacters.filter(c => c.type === CharacterType.Townsfolk).length;
  const outsiderCount = selectedCharacters.filter(c => c.type === CharacterType.Outsider).length;
  const minionCount = selectedCharacters.filter(c => c.type === CharacterType.Minion).length;
  const demonCount = selectedCharacters.filter(c => c.type === CharacterType.Demon).length;
  const onPressCharacter = (character: CharacterData) => {
    if (selectedCharacters.includes(character)) {
      setSelectedCharacters(selectedCharacters.filter(c => c.id !== character.id));
    } else {
      setSelectedCharacters([...selectedCharacters, character]);
    }
  };
  const renderCharacter = (character: CharacterData) => {
    const selected = selectedCharacters.includes(character);
    const style = StyleSheet.create({
      backgroundColor: selected ? theme.colors.secondaryContainer : theme.colors.surface,
    });
    const nameColor = selected ? theme.colors.onSecondaryContainer : theme.colors.onSurface;
    return (
      <View style={style} key={character.id}>
        <Character character={character}
                   onPress={() => onPressCharacter(character)}
                   nameStyle={{color: nameColor}}>
        </Character>
      </View>
    );
  };
  const charactersForm = (
    <Card style={style.card}>
      <Card.Title title="Characters"/>
      <Card.Content>
        <Text variant="headlineSmall">
          Townsfolk ({townsfolkCount} / {typeCountTargets.townsfolk})
        </Text>
        <View style={style.charactersContainer}>{townsfolk.map(renderCharacter)}</View>

        <Text variant="headlineSmall">
          Outsiders ({outsiderCount} / {typeCountTargets.outsider})
        </Text>
        <View style={style.charactersContainer}>{outsiders.map(renderCharacter)}</View>

        <Text variant="headlineSmall">
          Minions ({minionCount} / {typeCountTargets.minion})
        </Text>
        <View style={style.charactersContainer}>{minions.map(renderCharacter)}</View>

        <Text variant="headlineSmall">
          Demons ({demonCount} / {typeCountTargets.demon})
        </Text>
        <View style={style.charactersContainer}>{demons.map(renderCharacter)}</View>
      </Card.Content>
    </Card>
  );

  return (
    <Portal>
      <SafeAreaView>
        <ScrollView>
          <Surface style={style.container}>
            <Text variant="headlineLarge">Game Setup</Text>
            {editionForm}
            {playersForm}
            {charactersForm}
          </Surface>
        </ScrollView>
      </SafeAreaView>
    </Portal>
  );
};

export default withTheme(GameSetup);
