import { baseModalCloseButton, baseModalContainer, baseModalContent, baseModalScroll } from '@/app/styles/modals';
import { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { IconButton, MD3Theme, Modal, Portal, Surface, withTheme } from 'react-native-paper';

interface TokenSelectProps {
  visible: boolean;
  onDismiss: () => void;
  actions?: ReactNode;
  tokens?: ReactNode;
  theme: MD3Theme;
}

function TokenSelect({ visible, onDismiss, tokens, actions, theme }: TokenSelectProps) {
  const styles = StyleSheet.create({
    modalContainer: baseModalContainer(theme),
    modalContent: baseModalContent(theme),
    modalScroll: baseModalScroll(theme),
    closeButton: baseModalCloseButton(theme),
  });

  return (
    <Portal>
      <Modal visible={visible}
             onDismiss={onDismiss}
             style={styles.modalContainer}
             contentContainerStyle={styles.modalContent}>
        <ScrollView>
          <Surface style={styles.modalScroll}>
            {tokens}
          </Surface>
        </ScrollView>
        <View style={{ alignSelf: 'flex-end' }}>
          {actions}
        </View>
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

export default withTheme(TokenSelect);
