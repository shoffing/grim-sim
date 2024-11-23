import { PropsWithChildren, ReactNode } from 'react';
import { Dimensions, ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { IconButton, MD3Theme, Modal, Portal, withTheme } from 'react-native-paper';

interface GrimModalProps {
  visible: boolean;
  topContent?: ReactNode;
  topContentStyle?: ViewStyle;
  bottomContent?: ReactNode;
  bottomContentStyle?: ViewStyle;
  scrollContentStyle?: ViewStyle;
  onDismiss: () => void;
  theme: MD3Theme;
}

function GrimModal({
                     visible,
                     topContent,
                     topContentStyle,
                     bottomContent,
                     bottomContentStyle,
                     scrollContentStyle,
                     onDismiss,
                     theme,
                     children,
                   }: PropsWithChildren<GrimModalProps>) {
  const styles = StyleSheet.create({
    modalContainer: {
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modalContent: {
      minWidth: 0.6 * Dimensions.get('window').width,
      maxWidth: 0.8 * Dimensions.get('window').width,
      maxHeight: 0.8 * Dimensions.get('window').height,
      padding: 16,
      backgroundColor: theme.colors.surface,
      gap: 12,
    },
    modalScroll: {
      flexGrow: 0,
    },
    closeButton: {
      position: 'absolute',
      top: -16,
      right: -16,
    },
  });

  return (
    <Portal>
      <Modal visible={visible}
             onDismiss={onDismiss}
             style={styles.modalContainer}
             contentContainerStyle={styles.modalContent}>
        <View style={topContentStyle}>{topContent}</View>
        <ScrollView style={styles.modalScroll}
                    contentContainerStyle={scrollContentStyle}>
          {children}
        </ScrollView>

        <View style={bottomContentStyle}>{bottomContent}</View>

        <IconButton
          icon="close"
          mode="contained"
          containerColor={theme.colors.errorContainer}
          iconColor={theme.colors.onErrorContainer}
          style={styles.closeButton}
          onPress={onDismiss}
          testID="close-token-select"/>
      </Modal>
    </Portal>
  );
}

export default withTheme(GrimModal);
