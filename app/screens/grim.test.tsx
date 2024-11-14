import { ACCESSIBILITY_LABEL as CHARACTER_CONTROLS_ACCESSIBILITY_LABEL } from '@/app/components/character-controls';
import { ACCESSIBILITY_LABEL as GAME_CONTROLS_ACCESSIBILITY_LABEL } from '@/app/components/game-controls';
import { ACCESSIBILITY_LABEL as REMINDER_CONTROLS_ACCESSIBILITY_LABEL } from '@/app/components/reminder-controls';
import * as slice from '@/app/game-slice';
import Grim from '@/app/screens/grim';
import { store } from '@/app/store';
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
  fireEvent.press(screen.getByRole('button', { name: CHARACTER_CONTROLS_ACCESSIBILITY_LABEL }));
};

const openReminderControls = async (label: string, idx = 0) => {
  const token = queryReminderToken(label, idx);
  if (!token.props['aria-selected']) fireEvent.press(token);
  fireEvent.press(screen.getByRole('button', { name: REMINDER_CONTROLS_ACCESSIBILITY_LABEL }));
};

describe('<Grim />', () => {
  beforeEach(() => {
    // Reset Redux store between tests.
    store.dispatch(slice.reset());
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => jest.runOnlyPendingTimers());
    jest.useRealTimers();
  });

  it('renders the Imp by default', () => {
    render(<Grim/>);
    const imp = queryCharacterToken(CharacterId.Imp);
    expect(imp).toBeOnTheScreen();
    expect(() => imp.findByProps({ alt: 'Imp (evil)' })).not.toThrow();
    expect(() => imp.findByProps({ alt: 'Imp (good)' })).toThrow();
  });

  it('selects the Imp', async () => {
    render(<Grim/>);
    const token = queryCharacterToken(CharacterId.Imp);
    fireEvent.press(token);
    expect(token).toBeSelected();
  });

  it('renders characters initially in an ellipse', async () => {
    const characters = [
      CharacterId.Imp,
      CharacterId.Poisoner,
      CharacterId.Butler,
      CharacterId.Mayor,
      CharacterId.Fortuneteller,
      CharacterId.Empath,
      CharacterId.Investigator,
      CharacterId.Washerwoman,
    ];
    store.dispatch(slice.setCharacters(characters));
    store.dispatch(slice.setInitialize(true));
    const { getByTestId } = render(<Grim/>);
    fireEvent(getByTestId('grim'), 'layout', { nativeEvent: { layout: { width: 1000, height: 1000 } } });
    act(() => jest.runOnlyPendingTimers());
    const tokens = characters.map(c => queryCharacterToken(c));
    tokens.forEach((token, idx) => {
      expect(token).toHaveAnimatedStyle({
        transform: [
          { translateX: (1000 / 2) + Math.cos(2 * (idx / 8) * Math.PI) * 0.8 * (1000 / 2) - 128 / 2 },
          { translateY: (1000 / 2) + Math.sin(2 * (idx / 8) * Math.PI) * 0.8 * (1000 / 2) - 128 / 2 },
        ],
      });
    });
  });

  describe('GameControls', () => {
    it('adds a new character', async () => {
      const { getByRole, getByTestId } = render(<Grim/>);
      userEvent.setup();
      await openGameControls();
      fireEvent.press(getByTestId('add-character-game', { includeHiddenElements: true }));
      fireEvent.press(getByRole('button', { name: getCharacterById(CharacterId.Beggar).name }));
      expect(queryCharacterToken(CharacterId.Beggar)).toBeOnTheScreen();
      expect(queryCharacterToken(CharacterId.Imp)).toBeOnTheScreen();
    });

    it('adds a new reminder', async () => {
      const { getByRole, getByTestId } = render(<Grim/>);
      userEvent.setup();
      await openGameControls();
      fireEvent.press(getByTestId('add-reminder-game', { includeHiddenElements: true }));
      fireEvent(getByTestId('reminders-show-all'), 'valueChange', true);
      fireEvent.press(getByRole('button', { name: 'Red herring' }));
      expect(queryReminderToken('Red herring')).toBeOnTheScreen();
    });

    it('clears the grim', async () => {
      const { getByTestId } = render(<Grim/>);
      userEvent.setup();
      await openGameControls();
      fireEvent.press(getByTestId('clear-grim-game', { includeHiddenElements: true }));
      fireEvent.press(getByTestId('confirm-clear-grim'));
      expect(queryCharacterToken(CharacterId.Imp)).toBeNull();
    });
  });

  describe('CharacterControls', () => {
    it('replaces the Imp with the Mayor', async () => {
      const { getByRole, getByTestId } = render(<Grim/>);
      await openCharacterControls(CharacterId.Imp);
      fireEvent.press(getByTestId('replace-character', { includeHiddenElements: true }));
      fireEvent.press(getByRole('button', { name: getCharacterById(CharacterId.Mayor).name }));
      expect(queryCharacterToken(CharacterId.Mayor)).toBeOnTheScreen();
      expect(queryCharacterToken(CharacterId.Imp)).toBeNull();
    });

    it('deletes the Imp token', async () => {
      const { getByTestId } = render(<Grim/>);
      await openCharacterControls(CharacterId.Imp);
      fireEvent.press(getByTestId('delete-character', { includeHiddenElements: true }));
      fireEvent.press(getByTestId('confirm-remove-character'));
      expect(queryCharacterToken(CharacterId.Imp)).toBeNull();
    });

    it('adds a reminder token for the Imp', async () => {
      const { getByRole, getByTestId } = render(<Grim/>);
      await openCharacterControls(CharacterId.Imp);
      fireEvent.press(getByTestId('add-reminder-character', { includeHiddenElements: true }));
      fireEvent.press(getByRole('button', { name: 'Dead' }));
      expect(queryReminderToken('Dead')).toBeOnTheScreen();
    });

    it('adds a reminder token for the Imp after showing all', async () => {
      const { getByRole, getByTestId } = render(<Grim/>);
      await openCharacterControls(CharacterId.Imp);
      fireEvent.press(getByTestId('add-reminder-character', { includeHiddenElements: true }));
      fireEvent(getByTestId('reminders-show-all'), 'valueChange', true);
      fireEvent.press(getByRole('button', { name: 'Executed' }));
      expect(queryReminderToken('Executed')).toBeOnTheScreen();
    });

    it('changes the Imp to Good team', async () => {
      const { getByTestId } = render(<Grim/>);
      userEvent.setup();
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
      await openGameControls();
      fireEvent.press(getByTestId('add-reminder-game', { includeHiddenElements: true }));
      fireEvent(getByTestId('reminders-show-all'), 'valueChange', true);
      fireEvent.press(getByRole('button', { name: 'Red herring' }));
      await openReminderControls('Red herring');
      fireEvent.press(getByTestId('replace-reminder', { includeHiddenElements: true }));
      fireEvent.press(getByRole('button', { name: 'Outsider' }));
      expect(queryReminderToken('Outsider')).toBeOnTheScreen();
      expect(queryReminderToken('Red herring')).not.toBeOnTheScreen();
    });

    it('deletes a reminder', async () => {
      const { getByRole, getByTestId } = render(<Grim/>);
      await openGameControls();
      fireEvent.press(getByTestId('add-reminder-game', { includeHiddenElements: true }));
      fireEvent(getByTestId('reminders-show-all'), 'valueChange', true);
      fireEvent.press(getByRole('button', { name: 'Red herring' }));
      await openReminderControls('Red herring');
      fireEvent.press(getByTestId('delete-reminder', { includeHiddenElements: true }));
      fireEvent.press(getByTestId('confirm-delete-reminder'));
      expect(queryReminderToken('Red herring')).not.toBeOnTheScreen();
    });
  });
});
