import { ACCESSIBILITY_LABEL as GAME_CONTROLS_ACCESSIBILITY_LABEL } from '@/app/components/game-controls';
import Grim from '@/app/screens/grim';
import * as charactersSlice from '@/app/state/characters-slice';
import * as grimSlice from '@/app/state/grim-slice';
import * as remindersSlice from '@/app/state/reminders-slice';
import { store } from '@/app/state/store';
import CharacterId from '@/constants/characters/character-id';
import { getCharacterById } from '@/constants/characters/characters';
import { act, fireEvent, userEvent } from '@testing-library/react-native';
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
  fireEvent.press(screen.getByTestId('add-character-game', { includeHiddenElements: true }));
  fireEvent.press(screen.getByRole('button', { name: getCharacterById(id).name }));
  return queryCharacterToken(id);
};

const addReminder = async (label: string) => {
  await openGameControls();
  fireEvent.press(screen.getByTestId('add-reminder-game', { includeHiddenElements: true }));
  fireEvent(screen.getByTestId('reminders-show-all'), 'valueChange', true);
  fireEvent.press(screen.getByRole('button', { name: label }));
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
      userEvent.setup();
      const token = await addCharacter(CharacterId.Beggar);
      expect(token).toBeOnTheScreen();
      fireEvent.press(token);
      expect(token).toBeSelected();
    });

    it('adds and selects a new reminder', async () => {
      render(<Grim/>);
      userEvent.setup();
      const token = await addReminder('Red herring');
      expect(token).toBeOnTheScreen();
      fireEvent.press(token);
      expect(token).toBeSelected();
    });

    it('clears the grim', async () => {
      const { getByTestId } = render(<Grim/>);
      userEvent.setup();
      await addCharacter(CharacterId.Imp);
      await addCharacter(CharacterId.Empath);
      await addCharacter(CharacterId.Fortuneteller);
      await addReminder('Red herring');
      await addReminder('Dead');
      await openGameControls();
      fireEvent.press(getByTestId('clear-grim-game', { includeHiddenElements: true }));
      fireEvent.press(getByTestId('confirm-clear-grim'));
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
      fireEvent.press(getByTestId('replace-character', { includeHiddenElements: true }));
      fireEvent.press(getByRole('button', { name: getCharacterById(CharacterId.Mayor).name }));
      expect(queryCharacterToken(CharacterId.Mayor)).toBeOnTheScreen();
      expect(queryCharacterToken(CharacterId.Imp)).toBeNull();
    });

    it('deletes the Imp token', async () => {
      const { getByTestId } = render(<Grim/>);
      await addCharacter(CharacterId.Imp);
      await openCharacterControls(CharacterId.Imp);
      fireEvent.press(getByTestId('delete-character', { includeHiddenElements: true }));
      fireEvent.press(getByTestId('confirm-remove-character'));
      expect(queryCharacterToken(CharacterId.Imp)).toBeNull();
    });

    it('adds a reminder token for the Imp', async () => {
      const { getByRole, getByTestId } = render(<Grim/>);
      await addCharacter(CharacterId.Imp);
      await openCharacterControls(CharacterId.Imp);
      fireEvent.press(getByTestId('add-reminder-character', { includeHiddenElements: true }));
      fireEvent.press(getByRole('button', { name: 'Dead' }));
      expect(queryReminderToken('Dead')).toBeOnTheScreen();
    });

    it('adds a reminder token for the Imp after showing all', async () => {
      const { getByRole, getByTestId } = render(<Grim/>);
      await addCharacter(CharacterId.Imp);
      await openCharacterControls(CharacterId.Imp);
      fireEvent.press(getByTestId('add-reminder-character', { includeHiddenElements: true }));
      fireEvent(getByTestId('reminders-show-all'), 'valueChange', true);
      fireEvent.press(getByRole('button', { name: 'Executed' }));
      expect(queryReminderToken('Executed')).toBeOnTheScreen();
    });

    it('changes the Imp to Good team', async () => {
      const { getByTestId } = render(<Grim/>);
      userEvent.setup();
      await addCharacter(CharacterId.Imp);
      await openCharacterControls(CharacterId.Imp);
      fireEvent.press(getByTestId('change-team-character', { includeHiddenElements: true }));
      const imp = queryCharacterToken(CharacterId.Imp);
      expect(() => imp.findByProps({ alt: 'Imp (good)' })).not.toThrow();
      expect(() => imp.findByProps({ alt: 'Imp (evil)' })).toThrow();
    });
  });

  describe('ReminderControls', () => {
    it('replaces a reminder', async () => {
      const { getByRole, getByTestId } = render(<Grim/>);
      await addReminder('Red herring');
      await openReminderControls('Red herring');
      fireEvent.press(getByTestId('replace-reminder', { includeHiddenElements: true }));
      fireEvent.press(getByRole('button', { name: 'Outsider' }));
      expect(queryReminderToken('Outsider')).toBeOnTheScreen();
      expect(queryReminderToken('Red herring')).not.toBeOnTheScreen();
    });

    it('deletes a reminder', async () => {
      const { getByTestId } = render(<Grim/>);
      await addReminder('Red herring');
      await openReminderControls('Red herring');
      fireEvent.press(getByTestId('delete-reminder', { includeHiddenElements: true }));
      fireEvent.press(getByTestId('confirm-delete-reminder'));
      expect(queryReminderToken('Red herring')).not.toBeOnTheScreen();
    });
  });
});
