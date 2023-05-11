import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

// navigate
import PlaceStack from './src/navigate/PlaceStack';

export default function App() {
  return (
    <>
      <StatusBar style='auto' />
      <NavigationContainer>
        <PlaceStack />
      </NavigationContainer>
    </>
  );
}
