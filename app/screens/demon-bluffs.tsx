import Character from '@/app/components/character';
import GrimModal from '@/app/components/grim-modal';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import CharacterSelect from '@/app/screens/character-select';
import InfoTokenShower from '@/app/screens/show-full-screen-info';
import { selectCharacters, selectDemonBluffs, setDemonBluffs } from '@/app/state/characters-slice';
import { selectEdition } from '@/app/state/grim-slice';
import CharacterId from '@/constants/characters/character-id';
import { getCharacterById } from '@/constants/characters/characters';
import Team from '@/constants/team';
import infoTokens from '@/data/info-tokens.json';
import _ from 'lodash';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Icon, IconButton, MD3Theme, Text, TouchableRipple, withTheme } from 'react-native-paper';

interface DemonBluffsProps {
  visible: boolean;
  onDismiss: () => void;
  theme: MD3Theme;
}

function DemonBluffs({ visible, onDismiss, theme }: DemonBluffsProps) {
  const dispatch = useAppDispatch();
  const edition = useAppSelector(state => selectEdition(state.grim));
  const charactersInGame = useAppSelector(state => selectCharacters(state.characters));
  const bluffs = useAppSelector(state => selectDemonBluffs(state.characters));

  const notInPlayToken = infoTokens.find(token => token.text === 'These characters are not in play');
  if (notInPlayToken == null) throw new Error('Characters not in play info token could not be found for Demon Bluffs.');

  const styles = StyleSheet.create({
    addNewContainer: {
      alignItems: 'center',
    },
    bluffContainer: {
      alignItems: 'center',
      borderRadius: 16,
      flexDirection: 'column',
      flexShrink: 1,
      height: 'auto',
      justifyContent: 'center',
      minHeight: 180,
      padding: 16,
      width: 180,
    },
    removeBluffButton: {
      position: 'absolute',
      right: 0,
      top: 0,
    },
  });

  const [editBluffIdx, setEditBluffIdx] = useState<number>();
  const onEditBluff = (id: CharacterId) => {
    dispatch(setDemonBluffs([
      ..._.take(bluffs, editBluffIdx),
      id,
      ..._.drop(bluffs, (editBluffIdx ?? 0) + 1),
    ]));
    setEditBluffIdx(undefined);
  };
  const onDeleteBluff = (idx: number) => {
    dispatch(setDemonBluffs([
      ..._.take(bluffs, idx),
      ..._.drop(bluffs, (idx ?? 0) + 1),
    ]));
  };

  const [showingBluffs, setShowingBluffs] = useState(false);
  const showBluffs = () => setShowingBluffs(true);
  const hideBluffs = () => setShowingBluffs(false);

  const gameIds = Object.values(charactersInGame).map(character => character.id);

  const bluffCharacters = bluffs.map((bluffId, idx) => {
    const character = getCharacterById(bluffId);
    return (
      <Card key={`bluff-${bluffId}-${idx}`}>
        <TouchableRipple onPress={() => setEditBluffIdx(idx)}>
          <Card.Content style={styles.bluffContainer}>
            <Character character={character}/>
            <Text variant="titleMedium">{character.name}</Text>
            <Text variant="bodySmall">{character.ability}</Text>
          </Card.Content>
        </TouchableRipple>
        <IconButton
          size={32}
          mode="contained"
          icon="delete-outline"
          containerColor={theme.colors.errorContainer}
          iconColor={theme.colors.onErrorContainer}
          style={styles.removeBluffButton}
          onPress={() => onDeleteBluff(idx)}
          testID={`delete-bluff-${idx}`}/>
      </Card>
    );
  });

  return (
    <GrimModal visible={visible}
               topContent={<Text variant="headlineLarge">Demon Bluffs</Text>}
               bottomContent={
                 <Button
                   style={{ flexShrink: 1 }}
                   mode="contained"
                   icon="eye"
                   disabled={bluffs.length === 0}
                   onPress={showBluffs}
                   testID="show-bluffs">
                   Show bluffs
                 </Button>
               }
               scrollContentStyle={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}
               onDismiss={onDismiss}
               testID={'demon-bluffs'}>
      {bluffCharacters}
      <Card mode="outlined" style={{ flexDirection: 'row' }}>
        <TouchableRipple
          onPress={() => setEditBluffIdx(bluffs.length)}
          style={{ flex: 1, justifyContent: 'center' }}
          testID="add-bluff-button">
          <Card.Content style={styles.bluffContainer}>
            <Icon size={36} source="plus-circle-outline"/>
            <Text variant="labelLarge">Add bluff</Text>
          </Card.Content>
        </TouchableRipple>
      </Card>

      <CharacterSelect
        visible={editBluffIdx != null}
        edition={edition}
        filter={character => !bluffs.includes(character.id) && !gameIds.includes(character.id) && character.team === Team.Good}
        characterActions={[
          {
            icon: 'account-plus',
            onAction: onEditBluff,
            testID: 'select-bluff',
          },
        ]}
        onDismiss={() => setEditBluffIdx(undefined)}/>
      <InfoTokenShower visible={showingBluffs}
                       infoToken={notInPlayToken}
                       characters={bluffs}
                       custom={false}
                       onDismiss={hideBluffs}/>
    </GrimModal>
  );
}

export default withTheme(DemonBluffs);
