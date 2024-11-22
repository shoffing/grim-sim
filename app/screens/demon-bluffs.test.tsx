import DemonBluffs from '@/app/screens/demon-bluffs';
import { initialCharactersState } from '@/app/state/characters-slice';
import CharacterId from '@/constants/characters/character-id';
import { act, userEvent, waitFor } from '@testing-library/react-native';
import { render } from '../test-utils';
import '@testing-library/react-native/extend-expect';

describe('<DemonBluffs />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => jest.runOnlyPendingTimers());
    jest.useRealTimers();
  });

  it('is not visible if visible is false', async () => {
    const { queryByTestId } = render(
      <DemonBluffs
        visible={false}
        onDismiss={jest.fn()}/>,
    );
    expect(queryByTestId('add-bluff-button')).toBeNull();
  });

  it('adds three bluffs', async () => {
    const { getByTestId, getByText } = render(
      <DemonBluffs
        visible
        onDismiss={jest.fn()}/>,
    );
    await userEvent.press(getByTestId('add-bluff-button'));
    await userEvent.press(getByText('Saint'));
    await userEvent.press(getByTestId('add-bluff-button'));
    await userEvent.press(getByText('Empath'));
    await userEvent.press(getByTestId('add-bluff-button'));
    await userEvent.press(getByText('Mayor'));
    expect(getByText('Saint')).toBeOnTheScreen();
    expect(getByText(/If you die by execution/)).toBeOnTheScreen();
    expect(getByText('Empath')).toBeOnTheScreen();
    expect(getByText(/Each night, you learn how many/)).toBeOnTheScreen();
    expect(getByText('Mayor')).toBeOnTheScreen();
    expect(getByText(/If only 3 players live/)).toBeOnTheScreen();
  });

  it('replaces a bluff', async () => {
    const { getByText, queryByText } = render(
      <DemonBluffs
        visible
        onDismiss={jest.fn()}/>,
      {
        preloadedState: {
          characters: {
            ...initialCharactersState,
            demonBluffs: [CharacterId.Empath],
          },
        },
      },
    );
    await userEvent.press(getByText('Empath'));
    await userEvent.press(getByText('Fortune Teller'));
    await waitFor(() => expect(queryByText('Empath')).toBeNull(), { interval: 500 });
    expect(queryByText(/Each night, you learn how many/)).toBeNull();
    expect(getByText('Fortune Teller')).toBeOnTheScreen();
    expect(getByText(/Each night, choose 2 players/)).toBeOnTheScreen();
  });

  it('removes a bluff', async () => {
    const { getByText, queryByText, getByTestId } = render(
      <DemonBluffs
        visible
        onDismiss={jest.fn()}/>,
      {
        preloadedState: {
          characters: {
            ...initialCharactersState,
            demonBluffs: [CharacterId.Empath, CharacterId.Fortuneteller],
          },
        },
      },
    );
    await userEvent.press(getByTestId('delete-bluff-0'));
    await waitFor(() => expect(queryByText('Empath')).toBeNull());
    expect(queryByText(/Each night, you learn how many/)).toBeNull();
    expect(getByText('Fortune Teller')).toBeOnTheScreen();
    expect(getByText(/Each night, choose 2 players/)).toBeOnTheScreen();
  });

  it('shows bluffs', async () => {
    const onDismiss = jest.fn();
    const { getByTestId } = render(
      <DemonBluffs
        visible
        onDismiss={onDismiss}/>,
      {
        preloadedState: {
          characters: {
            ...initialCharactersState,
            demonBluffs: [CharacterId.Empath, CharacterId.Fortuneteller, CharacterId.Slayer],
          },
        },
      },
    );
    await userEvent.press(getByTestId('show-bluffs'));
    expect(onDismiss).not.toHaveBeenCalled();
  });

  it('dismisses modal', async () => {
    const onDismiss = jest.fn();
    const { getByTestId } = render(
      <DemonBluffs
        visible
        onDismiss={onDismiss}/>,
    );
    await userEvent.press(getByTestId('close-demon-bluffs'));
    expect(onDismiss).toHaveBeenCalled();
  });
});
