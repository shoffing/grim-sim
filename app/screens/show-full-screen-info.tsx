import Character from '@/app/components/character';
import Token from '@/app/components/token';
import { useAppSelector } from '@/app/hooks';
import CharacterSelect from '@/app/screens/character-select';
import ShowFullScreen from '@/app/screens/show-full-screen';
import { selectEdition } from '@/app/state/grim-slice';
import { InfoToken, removeCustomToken } from '@/app/state/info-tokens-slice';
import CharacterId from '@/constants/characters/character-id';
import { getCharacterById } from '@/constants/characters/characters';
import { colorContainer, ColorContainerType, onColorContainer } from '@/constants/colors';
import _ from 'lodash';
import React, { useState } from 'react';
import { StyleSheet, TextStyle, useWindowDimensions, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FAB, Icon, IconButton, MD3Theme, Text, withTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';

interface ShowFullScreenInfoProps {
  visible: boolean;
  infoToken?: InfoToken;
  characters?: CharacterId[];
  custom: boolean;
  onDismiss: () => void;
  theme: MD3Theme;
}

function ShowFullScreenInfo({ visible, infoToken, characters, custom, onDismiss, theme }: ShowFullScreenInfoProps) {
  const dispatch = useDispatch();
  const edition = useAppSelector(state => selectEdition(state.grim));

  /** Which characters are being shown currently? */
  const [showingCharacters, setShowingCharacters] = useState<CharacterId[]>([]);
  const addShowingCharacter = (character: CharacterId) => setShowingCharacters([...showingCharacters, character]);
  const removeShowingCharacter = (idx: number) => setShowingCharacters([
    ..._.take(showingCharacters, idx),
    ..._.drop(showingCharacters, idx + 1),
  ]);
  const clearShowingCharacters = () => setShowingCharacters([]);

  /** Whether the character select modal is visible, for showing characters on the full-screen token show page. */
  const [characterSelectVisible, setCharacterSelectVisible] = useState(false);
  const showCharacterSelect = () => setCharacterSelectVisible(true);
  const hideCharacterSelect = () => setCharacterSelectVisible(false);

  /** Handling removing custom info tokens with bottom-left FAB. */
  const removeCustomInfoToken = () => {
    infoToken && dispatch(removeCustomToken(infoToken));
    onDismiss();
  };

  const handleDismiss = () => {
    clearShowingCharacters();
    onDismiss();
  };

  // Show characters if they were passed in as props, otherwise show the characters that have been added manually.
  const displayCharacters = characters ?? showingCharacters;

  const showingInfoForeground = onColorContainer(theme.dark, infoToken?.color);

  const styles = StyleSheet.create({
    showInfoCloseButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      borderWidth: 2,
      borderColor: theme.colors.outline,
    },
    deleteCustomInfoButton: {
      position: 'absolute',
      bottom: 20,
      left: 20,
    },
  });

  const showModalTextStyle: TextStyle | null = (!!infoToken ? {
    color: showingInfoForeground,
    textAlign: 'center',
    marginHorizontal: 64,
    maxHeight: 350,
    fontFamily: 'NewRocker-Regular',
  } : null);

  // Turns out packing squares into a rectangle is NP-hard. Who knew?
  // A friend who is smarter than me says "I believe that reduces to the knapsack problem".
  // Oh well, here is an approximation that works pretty good with numbers up to ~10.
  const { width, height } = useWindowDimensions();
  const tokenSize = 0.44 * Math.sqrt(width * height / displayCharacters.length);
  const showingCharacterTokens = displayCharacters.map((characterId, idx) => {
    const characterData = getCharacterById(characterId);
    return (
      <View key={`show-character-token-${idx}`} style={{ width: tokenSize, height: tokenSize }}>
        <Token
          fixed
          size={tokenSize}
          tokenStyle={{ aspectRatio: 1 }}
          centerContent={
            <Character character={characterData} team={characterData.team}/>
          }
          bottomText={characterData.name}
          onPress={() => removeShowingCharacter(idx)}/>
      </View>
    );
  });

  return (
    <ShowFullScreen visible={visible}
                    color={(infoToken?.color ?? 'deepPurple') as ColorContainerType}
                    tall={displayCharacters.length > 0}
                    actions={
                      custom ?
                        <FAB
                          mode="flat"
                          icon="delete-outline"
                          onPress={removeCustomInfoToken}
                          size="medium"
                          style={styles.deleteCustomInfoButton}
                          testID="delete-custom-token"/> :
                        null
                    }
                    onDismiss={handleDismiss}>
      <Icon source={infoToken?.icon} size={128} testID={`info-token-icon-${infoToken?.icon}`}/>
      <Text variant="displayLarge" style={showModalTextStyle} adjustsFontSizeToFit>{infoToken?.text}</Text>
      <GestureHandlerRootView style={{ flex: 0, alignItems: 'center', gap: 12 }}>
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 12,
          justifyContent: 'center',
        }}>
          {showingCharacterTokens}
        </View>
        {
          infoToken?.showCharacters && characters == null ?
            <IconButton icon="plus" mode="contained" size={64} onPress={showCharacterSelect}/> : null
        }
      </GestureHandlerRootView>

      <CharacterSelect
        visible={characterSelectVisible}
        edition={edition}
        onSelect={character => {
          addShowingCharacter(character);
          hideCharacterSelect();
        }}
        onDismiss={hideCharacterSelect}/>
    </ShowFullScreen>
  );
}

export default withTheme(ShowFullScreenInfo);
