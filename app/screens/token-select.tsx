import GrimModal from '@/app/components/grim-modal';
import { ReactNode } from 'react';
import { MD3Theme, withTheme } from 'react-native-paper';

interface TokenSelectProps {
  visible: boolean;
  onDismiss: () => void;
  actions?: ReactNode;
  tokens?: ReactNode;
  theme: MD3Theme;
}

function TokenSelect({ visible, onDismiss, tokens, actions, theme }: TokenSelectProps) {
  return (
    <GrimModal visible={visible}
               onDismiss={onDismiss}
               bottomContent={actions}>
      {tokens}
    </GrimModal>
  );
}

export default withTheme(TokenSelect);
