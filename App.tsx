import { LogBox } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store from './src/store/index.ts';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { navigationRef } from './src/services/navigationService.ts';
import InitialScreen from './src/screens/InitialScreen/InitialScreen.tsx';
import Navigation from './src/navigations/index.tsx';

const App = () => {
  LogBox.ignoreAllLogs();
  let persistor = persistStore(store);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer ref={navigationRef}>
              {/* <InitialScreen /> */}
              <Navigation />
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
