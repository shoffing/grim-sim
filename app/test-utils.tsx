import { store } from '@/app/state/store';
import { Colors } from '@/constants/colors';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  NavigationContext,
} from '@react-navigation/native';
import { render, RenderOptions } from '@testing-library/react-native';
import merge from 'deepmerge';
import { PropsWithChildren, ReactElement } from 'react';
import { useColorScheme } from 'react-native';
import { adaptNavigationTheme, MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';

const customLightTheme = { ...MD3LightTheme, colors: Colors.light };
const customDarkTheme = { ...MD3DarkTheme, colors: Colors.dark };

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedLightTheme = merge(LightTheme, customLightTheme);
const CombinedDarkTheme = merge(DarkTheme, customDarkTheme);

const AllTheProviders = ({ children }: PropsWithChildren) => {
  const colorScheme = useColorScheme();
  const paperTheme = colorScheme === 'dark' ? CombinedDarkTheme : CombinedLightTheme;

  const actualNav = jest.requireActual('@react-navigation/native');
  const navContext = {
    ...actualNav.navigation,
    navigate: () => {
    },
    dangerouslyGetState: () => {
    },
    setOptions: () => {
    },
    addListener: () => () => {
    },
    isFocused: () => true,
  };

  return (
    <NavigationContext.Provider value={navContext}>
      <ReduxProvider store={store}>
        <PaperProvider theme={paperTheme}>
          {children}
        </PaperProvider>
      </ReduxProvider>
    </NavigationContext.Provider>
  );
};

const customRender = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react-native';

// override render method
export { customRender as render };



