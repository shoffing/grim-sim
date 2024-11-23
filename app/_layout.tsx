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
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
} from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const customLightTheme = { ...MD3LightTheme, colors: Colors.light };
const customDarkTheme = { ...MD3DarkTheme, colors: Colors.dark };

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
    'NewRocker-Regular': require('@/assets/fonts/NewRocker-Regular.ttf'),
    'GermaniaOne-Regular': require('@/assets/fonts/GermaniaOne-Regular.ttf'),
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
