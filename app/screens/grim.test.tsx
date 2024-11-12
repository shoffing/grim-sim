import { ACCESSIBILITY_LABEL as CHARACTER_CONTROLS_ACCESSIBILITY_LABEL } from '@/app/components/character-controls';
import Grim from '@/app/screens/grim';
import CharacterId from '@/constants/characters/character-id';
import { getCharacterById } from '@/constants/characters/characters';
import { userEvent } from '@testing-library/react-native';
import { render } from '../test-utils';
import '@testing-library/react-native/extend-expect';

jest.useFakeTimers();

describe('<Grim />', () => {
  it('renders the Imp by default', () => {
    const { getByRole } = render(<Grim/>);
    const token = getByRole('button', { name: getCharacterById(CharacterId.Imp).name, selected: false });
    expect(token).toBeOnTheScreen();
  });

  it('selects the Imp', async () => {
    const { getByRole } = render(<Grim/>);
    const token = getByRole('button', { name: getCharacterById(CharacterId.Imp).name, selected: false });
    const user = userEvent.setup();
    await user.press(token);
    expect(token).toBeSelected();
  });

  it('adds a reminder token for the Imp', async () => {
    const { getByRole, getByTestId } = render(<Grim/>);
    const user = userEvent.setup();
    await user.press(getByRole('button', { name: getCharacterById(CharacterId.Imp).name, selected: false }));
    await user.press(getByRole('button', { name: CHARACTER_CONTROLS_ACCESSIBILITY_LABEL }));
    await user.press(getByTestId('add-reminder-character', { includeHiddenElements: true }));
    await user.press(getByRole('button', { name: 'Dead' }));
    expect(getByRole('button', { name: 'Dead', selected: true })).toBeOnTheScreen();
  });
});
