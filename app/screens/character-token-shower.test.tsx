import CharacterTokenShower from '@/app/screens/character-token-shower';
import CharacterId from '@/constants/characters/character-id';
import { act, userEvent } from '@testing-library/react-native';
import { render } from '../test-utils';
import '@testing-library/react-native/extend-expect';

describe('<CharacterTokenShower />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => jest.runOnlyPendingTimers());
    jest.useRealTimers();
  });

  it('is not visible if visible is false', () => {
    const { queryByRole } = render(
      <CharacterTokenShower
        visible={false}
        characterIds={[CharacterId.Imp]}
        onDismiss={jest.fn()}/>,
    );
    expect(queryByRole('none', { name: 'Imp' })).toBeNull();
  });

  it('shows 3 characters with text', async () => {
    const { getByText, getByRole } = render(
      <CharacterTokenShower
        visible
        characterIds={[CharacterId.Imp, CharacterId.Drunk, CharacterId.Empath]}
        text="Here are three VERY COOL characters!"
        onDismiss={jest.fn()}/>,
    );
    expect(getByRole('presentation', { name: 'Imp' })).toBeOnTheScreen();
    expect(getByRole('presentation', { name: 'Drunk' })).toBeOnTheScreen();
    expect(getByRole('presentation', { name: 'Empath' })).toBeOnTheScreen();
    expect(getByText(/Each night, you learn how many/)).toBeOnTheScreen();
    expect(getByText('Here are three VERY COOL characters!')).toBeOnTheScreen();
  });

  it('shows a character without text', async () => {
    const { queryByText, getByRole } = render(
      <CharacterTokenShower
        visible
        characterIds={[CharacterId.Imp]}
        onDismiss={jest.fn()}/>,
    );
    expect(getByRole('presentation', { name: 'Imp' })).toBeOnTheScreen();
    expect(queryByText('Here are three VERY COOL characters!')).toBeNull();
  });

  it('dismisses', async () => {
    const onDismiss = jest.fn();
    const { getByTestId } = render(
      <CharacterTokenShower
        visible
        characterIds={[CharacterId.Imp]}
        onDismiss={onDismiss}/>,
    );
    await userEvent.press(getByTestId('close-character-shower'));
    expect(onDismiss).toHaveBeenCalled();
  });
});
