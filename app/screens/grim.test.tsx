import 'react-native-get-random-values';
import { ACCESSIBILITY_LABEL as GAME_CONTROLS_ACCESSIBILITY_LABEL } from '@/app/components/game-controls';
import Grim from '@/app/screens/grim';
import * as charactersSlice from '@/app/state/characters-slice';
import * as grimSlice from '@/app/state/grim-slice';
import * as remindersSlice from '@/app/state/reminders-slice';
import { store } from '@/app/state/store';
import CharacterId from '@/constants/characters/character-id';
import { getCharacterById } from '@/constants/characters/characters';
import { act, fireEvent, userEvent } from '@testing-library/react-native';
import { ReactTestInstance } from 'react-test-renderer';
import { render, screen } from '../test-utils';
import '@testing-library/react-native/extend-expect';

const queryCharacterToken = (id: CharacterId, idx = 0) => {
  return screen.queryAllByTestId(new RegExp(`character-\\d+-${id}`))[idx] ?? null;
};

const queryReminderToken = (label: string, idx = 0) => {
  return screen.queryAllByTestId(new RegExp(`reminder-\\d+-${label}`))[idx] ?? null;
};

const openGameControls = async () => {
  fireEvent.press(screen.getByTestId('grim')); // clear selections
  fireEvent.press(screen.getByRole('button', { name: GAME_CONTROLS_ACCESSIBILITY_LABEL }));
};

const openCharacterControls = async (id: CharacterId, idx = 0) => {
  const token = queryCharacterToken(id, idx);
  if (!token.props['aria-selected']) fireEvent.press(token);
};

const openReminderControls = async (label: string, idx = 0) => {
  const token = queryReminderToken(label, idx);
  if (!token.props['aria-selected']) fireEvent.press(token);
};

const addCharacter = async (id: CharacterId) => {
  await openGameControls();
  await userEvent.press(screen.getByTestId('add-character-game', { includeHiddenElements: true }));
  await userEvent.press(screen.getByRole('button', { name: getCharacterById(id).name }));
  return queryCharacterToken(id);
};

const addReminder = async (label: string) => {
  await openGameControls();
  await userEvent.press(screen.getByTestId('add-reminder-game', { includeHiddenElements: true }));
  fireEvent(screen.getByTestId('reminders-show-all'), 'valueChange', true);
  await userEvent.press(screen.getByRole('button', { name: label }));
  return queryReminderToken(label);
};

describe('<Grim />', () => {
  beforeEach(() => {
    // Reset Redux store between tests.
    store.dispatch(grimSlice.reset());
    store.dispatch(charactersSlice.reset());
    store.dispatch(remindersSlice.reset());
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => jest.runOnlyPendingTimers());
    jest.useRealTimers();
  });

  describe('GameControls', () => {
    it('adds and selects a new character', async () => {
      render(<Grim/>);
      const token = await addCharacter(CharacterId.Beggar);
      expect(token).toBeOnTheScreen();
      fireEvent.press(token);
      expect(token).toBeSelected();
    });

    it('adds and selects a new reminder', async () => {
      render(<Grim/>);
      const token = await addReminder('Red herring');
      expect(token).toBeOnTheScreen();
      fireEvent.press(token);
      expect(token).toBeSelected();
    });

    it('clears the grim', async () => {
      const { getByTestId } = render(<Grim/>);
      await addCharacter(CharacterId.Imp);
      await addCharacter(CharacterId.Empath);
      await addCharacter(CharacterId.Fortuneteller);
      await addReminder('Red herring');
      await addReminder('Dead');
      await openGameControls();
      await userEvent.press(getByTestId('clear-grim-game', { includeHiddenElements: true }));
      await userEvent.press(getByTestId('confirm-clear-grim'));
      expect(queryCharacterToken(CharacterId.Imp)).toBeNull();
      expect(queryCharacterToken(CharacterId.Empath)).toBeNull();
      expect(queryCharacterToken(CharacterId.Fortuneteller)).toBeNull();
      expect(queryReminderToken('Red herring')).toBeNull();
      expect(queryReminderToken('Dead')).toBeNull();
    });
  });

  describe('CharacterControls', () => {
    it('replaces the Imp with the Mayor', async () => {
      const { getByRole, getByTestId } = render(<Grim/>);
      await addCharacter(CharacterId.Imp);
      await openCharacterControls(CharacterId.Imp);
      await userEvent.press(getByTestId('replace-character', { includeHiddenElements: true }));
      await userEvent.press(getByRole('button', { name: getCharacterById(CharacterId.Mayor).name }));
      expect(queryCharacterToken(CharacterId.Mayor)).toBeOnTheScreen();
      expect(queryCharacterToken(CharacterId.Imp)).toBeNull();
    });

    it('deletes the Imp token', async () => {
      const { getByTestId } = render(<Grim/>);
      await addCharacter(CharacterId.Imp);
      await openCharacterControls(CharacterId.Imp);
      await userEvent.press(getByTestId('delete-character', { includeHiddenElements: true }));
      await userEvent.press(getByTestId('confirm-remove-character'));
      expect(queryCharacterToken(CharacterId.Imp)).toBeNull();
    });

    it('adds a reminder token for the Imp', async () => {
      const { getByRole, getByTestId } = render(<Grim/>);
      await addCharacter(CharacterId.Imp);
      await openCharacterControls(CharacterId.Imp);
      await userEvent.press(getByTestId('add-reminder-character', { includeHiddenElements: true }));
      await userEvent.press(getByRole('button', { name: 'Dead' }));
      expect(queryReminderToken('Dead')).toBeOnTheScreen();
    });

    it('adds a reminder token for the Imp after showing all', async () => {
      const { getByRole, getByTestId } = render(<Grim/>);
      await addCharacter(CharacterId.Imp);
      await openCharacterControls(CharacterId.Imp);
      await userEvent.press(getByTestId('add-reminder-character', { includeHiddenElements: true }));
      fireEvent(getByTestId('reminders-show-all'), 'valueChange', true);
      await userEvent.press(getByRole('button', { name: 'Executed' }));
      expect(queryReminderToken('Executed')).toBeOnTheScreen();
    });

    it('changes the Imp to Good team', async () => {
      const { getByTestId } = render(<Grim/>);
      await addCharacter(CharacterId.Imp);
      await openCharacterControls(CharacterId.Imp);
      await userEvent.press(getByTestId('change-team-character', { includeHiddenElements: true }));
      const imp = queryCharacterToken(CharacterId.Imp);
      expect(() => imp.findByProps({ alt: 'Imp (good)' })).not.toThrow();
      expect(() => imp.findByProps({ alt: 'Imp (evil)' })).toThrow();
    });

    it('sets player names', async () => {
      const { getByTestId, queryByText } = render(<Grim/>);
      await addCharacter(CharacterId.Imp);
      await addCharacter(CharacterId.Fortuneteller);
      await addCharacter(CharacterId.Butler);

      await openCharacterControls(CharacterId.Imp);
      await userEvent.press(getByTestId('set-player-name-character', { includeHiddenElements: true }));
      await userEvent.clear(getByTestId('name-text-input'));
      await userEvent.type(getByTestId('name-text-input'), 'James Bond', { submitEditing: true });

      await openCharacterControls(CharacterId.Fortuneteller);
      await userEvent.press(getByTestId('set-player-name-character', { includeHiddenElements: true }));
      await userEvent.clear(getByTestId('name-text-input'));
      await userEvent.type(getByTestId('name-text-input'), 'Jimmy Testerino');
      await userEvent.press(getByTestId('confirm-set-name'));

      await openCharacterControls(CharacterId.Butler);
      await userEvent.press(getByTestId('set-player-name-character', { includeHiddenElements: true }));
      await userEvent.clear(getByTestId('name-text-input'));
      await userEvent.type(getByTestId('name-text-input'), 'Pepper Pancakes');
      await userEvent.press(getByTestId('confirm-set-name'));

      await openCharacterControls(CharacterId.Butler);
      await userEvent.press(getByTestId('set-player-name-character', { includeHiddenElements: true }));
      await userEvent.clear(getByTestId('name-text-input'));
      await userEvent.type(getByTestId('name-text-input'), 'Renamed Renamer');
      await userEvent.press(getByTestId('confirm-set-name'));

      expect(queryByText('James Bond')).toBeOnTheScreen();
      expect(queryByText('Jimmy Testerino')).toBeOnTheScreen();
      expect(queryByText('Pepper Pancakes')).toBeNull();
      expect(queryByText('Renamed Renamer')).toBeOnTheScreen();
    });

    it('kills a player', async () => {
      const { getByTestId } = render(<Grim/>);
      const token = await addCharacter(CharacterId.Imp);
      await openCharacterControls(CharacterId.Imp);
      await userEvent.press(getByTestId('kill-player-character'));
      expect(getByTestId('shroud')).toBeOnTheScreen();
      expect((token.children[0] as ReactTestInstance).props['style']['borderStyle']).toEqual('dotted'); // ghost vote
    });

    it('revives a player', async () => {
      const { getByTestId, queryByTestId } = render(<Grim/>);
      const token = await addCharacter(CharacterId.Imp);
      await openCharacterControls(CharacterId.Imp);
      await userEvent.press(getByTestId('kill-player-character'));
      await openCharacterControls(CharacterId.Imp);
      await userEvent.press(getByTestId('revive-player-character'));
      expect(queryByTestId('shroud')).toBeNull();
      expect((token.children[0] as ReactTestInstance).props['style']['borderStyle']).not.toEqual('dotted'); // no ghost vote
    });

    it('uses a dead player\'s ghost vote', async () => {
      const { getByTestId } = render(<Grim/>);
      const token = await addCharacter(CharacterId.Imp);
      await openCharacterControls(CharacterId.Imp);
      await userEvent.press(getByTestId('kill-player-character'));
      await openCharacterControls(CharacterId.Imp);
      await userEvent.press(getByTestId('use-ghost-vote-character'));
      expect((token.children[0] as ReactTestInstance).props['style']['borderStyle']).not.toEqual('dotted'); // no ghost vote
      expect(getByTestId('shroud')).toBeOnTheScreen();
    });

    it('restores a dead player\'s ghost vote', async () => {
      const { getByTestId } = render(<Grim/>);
      const token = await addCharacter(CharacterId.Imp);
      await openCharacterControls(CharacterId.Imp);
      await userEvent.press(getByTestId('kill-player-character'));
      await openCharacterControls(CharacterId.Imp);
      await userEvent.press(getByTestId('use-ghost-vote-character'));
      await openCharacterControls(CharacterId.Imp);
      await userEvent.press(getByTestId('restore-ghost-vote-character'));
      expect((token.children[0] as ReactTestInstance).props['style']['borderStyle']).toEqual('dotted'); // no ghost vote
      expect(getByTestId('shroud')).toBeOnTheScreen();
    });

    it('has the correct menu options for alive players', async () => {
      const { queryByTestId } = render(<Grim/>);
      await addCharacter(CharacterId.Imp);
      await openCharacterControls(CharacterId.Imp);
      expect(queryByTestId('replace-character')).not.toBeNull();
      expect(queryByTestId('change-team-character')).not.toBeNull();
      expect(queryByTestId('add-reminder-character')).not.toBeNull();
      expect(queryByTestId('delete-character')).not.toBeNull();
      expect(queryByTestId('set-player-name-character')).not.toBeNull();
      expect(queryByTestId('kill-player-character')).not.toBeNull();
      expect(queryByTestId('revive-player-character')).toBeNull();
      expect(queryByTestId('use-ghost-vote-character')).toBeNull();
      expect(queryByTestId('restore-ghost-vote-character')).toBeNull();
    });

    it('has the correct menu options for dead players', async () => {
      const { queryByTestId, getByTestId } = render(<Grim/>);
      await addCharacter(CharacterId.Imp);
      await openCharacterControls(CharacterId.Imp);
      await userEvent.press(getByTestId('kill-player-character'));
      await openCharacterControls(CharacterId.Imp);
      expect(queryByTestId('replace-character')).not.toBeNull();
      expect(queryByTestId('change-team-character')).not.toBeNull();
      expect(queryByTestId('add-reminder-character')).not.toBeNull();
      expect(queryByTestId('delete-character')).not.toBeNull();
      expect(queryByTestId('set-player-name-character')).not.toBeNull();
      expect(queryByTestId('kill-player-character')).toBeNull();
      expect(queryByTestId('revive-player-character')).not.toBeNull();
      expect(queryByTestId('use-ghost-vote-character')).not.toBeNull();
      expect(queryByTestId('restore-ghost-vote-character')).toBeNull();
    });

    it('has the correct menu options for dead players without ghost votes', async () => {
      const { queryByTestId, getByTestId } = render(<Grim/>);
      await addCharacter(CharacterId.Imp);
      await openCharacterControls(CharacterId.Imp);
      await userEvent.press(getByTestId('kill-player-character'));
      await openCharacterControls(CharacterId.Imp);
      await userEvent.press(getByTestId('use-ghost-vote-character'));
      await openCharacterControls(CharacterId.Imp);
      expect(queryByTestId('replace-character')).not.toBeNull();
      expect(queryByTestId('change-team-character')).not.toBeNull();
      expect(queryByTestId('add-reminder-character')).not.toBeNull();
      expect(queryByTestId('delete-character')).not.toBeNull();
      expect(queryByTestId('set-player-name-character')).not.toBeNull();
      expect(queryByTestId('kill-player-character')).toBeNull();
      expect(queryByTestId('revive-player-character')).not.toBeNull();
      expect(queryByTestId('use-ghost-vote-character')).toBeNull();
      expect(queryByTestId('restore-ghost-vote-character')).not.toBeNull();
    });
  });

  describe('ReminderControls', () => {
    it('replaces a reminder', async () => {
      const { getByRole, getByTestId } = render(<Grim/>);
      await addReminder('Red herring');
      await openReminderControls('Red herring');
      await userEvent.press(getByTestId('replace-reminder', { includeHiddenElements: true }));
      await userEvent.press(getByRole('button', { name: 'Outsider' }));
      expect(queryReminderToken('Outsider')).toBeOnTheScreen();
      expect(queryReminderToken('Red herring')).not.toBeOnTheScreen();
    });

    it('deletes a reminder', async () => {
      const { getByTestId } = render(<Grim/>);
      await addReminder('Red herring');
      await openReminderControls('Red herring');
      await userEvent.press(getByTestId('delete-reminder', { includeHiddenElements: true }));
      await userEvent.press(getByTestId('confirm-delete-reminder'));
      expect(queryReminderToken('Red herring')).not.toBeOnTheScreen();
    });
  });
});
