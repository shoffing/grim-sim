import { colorContainer, ColorContainerType, onColorContainer } from '@/constants/colors';
import React, { PropsWithChildren, ReactNode } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { FAB, MD3Theme, Modal, Portal, withTheme } from 'react-native-paper';

interface ShowFullScreenProps {
  visible: boolean;
  color?: ColorContainerType;
  tall?: boolean;
  actions?: ReactNode;
  onDismiss: () => void;
  theme: MD3Theme;
}

function ShowFullScreen({
                          visible,
                          color,
                          tall,
                          actions,
                          onDismiss,
                          theme,
                          children,
                        }: PropsWithChildren<ShowFullScreenProps>) {
  const containerImage = tall ? require('@/assets/images/info-token/show-full-screen-content-tall.webp') : require('@/assets/images/info-token/show-full-screen-content.webp');
  const containerBackgroundImage = tall ? require('@/assets/images/info-token/show-full-screen-content-tall-bg.webp') : require('@/assets/images/info-token/show-full-screen-content-bg.webp');

  const showingInfoBackground = colorContainer(theme.dark, color);
  const showingInfoForeground = onColorContainer(theme.dark, color);

  const styles = StyleSheet.create({
    closeButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      borderWidth: 2,
      borderColor: theme.colors.outline,
    },
    modal: {
      backgroundColor: showingInfoBackground,
    },
    modalContent: {
      alignItems: 'center',
      gap: 32,
      height: '100%',
    },
    actionsContainer: {
      position: 'absolute',
      bottom: 20,
      left: 20,
    },
  });

  return (
    <Portal>
      <Modal
        visible={visible}
        dismissable={false}
        dismissableBackButton={true}
        onDismiss={onDismiss}
        style={styles.modal}
        contentContainerStyle={styles.modalContent}>
        <ImageBackground
          source={require('@/assets/images/info-token/show-full-screen-background.png')}
          style={{ alignItems: 'center', justifyContent: 'space-around', height: '100%', width: '100%' }}
          imageStyle={{ opacity: 0.33, resizeMode: 'repeat' }}
          fadeDuration={0}>
          <ImageBackground
            source={containerBackgroundImage}
            style={{ alignItems: 'center', width: '95%' }}
            imageStyle={{ resizeMode: 'contain', width: '100%' }}
            tintColor={showingInfoBackground}
            testID="container-background-image">
            <ImageBackground
              source={containerImage}
              style={{ alignItems: 'center', height: '100%', justifyContent: 'center', width: '100%' }}
              imageStyle={{ resizeMode: 'contain', width: '100%' }}>
              <View style={{ alignItems: 'center', padding: 64, position: 'relative', gap: 12 }}
                    testID="showing-content">
                {children}
              </View>
            </ImageBackground>
          </ImageBackground>
        </ImageBackground>
        <FAB
          mode="elevated"
          icon="eye-off"
          onPress={onDismiss}
          size="large"
          style={styles.closeButton}
          testID="close-showing"/>
        <View style={styles.actionsContainer}>
          {actions}
        </View>
      </Modal>
    </Portal>
  );
}

export default withTheme(ShowFullScreen);
