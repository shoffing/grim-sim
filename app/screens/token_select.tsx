import { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Modal, Portal, Surface } from 'react-native-paper';

interface TokenSelectProps {
  visible: boolean;
  onDismiss: () => void;
}

const TokenSelect = ({ visible, onDismiss, children }: PropsWithChildren<TokenSelectProps>) => {
  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} style={baseStyles.modalContainer} contentContainerStyle={baseStyles.modalContent}>
        <ScrollView>
          <Surface style={baseStyles.modalScroll}>
            {children}
          </Surface>
        </ScrollView>
      </Modal>
    </Portal>
  );
};

const baseStyles = StyleSheet.create({
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    maxWidth: '80%',
    maxHeight: '80%',
    minHeight: 200,
    backgroundColor: 'green',
  },
  modalScroll: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
  }
});

export default TokenSelect;
