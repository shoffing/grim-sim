import ReminderSelect from '@/app/screens/reminder-select';
import { GrimState } from '@/app/state/grim-slice';
import { RemindersState } from '@/app/state/reminders-slice';
import CharacterId from '@/constants/characters/character-id';
import { act, fireEvent, userEvent } from '@testing-library/react-native';
import { render } from '../test-utils';
import '@testing-library/react-native/extend-expect';

describe('<ReminderSelect />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => jest.runOnlyPendingTimers());
    jest.useRealTimers();
  });

  it('shows reminders from Trouble Brewing for Imp and Mayor', () => {
    const { getByText, queryByText } = render(
      <ReminderSelect
        visible
        edition="tb"
        characterIds={[CharacterId.Imp, CharacterId.Investigator]}
        onSelect={jest.fn()}
        onDismiss={jest.fn()}/>,
    );
    expect(getByText('Dead')).toBeOnTheScreen();
    expect(getByText('Minion')).toBeOnTheScreen();
    expect(getByText('Wrong')).toBeOnTheScreen();
    expect(queryByText('Demon')).toBeNull();
  });

  it('shows reminders from Trouble Brewing for all characters', async () => {
    const { getByTestId, getByText } = render(
      <ReminderSelect
        visible
        edition="tb"
        characterIds={[CharacterId.Imp, CharacterId.Investigator]}
        onSelect={jest.fn()}
        onDismiss={jest.fn()}/>,
    );
    fireEvent(getByTestId('reminders-show-all'), 'valueChange', true);
    expect(getByText('Dead')).toBeOnTheScreen();
    expect(getByText('Minion')).toBeOnTheScreen();
    expect(getByText('Protected')).toBeOnTheScreen();
    expect(getByText('Demon')).toBeOnTheScreen();
    expect(getByText('Poisoned')).toBeOnTheScreen();
    expect(getByText('Outsider')).toBeOnTheScreen();
  });

  it('shows reminders from Sects and Violets for Artist and Snake Charmer', () => {
    const { getByText, queryByText } = render(
      <ReminderSelect
        visible
        edition="snv"
        characterIds={[CharacterId.Artist, CharacterId.Snakecharmer]}
        onSelect={jest.fn()}
        onDismiss={jest.fn()}/>,
    );
    expect(getByText('No ability')).toBeOnTheScreen();
    expect(getByText('Poisoned')).toBeOnTheScreen();
    expect(queryByText('Mad')).toBeNull();
  });

  it('shows reminders from Sects and Violets for all characters', async () => {
    const { getByTestId, getByText } = render(
      <ReminderSelect
        visible
        edition="snv"
        characterIds={[CharacterId.Artist, CharacterId.Snakecharmer]}
        onSelect={jest.fn()}
        onDismiss={jest.fn()}/>,
    );
    fireEvent(getByTestId('reminders-show-all'), 'valueChange', true);
    expect(getByText('Demon not voted')).toBeOnTheScreen();
    expect(getByText('Cursed')).toBeOnTheScreen();
  });

  it('does not highlight any reminders when not replacing', () => {
    const { queryByTestId } = render(
      <ReminderSelect
        visible
        edition="tb"
        characterIds={[CharacterId.Imp, CharacterId.Investigator]}
        onSelect={jest.fn()}
        onDismiss={jest.fn()}/>,
    );
    expect(queryByTestId('replacing')).toBeNull();
  });

  it('highlights character being replaced', () => {
    const { queryByTestId } = render(
      <ReminderSelect
        visible
        edition="tb"
        characterIds={[CharacterId.Imp, CharacterId.Investigator]}
        onSelect={jest.fn()}
        onDismiss={jest.fn()}/>,
      {
        preloadedState: {
          reminders: {
            reminders: {
              'abc123': {
                data: {
                  icon: 'test-file-stub',
                  label: 'Minion',
                },
              },
            },
          } as RemindersState,
          grim: { replacingReminderKey: 'abc123' } as GrimState,
        },
      },
    );
    expect(queryByTestId('replacing')).toHaveTextContent('Minion');
  });

  it('calls onSelect when selecting reminder', async () => {
    const onSelect = jest.fn();
    const onDismiss = jest.fn();
    const { getByText } = render(
      <ReminderSelect
        visible
        edition="tb"
        characterIds={[CharacterId.Imp, CharacterId.Investigator]}
        onSelect={onSelect}
        onDismiss={onDismiss}/>,
    );
    await userEvent.press(getByText('Minion'));
    expect(onSelect).toHaveBeenCalled();
    expect(onDismiss).not.toHaveBeenCalled();
  });

  it('calls onDismiss when dismissing the modal', async () => {
    const onSelect = jest.fn();
    const onDismiss = jest.fn();
    const { getByTestId } = render(
      <ReminderSelect
        visible
        edition="tb"
        characterIds={[CharacterId.Imp, CharacterId.Investigator]}
        onSelect={onSelect}
        onDismiss={onDismiss}/>,
    );
    await userEvent.press(getByTestId('close-token-select'));
    expect(onSelect).not.toHaveBeenCalled();
    expect(onDismiss).toHaveBeenCalled();
  });
});
