import { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { MD3Theme, Modal, Portal, Surface, withTheme } from 'react-native-paper';

interface TokenSelectProps {
  visible: boolean;
  onDismiss: () => void;
  theme: MD3Theme;
}

function TokenSelect({ visible, onDismiss, theme, children }: PropsWithChildren<TokenSelectProps>) {
  const style = StyleSheet.create({
    modalContainer: {
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modalContent: {
      backgroundColor: theme.colors.surface,
      flexBasis: 'auto',
      flexDirection: 'row',
      maxHeight: '80%',
      maxWidth: '80%',
    },
    modalScroll: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  });

  return (
    <Portal>
      <Modal visible={visible}
             onDismiss={onDismiss}
             style={style.modalContainer}
             contentContainerStyle={style.modalContent}>
        <ScrollView>
          <Surface style={style.modalScroll}>
            {children}
          </Surface>
        </ScrollView>
      </Modal>
    </Portal>
  );
}

export default withTheme(TokenSelect);
