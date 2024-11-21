import CharacterSelect from '@/app/screens/character-select';
import { CharacterKey, CharacterState, initialCharactersState } from '@/app/state/characters-slice';
import { initialGrimState } from '@/app/state/grim-slice';
import CharacterId from '@/constants/characters/character-id';
import { act, userEvent } from '@testing-library/react-native';
import { render } from '../test-utils';
import '@testing-library/react-native/extend-expect';

describe('<CharacterSelect />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => jest.runOnlyPendingTimers());
    jest.useRealTimers();
  });

  it('shows characters from Trouble Brewing', () => {
    const { getByText } = render(
      <CharacterSelect
        visible
        edition="tb"
        onSelect={jest.fn()}
        onDismiss={jest.fn()}/>,
    );
    expect(getByText('Scarlet Woman')).toBeOnTheScreen();
    expect(getByText('Empath')).toBeOnTheScreen();
  });

  it('shows characters from Sects and Violets', () => {
    const { getByText } = render(
      <CharacterSelect
        visible
        edition="snv"
        onSelect={jest.fn()}
        onDismiss={jest.fn()}/>,
    );
    expect(getByText('Vortox')).toBeOnTheScreen();
    expect(getByText('Artist')).toBeOnTheScreen();
  });

  it('shows characters from Bad Moon Rising', () => {
    const { getByText } = render(
      <CharacterSelect
        visible
        edition="bmr"
        onSelect={jest.fn()}
        onDismiss={jest.fn()}/>,
    );
    expect(getByText('Zombuul')).toBeOnTheScreen();
    expect(getByText('Grandmother')).toBeOnTheScreen();
  });

  it('does not highlight any characters when not replacing', () => {
    const { queryByTestId } = render(
      <CharacterSelect
        visible
        edition="tb"
        onSelect={jest.fn()}
        onDismiss={jest.fn()}/>,
    );
    expect(queryByTestId('replacing')).toBeNull();
  });

  it('highlights character being replaced', () => {
    const { queryByTestId } = render(
      <CharacterSelect
        visible
        edition="tb"
        onSelect={jest.fn()}
        onDismiss={jest.fn()}/>,
      {
        preloadedState: {
          characters: {
            ...initialCharactersState,
            characters: { ['abc123' as CharacterKey]: { id: CharacterId.Imp } as CharacterState },
          },
          grim: {
            ...initialGrimState,
            replacingCharacterKey: 'abc123' as CharacterKey,
          },
        },
      },
    );
    expect(queryByTestId('replacing')).toHaveTextContent('Imp');
  });

  it('calls onSelect when selecting character', async () => {
    const onSelect = jest.fn();
    const onDismiss = jest.fn();
    const { getByText } = render(
      <CharacterSelect
        visible
        edition="tb"
        onSelect={onSelect}
        onDismiss={onDismiss}/>,
    );
    await userEvent.press(getByText('Imp'));
    expect(onSelect).toHaveBeenCalled();
    expect(onDismiss).not.toHaveBeenCalled();
  });

  it('calls onDismiss when dismissing the modal', async () => {
    const onSelect = jest.fn();
    const onDismiss = jest.fn();
    const { getByTestId } = render(
      <CharacterSelect
        visible
        edition="tb"
        onSelect={onSelect}
        onDismiss={onDismiss}/>,
    );
    await userEvent.press(getByTestId('close-token-select'));
    expect(onSelect).not.toHaveBeenCalled();
    expect(onDismiss).toHaveBeenCalled();
  });
});
