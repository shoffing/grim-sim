import { ACCESSIBILITY_LABEL as CHARACTER_CONTROLS_ACCESSIBILITY_LABEL } from '@/app/components/character-controls';
import { ACCESSIBILITY_LABEL as GAME_CONTROLS_ACCESSIBILITY_LABEL } from '@/app/components/game-controls';
import { ACCESSIBILITY_LABEL as REMINDER_CONTROLS_ACCESSIBILITY_LABEL } from '@/app/components/reminder-controls';
import * as slice from '@/app/game-slice';
import Grim from '@/app/screens/grim';
import { store } from '@/app/store';
import CharacterId from '@/constants/characters/character-id';
import { getCharacterById } from '@/constants/characters/characters';
import { fireEvent, userEvent } from '@testing-library/react-native';
import { UserEventInstance } from '@testing-library/react-native/build/user-event/setup';
import { ReactTestInstance } from 'react-test-renderer';
import { render, screen } from '../test-utils';
import '@testing-library/react-native/extend-expect';

jest.useFakeTimers();

const queryCharacterToken = (id: CharacterId, idx = 0) => {
  return screen.queryAllByTestId(new RegExp(`character-\\d+-${id}`))[idx] ?? null;
};

const queryReminderToken = (label: string, idx = 0) => {
  return screen.queryAllByTestId(new RegExp(`reminder-\\d+-${label}`))[idx] ?? null;
};

const openGameControls = async (user: UserEventInstance) => {
  await user.press(screen.getByTestId('grim')); // clear selections
  await user.press(screen.getByRole('button', { name: GAME_CONTROLS_ACCESSIBILITY_LABEL }));
};

const openCharacterControls = async (user: UserEventInstance, id: CharacterId, idx = 0) => {
  const token = queryCharacterToken(id, idx);
  if (!token.props.accessibilityState.selected) await user.press(token);
  await user.press(screen.getByRole('button', { name: CHARACTER_CONTROLS_ACCESSIBILITY_LABEL }));
};

const openReminderControls = async (user: UserEventInstance, label: string, idx = 0) => {
  const token = queryReminderToken(label, idx);
  if (!token.props.accessibilityState.selected) await user.press(token);
  await user.press(screen.getByRole('button', { name: REMINDER_CONTROLS_ACCESSIBILITY_LABEL }));
};

describe('<Grim />', () => {
  beforeEach(() => {
    // Reset Redux store between tests.
    store.dispatch(slice.reset());
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
    const user = userEvent.setup();
    await user.press(token);
    expect(token).toBeSelected();
  });

  it('renders characters initially in an ellipse',
    () => {
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
      const tokens = characters.map(c => queryCharacterToken(c));
      const getPos = (token: ReactTestInstance) => ({
        // Not sure why the AnimatedView is the `parent.parent.parent` of the TouchableWithoutFeedback in Token?
        x: token.parent!.parent!.parent!.props.style.transform[0].translateX,
        y: token.parent!.parent!.parent!.props.style.transform[1].translateY,
      });
      tokens.forEach((token, idx) => {
        const pos = getPos(token);
        expect(pos.x).toBeCloseTo((1000 / 2) + Math.cos(2 * (idx / 8) * Math.PI) * 0.8 * (1000 / 2) - 128 / 2);
        expect(pos.y).toBeCloseTo((1000 / 2) + Math.sin(2 * (idx / 8) * Math.PI) * 0.8 * (1000 / 2) - 128 / 2);
      });
    });

  describe('GameControls', () => {
    it('adds a new character', async () => {
      const { getByRole, getByTestId } = render(<Grim/>);
      const user = userEvent.setup();
      await openGameControls(user);
      await user.press(getByTestId('add-character-game', { includeHiddenElements: true }));
      await user.press(getByRole('button', { name: getCharacterById(CharacterId.Beggar).name }));
      expect(queryCharacterToken(CharacterId.Beggar)).toBeOnTheScreen();
      expect(queryCharacterToken(CharacterId.Imp)).toBeOnTheScreen();
    });

    it('adds a new reminder', async () => {
      const { getByRole, getByTestId } = render(<Grim/>);
      const user = userEvent.setup();
      await openGameControls(user);
      await user.press(getByTestId('add-reminder-game', { includeHiddenElements: true }));
      fireEvent(getByTestId('reminders-show-all'), 'valueChange', true);
      await user.press(getByRole('button', { name: 'Red herring' }));
      expect(queryReminderToken('Red herring')).toBeOnTheScreen();
    });

    it('clears the grim', async () => {
      const { getByTestId } = render(<Grim/>);
      const user = userEvent.setup();
      await openGameControls(user);
      await user.press(getByTestId('clear-grim-game', { includeHiddenElements: true }));
      await user.press(getByTestId('confirm-clear-grim'));
      expect(queryCharacterToken(CharacterId.Imp)).toBeNull();
    });
  });

  describe('CharacterControls', () => {
    it('replaces the Imp with the Mayor', async () => {
      const { getByRole, getByTestId } = render(<Grim/>);
      const user = userEvent.setup();
      await openCharacterControls(user, CharacterId.Imp);
      await user.press(getByTestId('replace-character', { includeHiddenElements: true }));
      await user.press(getByRole('button', { name: getCharacterById(CharacterId.Mayor).name }));
      expect(queryCharacterToken(CharacterId.Mayor)).toBeOnTheScreen();
      expect(queryCharacterToken(CharacterId.Imp)).toBeNull();
    });

    it('deletes the Imp token', async () => {
      const { getByTestId } = render(<Grim/>);
      const user = userEvent.setup();
      await openCharacterControls(user, CharacterId.Imp);
      await user.press(getByTestId('delete-character', { includeHiddenElements: true }));
      await user.press(getByTestId('confirm-remove-character'));
      expect(queryCharacterToken(CharacterId.Imp)).toBeNull();
    });

    it('adds a reminder token for the Imp', async () => {
      const { getByRole, getByTestId } = render(<Grim/>);
      const user = userEvent.setup();
      await openCharacterControls(user, CharacterId.Imp);
      await user.press(getByTestId('add-reminder-character', { includeHiddenElements: true }));
      await user.press(getByRole('button', { name: 'Dead' }));
      expect(queryReminderToken('Dead')).toBeOnTheScreen();
    });

    it('adds a reminder token for the Imp after showing all', async () => {
      const { getByRole, getByTestId } = render(<Grim/>);
      const user = userEvent.setup();
      await openCharacterControls(user, CharacterId.Imp);
      await user.press(getByTestId('add-reminder-character', { includeHiddenElements: true }));
      fireEvent(getByTestId('reminders-show-all'), 'valueChange', true);
      await user.press(getByRole('button', { name: 'Executed' }));
      expect(queryReminderToken('Executed')).toBeOnTheScreen();
    });

    it('changes the Imp to Good team', async () => {
      const { getByTestId } = render(<Grim/>);
      const user = userEvent.setup();
      await openCharacterControls(user, CharacterId.Imp);
      await user.press(getByTestId('change-team-character', { includeHiddenElements: true }));
      const imp = queryCharacterToken(CharacterId.Imp);
      expect(() => imp.findByProps({ alt: 'Imp (good)' })).not.toThrow();
      expect(() => imp.findByProps({ alt: 'Imp (evil)' })).toThrow();
    });
  });

  describe('ReminderControls', () => {
    it('replaces a reminder', async () => {
      const { getByRole, getByTestId } = render(<Grim/>);
      const user = userEvent.setup();
      await openGameControls(user);
      await user.press(getByTestId('add-reminder-game', { includeHiddenElements: true }));
      fireEvent(getByTestId('reminders-show-all'), 'valueChange', true);
      await user.press(getByRole('button', { name: 'Red herring' }));
      await openReminderControls(user, 'Red herring');
      await user.press(getByTestId('replace-reminder', { includeHiddenElements: true }));
      await user.press(getByRole('button', { name: 'Outsider' }));
      expect(queryReminderToken('Outsider')).toBeOnTheScreen();
      expect(queryReminderToken('Red herring')).not.toBeOnTheScreen();
    });

    it('deletes a reminder', async () => {
      const { getByRole, getByTestId } = render(<Grim/>);
      const user = userEvent.setup();
      await openGameControls(user);
      await user.press(getByTestId('add-reminder-game', { includeHiddenElements: true }));
      fireEvent(getByTestId('reminders-show-all'), 'valueChange', true);
      await user.press(getByRole('button', { name: 'Red herring' })); //asdf
      await openReminderControls(user, 'Red herring');
      await user.press(getByTestId('delete-reminder', { includeHiddenElements: true }));
      await user.press(getByTestId('confirm-delete-reminder'));
      expect(queryReminderToken('Red herring')).not.toBeOnTheScreen();
    });
  });
});
