import Character from '@/app/components/character';
import Token from '@/app/components/token';
import CharacterId from '@/constants/characters/character-id';
import { getCharacterById } from '@/constants/characters/characters';
import React from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FAB, MD3Theme, Modal, Portal, Text, withTheme } from 'react-native-paper';

interface CharacterTokenShowerProps {
  characterIds: CharacterId[];
  text?: string;
  visible: boolean;
  onDismiss: () => void;
  theme: MD3Theme;
}

function CharacterTokenShower({ characterIds, text, visible, onDismiss, theme }: CharacterTokenShowerProps) {
  // Turns out packing squares into a rectangle is NP-hard. Who knew?
  // A friend who is smarter than me says "I believe that reduces to the knapsack problem".
  // Oh well, here is an approximation that works pretty good with numbers up to ~30.
  const { width, height } = useWindowDimensions();
  const tokenSize = 0.666 * Math.sqrt(width * height / characterIds.length);

  const styles = StyleSheet.create({
    modalContainer: {
      backgroundColor: theme.colors.surface,
    },
    modalContent: {
      alignItems: 'center',
      flexDirection: 'column',
      gap: 24,
      height: '100%',
      justifyContent: 'center',
    },
    tokensContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      justifyContent: 'center',
      padding: 12,
      width: '100%',
    },
    abilityText: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: theme.colors.tertiary,
      borderRadius: 8,
      borderWidth: 2,
      color: 'white',
      marginTop: '3%',
      maxHeight: '60%',
      maxWidth: '80%',
      padding: 8,
      textAlign: 'center',
    },
    closeButton: {
      bottom: 20,
      position: 'absolute',
      right: 20,
    },
  });

  const tokens = characterIds.map(getCharacterById).map((characterData, idx) => {
    return (
      <View key={`character-${characterData.id}-${idx}`}>
        <Token
          fixed
          size={tokenSize}
          topCenterContent={
            <Text variant="bodyLarge" style={styles.abilityText} adjustsFontSizeToFit>
              {characterData.ability}
            </Text>
          }
          centerContent={
            <Character character={characterData} team={characterData.team}/>
          }
          bottomText={characterData.name}/>
      </View>
    );
  });
  return (
    <Portal>
      <Modal
        visible={visible}
        style={styles.modalContainer}
        contentContainerStyle={styles.modalContent}
        onDismiss={onDismiss}>
        <Text variant="headlineLarge">{text}</Text>
        <GestureHandlerRootView style={styles.tokensContainer}>
          {tokens}
        </GestureHandlerRootView>
        <FAB
          icon="close"
          onPress={onDismiss}
          style={styles.closeButton}
          testID="close-character-shower"/>
      </Modal>
    </Portal>
  );
}

export default withTheme(CharacterTokenShower);
