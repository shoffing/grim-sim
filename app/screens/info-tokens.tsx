import Character from '@/app/components/character';
import Token from '@/app/components/token';
import { useAppSelector } from '@/app/hooks';
import CharacterSelect from '@/app/screens/character-select';
import { selectEdition } from '@/app/state/grim-slice';
import { baseModalCloseButton, baseModalContainer, baseModalContent, baseModalScroll } from '@/app/styles/modals';
import CharacterId from '@/constants/characters/character-id';
import { getCharacterById } from '@/constants/characters/characters';
import { ColorContainerType, Colors } from '@/constants/colors';

import infoTokens from '@/data/info-tokens.json';
import _ from 'lodash';
import React, { useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, TextStyle, useWindowDimensions, View, ViewStyle } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Button, FAB, Icon, IconButton, MD3Theme, Modal, Portal, Surface, Text, withTheme } from 'react-native-paper';

interface InfoTokensProps {
  visible: boolean;
  onDismiss: () => void;
  theme: MD3Theme;
}

function InfoTokens({ visible, onDismiss, theme }: InfoTokensProps) {
  const edition = useAppSelector(state => selectEdition(state.grim));

  const styles = StyleSheet.create({
    modalContainer: baseModalContainer(theme),
    modalContent: {
      ...baseModalContent(theme),
      alignItems: 'center',
      gap: 16,
    },
    modalScroll: {
      ...baseModalScroll(theme),
      gap: 12,
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
    },
    closeButton: baseModalCloseButton(theme),
    infoButton: {
      minHeight: 64,
      minWidth: 64,
      justifyContent: 'center',
    },
    showModalBackgroundImageStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    showInfoCloseButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      borderWidth: 2,
      borderColor: theme.colors.outline,
    },
  });

  const [showingInfoVisible, setShowingInfoVisible] = useState(false);
  const showInfo = () => setShowingInfoVisible(true);
  const hideInfo = () => {
    clearShowingCharacters();
    setShowingInfoVisible(false);
  };
  const [showingInfo, setShowingInfo] = useState<typeof infoTokens[number]>(infoTokens[2]);

  const [characterSelectVisible, setCharacterSelectVisible] = useState(false);
  const showCharacterSelect = () => setCharacterSelectVisible(true);
  const hideCharacterSelect = () => setCharacterSelectVisible(false);

  const [showingCharacters, setShowingCharacters] = useState<CharacterId[]>([]);
  const addShowingCharacter = (character: CharacterId) => setShowingCharacters([...showingCharacters, character]);
  const removeShowingCharacter = (idx: number) => setShowingCharacters([
    ..._.take(showingCharacters, idx),
    ..._.drop(showingCharacters, idx + 1),
  ]);
  const clearShowingCharacters = () => setShowingCharacters([]);

  const containerImage = showingCharacters.length > 0 ? require('@/assets/images/info-token/info-token-container-tall.webp') : require('@/assets/images/info-token/info-token-container.webp');
  const containerBackgroundImage = showingCharacters.length > 0 ? require('@/assets/images/info-token/info-token-container-tall-bg.webp') : require('@/assets/images/info-token/info-token-container-bg.webp');

  const showingInfoBackground = Colors.colorContainer(theme.dark)[showingInfo?.color as ColorContainerType];
  const showingInfoForeground = Colors.onColorContainer(theme.dark)[showingInfo?.color as ColorContainerType];

  const showModalStyle: ViewStyle | null = (!!showingInfo ? {
    backgroundColor: showingInfoBackground,
  } : null);
  const showModalContentStyle: ViewStyle | null = (!!showingInfo ? {
    alignItems: 'center',
    gap: 32,
    height: '100%',
  } : null);
  const showModalTextStyle: TextStyle | null = (!!showingInfo ? {
    color: showingInfoForeground,
    textAlign: 'center',
    marginHorizontal: 64,
    maxHeight: 350,
    fontFamily: 'NewRocker-Regular',
  } : null);

  const infoTokenButtons = infoTokens.map((info, idx) => {
    const background = Colors.colorContainer(theme.dark)[info.color as ColorContainerType];
    const foreground = Colors.onColorContainer(theme.dark)[info.color as ColorContainerType];
    return (
      <Button
        key={`info-token-button-${idx}`}
        mode="contained"
        labelStyle={theme.fonts.bodyLarge}
        contentStyle={styles.infoButton}
        buttonColor={background}
        textColor={foreground}
        rippleColor={foreground}
        icon={() => (
          <Icon source={info.icon} size={32} color={foreground}/>
        )}
        onPress={() => {
          setShowingInfo(info);
          showInfo();
        }}>
        {info.text}
      </Button>
    );
  });

  // Turns out packing squares into a rectangle is NP-hard. Who knew?
  // A friend who is smarter than me says "I believe that reduces to the knapsack problem".
  // Oh well, here is an approximation that works pretty good with numbers up to ~10.
  const { width, height } = useWindowDimensions();
  const tokenSize = 0.44 * Math.sqrt(width * height / showingCharacters.length);
  const showingCharacterTokens = showingCharacters.map((characterId, idx) => {
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
    <Portal>
      <Modal visible={visible}
             onDismiss={onDismiss}
             style={styles.modalContainer}
             contentContainerStyle={styles.modalContent}>
        <Text variant="headlineLarge">Info Tokens</Text>

        <ScrollView>
          <Surface style={styles.modalScroll}>
            {infoTokenButtons}
          </Surface>
        </ScrollView>

        <IconButton
          icon="close"
          mode="contained"
          containerColor={theme.colors.errorContainer}
          iconColor={theme.colors.onErrorContainer}
          style={styles.closeButton}
          onPress={onDismiss}
          testID="close-demon-bluffs"/>
      </Modal>

      <Modal
        visible={showingInfoVisible}
        dismissable={false}
        style={showModalStyle}
        contentContainerStyle={showModalContentStyle}>
        <ImageBackground
          source={require('@/assets/images/info-token/info-token-background.png')}
          style={{ alignItems: 'center', height: '100%', width: '100%' }}
          imageStyle={{ opacity: 0.33, resizeMode: 'repeat' }}
          fadeDuration={0}>
          <ImageBackground
            source={containerBackgroundImage}
            style={{ alignItems: 'center', height: '100%', width: '95%' }}
            imageStyle={{ resizeMode: 'contain', width: '100%' }}
            tintColor={showingInfoBackground}>
            <ImageBackground
              source={containerImage}
              style={{ alignItems: 'center', height: '100%', justifyContent: 'center', width: '100%' }}
              imageStyle={{ resizeMode: 'contain', width: '100%' }}>
              <View style={{
                alignItems: 'center',
                padding: 64,
                position: 'relative',
                top: showingInfo?.icon ? -32 : 0,
                gap: 12,
              }}>
                <Icon source={showingInfo?.icon} size={128}/>
                <Text variant="displayLarge" style={showModalTextStyle} adjustsFontSizeToFit>{showingInfo?.text}</Text>
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
                    showingInfo?.showCharacters ?
                      <IconButton icon="plus" mode="contained" size={64} onPress={showCharacterSelect}/> : null
                  }
                </GestureHandlerRootView>
              </View>
            </ImageBackground>
          </ImageBackground>
        </ImageBackground>
        <FAB
          mode="elevated"
          icon="close"
          onPress={hideInfo}
          size="large"
          style={styles.showInfoCloseButton}/>
      </Modal>

      <CharacterSelect
        visible={characterSelectVisible}
        edition={edition}
        onSelect={character => {
          addShowingCharacter(character);
          hideCharacterSelect();
        }}
        onDismiss={hideCharacterSelect}/>
    </Portal>
  );
}

export default withTheme(InfoTokens);
