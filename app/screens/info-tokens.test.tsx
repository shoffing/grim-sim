import InfoTokens from '@/app/screens/info-tokens';
import * as infoTokensSlice from '@/app/state/info-tokens-slice';
import { store } from '@/app/state/store';
import { act, fireEvent, userEvent, waitFor } from '@testing-library/react-native';
import { render } from '../test-utils';
import '@testing-library/react-native/extend-expect';

describe('<InfoTokens />', () => {
  beforeEach(() => {
    store.dispatch(infoTokensSlice.reset());
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => jest.runOnlyPendingTimers());
    jest.useRealTimers();
  });

  it('is not visible if visible is false', async () => {
    const { queryByTestId } = render(
      <InfoTokens
        visible={false}
        onDismiss={jest.fn()}/>,
    );
    expect(queryByTestId('add-bluff-button')).toBeNull();
  });

  it('dismisses modal', async () => {
    const onDismiss = jest.fn();
    const { getByTestId } = render(
      <InfoTokens
        visible
        onDismiss={onDismiss}/>,
    );
    await userEvent.press(getByTestId('close-info-tokens'));
    expect(onDismiss).toHaveBeenCalled();
  });

  it('shows default info tokens', () => {
    const { getByText } = render(
      <InfoTokens
        visible
        onDismiss={jest.fn()}/>,
    );
    expect(getByText('This is the Demon')).toBeOnTheScreen();
    expect(getByText('These are your Minions')).toBeOnTheScreen();
    expect(getByText('These characters are not in play')).toBeOnTheScreen();
    expect(getByText('This character selected you')).toBeOnTheScreen();
    expect(getByText('This player is')).toBeOnTheScreen();
    expect(getByText('You are')).toBeOnTheScreen();
    expect(getByText('You are GOOD')).toBeOnTheScreen();
    expect(getByText('You are EVIL')).toBeOnTheScreen();
    expect(getByText('Did you nominate today?')).toBeOnTheScreen();
    expect(getByText('Did you vote today?')).toBeOnTheScreen();
  });

  it('shows an info token', async () => {
    const { getByText, getByTestId } = render(
      <InfoTokens
        visible
        onDismiss={jest.fn()}/>,
    );
    await userEvent.press(getByText('Did you vote today?'));
    expect(getByTestId('showing-content')).toBeOnTheScreen();
    expect(getByTestId('showing-content')).toHaveTextContent(/Did you vote today?/);
    expect(getByTestId('info-token-icon-vote', { includeHiddenElements: true })).toBeOnTheScreen();
  });

  it('dismisses the showing of an info token', async () => {
    const { getByText, getByTestId, queryByTestId } = render(
      <InfoTokens
        visible
        onDismiss={jest.fn()}/>,
    );
    await userEvent.press(getByText('Did you vote today?'));
    await userEvent.press(getByTestId('close-showing'));
    await waitFor(() => expect(queryByTestId('showing-content')).toBeNull(), { interval: 500 });
  });

  it('adds and shows a custom token', async () => {
    const { getByText, getByTestId } = render(
      <InfoTokens
        visible
        onDismiss={jest.fn()}/>,
    );
    await userEvent.press(getByText('Add custom'));
    await userEvent.type(getByTestId('custom-token-text'), 'You are a super-star!');
    fireEvent(getByTestId('color-dropdown'), 'select', 'red');
    await userEvent.press(getByTestId('save-custom-token'));
    await userEvent.press(getByText('You are a super-star!'));
    expect(getByTestId('showing-content')).toBeOnTheScreen();
    expect(getByTestId('showing-content')).toHaveTextContent(/You are a super-star!/);
    expect(getByTestId('container-background-image').props.tintColor).toEqual('#FFEBEE');
  });

  it('adds several custom tokens', async () => {
    const { getByText, getByTestId } = render(
      <InfoTokens
        visible
        onDismiss={jest.fn()}/>,
    );
    await userEvent.press(getByText('Add custom'));
    await userEvent.type(getByTestId('custom-token-text'), 'You are a super-star!');
    await userEvent.press(getByTestId('save-custom-token'));
    await userEvent.press(getByText('Add custom'));
    await userEvent.type(getByTestId('custom-token-text'), 'A second custom token!');
    await userEvent.press(getByTestId('save-custom-token'));
    await userEvent.press(getByText('Add custom'));
    await userEvent.type(getByTestId('custom-token-text'), 'AND A THIRD!');
    await userEvent.press(getByTestId('save-custom-token'));
    expect(getByText('You are a super-star!')).toBeOnTheScreen();
    expect(getByText('A second custom token!')).toBeOnTheScreen();
    expect(getByText('AND A THIRD!')).toBeOnTheScreen();
  });

  it('removes a custom token', async () => {
    const { getByText, getByTestId, queryByText } = render(
      <InfoTokens
        visible
        onDismiss={jest.fn()}/>,
    );
    await userEvent.press(getByText('Add custom'));
    await userEvent.type(getByTestId('custom-token-text'), 'You are a super-star!');
    await userEvent.press(getByTestId('save-custom-token'));
    await userEvent.press(getByText('Add custom'));
    await userEvent.type(getByTestId('custom-token-text'), 'A second custom token!');
    await userEvent.press(getByTestId('save-custom-token'));
    await userEvent.press(getByText('Add custom'));
    await userEvent.type(getByTestId('custom-token-text'), 'AND A THIRD!');
    await userEvent.press(getByTestId('save-custom-token'));
    await userEvent.press(getByText('A second custom token!'));
    await userEvent.press(getByTestId('delete-custom-token'));
    expect(getByText('You are a super-star!')).toBeOnTheScreen();
    expect(getByText('AND A THIRD!')).toBeOnTheScreen();
    await waitFor(() => expect(queryByText('A second custom token!')).toBeNull(), { interval: 500 });
  });
});
