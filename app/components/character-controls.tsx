import { useState } from 'react';
import { FAB, Portal } from 'react-native-paper';

interface CharacterControlsProps {
  onReplace: () => void,
  onChangeTeam: () => void,
}

// TODO: need to render these once in Grim, instead of once with every token.
function CharacterControls({ onReplace, onChangeTeam }: CharacterControlsProps) {
  const [open, setOpen] = useState(false);

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible={true}
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
