import { AppStore, RootState, setupStore } from '@/app/state/store';
import { Colors } from '@/constants/colors';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  NavigationContext,
} from '@react-navigation/native';
import { render, RenderOptions } from '@testing-library/react-native';
import merge from 'deepmerge';
import React, { PropsWithChildren } from 'react';
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

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

function customRender(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function AllTheProviders({ children }: PropsWithChildren) {
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
  }

  return { store, ...render(ui, { wrapper: AllTheProviders, ...renderOptions }) };
}

// re-export everything
export * from '@testing-library/react-native';

// override render method
export { customRender as render };



