import { useState } from 'react';
import { FAB, Portal } from 'react-native-paper';

interface CharacterControlsProps {
  visible: boolean;
  onReplace: () => void,
  onChangeTeam: () => void,
}

function CharacterControls({ visible, onReplace, onChangeTeam }: CharacterControlsProps) {
  const [open, setOpen] = useState(false);

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible={visible}
        icon="cog"
        actions={[
          { icon: 'swap-horizontal', label: 'Replace', onPress: onReplace },
          { icon: 'account-group', label: 'Change Team', onPress: onChangeTeam },
        ]}
        onStateChange={({ open }) => setOpen(open)}/>
    </Portal>
  );
}

export default CharacterControls;
