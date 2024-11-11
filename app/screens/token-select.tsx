import { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { MD3Theme, Modal, Portal, Surface, withTheme } from 'react-native-paper';

interface TokenSelectProps {
  visible: boolean;
  onDismiss: () => void;
  actions?: ReactNode;
  tokens?: ReactNode;
  theme: MD3Theme;
}

function TokenSelect({ visible, onDismiss, tokens, actions, theme }: TokenSelectProps) {
  const style = StyleSheet.create({
    modalContainer: {
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    modalContent: {
      backgroundColor: theme.colors.surface,
      flexBasis: 'auto',
      flexDirection: 'column',
      maxHeight: '80%',
      width: '80%',
      alignItems: 'flex-start',
      padding: 16,
    },
    modalScroll: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      flex: 0,
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
            {tokens}
          </Surface>
        </ScrollView>
        <View style={{ alignSelf: 'flex-end' }}>
          {actions}
        </View>
      </Modal>
    </Portal>
  );
}

export default withTheme(TokenSelect);
