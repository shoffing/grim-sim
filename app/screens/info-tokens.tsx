import { baseModalCloseButton, baseModalContainer, baseModalContent, baseModalScroll } from '@/app/styles/modals';
import { ColorContainerType, Colors } from '@/constants/colors';

import infoTokens from '@/data/info-tokens.json';
import { useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { Button, FAB, Icon, IconButton, MD3Theme, Modal, Portal, Surface, Text, withTheme } from 'react-native-paper';

interface InfoTokensProps {
  visible: boolean;
  onDismiss: () => void;
  theme: MD3Theme;
}

function InfoTokens({ visible, onDismiss, theme }: InfoTokensProps) {
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
    },
  });

  const [showingInfo, setShowingInfo] = useState<typeof infoTokens[number]>(infoTokens[2]);
  const hideShowingInfo = () => setShowingInfo(undefined);

  const infoTokenCards = infoTokens.map(info => {
    const background = Colors.colorContainer(theme.dark)[info.color as ColorContainerType];
    const foreground = Colors.onColorContainer(theme.dark)[info.color as ColorContainerType];
    return (
      <Button
        mode="contained"
        labelStyle={theme.fonts.bodyLarge}
        contentStyle={styles.infoButton}
        buttonColor={background}
        textColor={foreground}
        rippleColor={foreground}
        icon={() => (
          <Icon source={info.icon} size={32} color={foreground}/>
        )}
        onPress={() => setShowingInfo(info)}>
        {info.text}
      </Button>
    );
  });

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
  } : null);

  return (
    <Portal>
      <Modal visible={visible}
             onDismiss={onDismiss}
             style={styles.modalContainer}
             contentContainerStyle={styles.modalContent}>
        <Text variant="headlineLarge">Info Tokens</Text>

        <ScrollView>
          <Surface style={styles.modalScroll}>
            {infoTokenCards}
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
        visible={!!showingInfo}
        dismissable={false}
        style={showModalStyle}
        contentContainerStyle={showModalContentStyle}>
        <ImageBackground
          source={require('@/assets/images/info-token/info-token-background.png')}
          style={{
            alignItems: 'center',
            height: '100%',
            width: '100%',
          }}
          imageStyle={{
            opacity: 0.33,
            resizeMode: 'repeat',
          }}
          fadeDuration={0}>
          <ImageBackground
            source={require('@/assets/images/info-token/info-token-container-bg.webp')}
            style={{
              alignItems: 'center',
              height: '100%',
              width: '95%',
            }}
            imageStyle={{
              resizeMode: 'contain',
              width: '100%',
            }}
            tintColor={showingInfoBackground}>
            <ImageBackground
              source={require('@/assets/images/info-token/info-token-container.webp')}
              style={{
                alignItems: 'center',
                height: '100%',
                justifyContent: 'center',
                width: '100%',
              }}
              imageStyle={{
                resizeMode: 'contain',
                width: '100%',
              }}>
              <View style={{
                alignItems: 'center',
                padding: 64,
                position: 'relative',
                top: showingInfo?.icon ? -32 : 0,
              }}>
                <Icon source={showingInfo?.icon} size={128}/>
                <Text variant="displayLarge" style={showModalTextStyle} adjustsFontSizeToFit>{showingInfo?.text}</Text>
              </View>
            </ImageBackground>
          </ImageBackground>
        </ImageBackground>
        <FAB mode="elevated" icon="close" onPress={hideShowingInfo} size="medium"
             style={styles.showInfoCloseButton}/>
      </Modal>
    </Portal>
  );
}

export default withTheme(InfoTokens);
