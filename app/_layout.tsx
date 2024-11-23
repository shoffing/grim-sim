import { persistor, store } from '@/app/state/store';
import { Colors } from '@/constants/colors';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import merge from 'deepmerge';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  ActivityIndicator,
  adaptNavigationTheme,
  configureFonts,
  MD3DarkTheme,
  MD3LightTheme,
  MD3Theme,
  PaperProvider,
} from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const cardo = { fontFamily: 'Cardo' };
const fonts = configureFonts({
  config: {
    displayLarge: cardo,
    displayMedium: cardo,
    displaySmall: cardo,
    headlineLarge: cardo,
    headlineMedium: cardo,
    headlineSmall: cardo,
    titleLarge: cardo,
    titleMedium: cardo,
    titleSmall: cardo,
    labelLarge: cardo,
    labelMedium: cardo,
    labelSmall: cardo,
    bodyLarge: cardo,
    bodyMedium: cardo,
    bodySmall: cardo,
  },
});
const customLightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: Colors.light,
  fonts,
};
const customDarkTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: Colors.dark,
  fonts,
};

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedLightTheme = merge(LightTheme, customLightTheme);
const CombinedDarkTheme = merge(DarkTheme, customDarkTheme);

SplashScreen.preventAutoHideAsync();

function RootLayout() {
  const colorScheme = useColorScheme();

  const paperTheme = colorScheme === 'dark' ? CombinedDarkTheme : CombinedLightTheme;

  const [loaded, error] = useFonts({
    'Bellefair': require('@/assets/fonts/Bellefair-Regular.ttf'),
    'NewRocker': require('@/assets/fonts/NewRocker-Regular.ttf'),
    'GermaniaOne': require('@/assets/fonts/GermaniaOne-Regular.ttf'),
    'Cardo': require('@/assets/fonts/Cardo-Regular.ttf'),
    'Cardo-Bold': require('@/assets/fonts/Cardo-Bold.ttf'),
    'Cardo-Italic': require('@/assets/fonts/Cardo-Italic.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={<ActivityIndicator/>} persistor={persistor}>
        <PaperProvider theme={paperTheme}>
          <StatusBar hidden={true}/>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer theme={NavigationDarkTheme}>
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }}/>
                <Stack.Screen name="game-setup" options={{ headerShown: false }}/>
              </Stack>
            </NavigationContainer>
          </GestureHandlerRootView>
        </PaperProvider>
      </PersistGate>
    </ReduxProvider>
  );
}

export default RootLayout;
