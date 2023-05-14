import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { init } from './src/utils/database';
// navigate
import PlaceStack from './src/navigate/PlaceStack';
import AppLoading from 'expo-app-loading';

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await init();
        setDbInitialized(true);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (!dbInitialized) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style='auto' />
      <NavigationContainer>
        <PlaceStack />
      </NavigationContainer>
    </>
  );
}
