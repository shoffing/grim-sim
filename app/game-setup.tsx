import Character from '@/app/components/character';
import { CHARACTER_SIZE } from '@/app/constants';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { addCharacter, setCharacters } from '@/app/state/characters-slice';
import { selectLayout, setEdition as setStateEdition } from '@/app/state/grim-slice';
import { setReminders } from '@/app/state/reminders-slice';
import { grimEllipsePoints } from '@/app/util/ellipse';
import CharacterData from '@/constants/characters/character-data';
import CharacterType from '@/constants/characters/character-type';
import { getCharactersByEdition } from '@/constants/characters/characters';

import editions from '@/data/editions.json';

import game from '@/data/game.json';
import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import _ from 'lodash';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, MD3Theme, RadioButton, Surface, Text, TouchableRipple, withTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

interface GameSetupProps {
  theme: MD3Theme,
}

function GameSetup({ theme }: GameSetupProps) {
  const style = StyleSheet.create({
    container: {
      padding: 8,
      gap: 8,
    },
    card: {
      backgroundColor: theme.colors.surface,
    },
    cardContent: {
      flexDirection: 'column',
      alignItems: 'flex-start',
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
      gap: 8,
    },
  });

  const router = useRouter();

  const dispatch = useAppDispatch();
  const layout = useAppSelector(state => selectLayout(state.grim));

  const [edition, setEdition] = useState('tb');
  const [playerCount, setPlayerCount] = useState(8);
  const [selectedCharacters, setSelectedCharacters] = useState<CharacterData[]>([]);

  // TODO: these will need to change to support duplicates of characterIds.
  const selectCharacter = (character: CharacterData) =>
    setSelectedCharacters(_.shuffle([...selectedCharacters, character]));
  const unselectCharacter = (character: CharacterData) =>
    setSelectedCharacters(_.shuffle(selectedCharacters.filter(c => c.id !== character.id)));
  const toggleCharacter = (character: CharacterData) => {
    if (selectedCharacters.includes(character)) {
      unselectCharacter(character);
    } else {
      selectCharacter(character);
    }
  };

  const typeCountTargets = game[_.clamp(playerCount - 5, 0, game.length - 1)];

  const editionForm = (
    <Card style={style.card}>
      <Card.Title title="Select Edition"/>
      <Card.Content style={style.cardContent}>
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
      <Card.Content style={style.cardContent}>
        <Text variant="labelSmall">
          {typeCountTargets.townsfolk} Townsfolk,&nbsp;
          {typeCountTargets.outsider} Outsiders,&nbsp;
          {typeCountTargets.minion} Minions,&nbsp;
          {typeCountTargets.demon} Demons
        </Text>
        <View style={style.sliderContainer}>
          <Text variant="labelLarge">{playerCount}</Text>
          <Slider
            style={style.slider}
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
  const renderCharacter = (character: CharacterData) => {
    const selected = selectedCharacters.includes(character);
    const characterStyle = StyleSheet.create({
      touchable: {
        backgroundColor: selected ? theme.colors.secondaryContainer : theme.colors.surface,
        borderRadius: 16,
      },
      container: {
        alignItems: 'center',
        borderRadius: 16,
        flexDirection: 'column',
        gap: 8,
        justifyContent: 'center',
        padding: 16,
        width: 220,
      },
      font: {
        color: selected ? theme.colors.onSecondaryContainer : theme.colors.onSurface,
      },
    });
    return (
      <TouchableRipple
        onPress={() => toggleCharacter(character)}
        key={character.id}
        style={characterStyle.touchable}
        rippleColor={theme.colors.secondary}
        borderless={true}>
        <View style={characterStyle.container}>
          <Character character={character}/>
          <Text variant="titleLarge">{character.name}</Text>
          <Text variant="bodySmall">{character.ability}</Text>
        </View>
      </TouchableRipple>
    );
  };
  const selectRandom = () => {
    setSelectedCharacters(_.shuffle([
      ..._.sampleSize(townsfolk, typeCountTargets.townsfolk),
      ..._.sampleSize(outsiders, typeCountTargets.outsider),
      ..._.sampleSize(minions, typeCountTargets.minion),
      ..._.sampleSize(demons, typeCountTargets.demon),
    ]));
  };
  const charactersForm = (
    <Card style={style.card}>
      <Card.Title title="Characters"/>
      <Card.Content style={style.cardContent}>
        <Button mode="contained" onPress={selectRandom}>Select Random</Button>

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

  const onStartGame = () => {
    // Clear existing characters and reminders.
    dispatch(setCharacters([]));
    dispatch(setReminders([]));

    // Set edition
    dispatch(setStateEdition(edition));

    if (layout) {
      // Add characters in ellipse layout (with a gap at the bottom).
      const points = grimEllipsePoints(
        /* count= */ selectedCharacters.length,
        /* rx= */ 0.8 * (layout.width / 2),
        /* ry= */ 0.8 * (layout.height / 2),
      );
      points.forEach((point, idx) => {
        const position = {
          x: layout.width / 2 + point.x - CHARACTER_SIZE / 2,
          y: layout.height / 2 + point.y - CHARACTER_SIZE / 2,
        };
        dispatch(addCharacter({ id: selectedCharacters[idx].id, position }));
      });
    } else {
      // Add characters all at (0, 0).
      selectedCharacters.forEach(character => dispatch(addCharacter({ id: character.id })));
    }

    router.navigate('/');
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Surface style={style.container}>
          <Text variant="headlineLarge">Game Setup</Text>
          {editionForm}
          {playersForm}
          {charactersForm}
          <Button mode="contained" icon="play" onPress={onStartGame}>
            Start Game
          </Button>
        </Surface>
      </ScrollView>
    </SafeAreaView>
  );
}

export default withTheme(GameSetup);
