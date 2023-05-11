import React from 'react';

// navigate
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// constants
import { Colors } from '../constants/GlobalStyles';

// screen
import AllPlaces from '../screens/AllPlaces';
import AddPlace from '../screens/AddPlace';
import PlaceDetail from '../screens/PlaceDetail';
import Map from '../screens/Map';
import IconButton from '../components/UI/IconButton';

const Stack = createNativeStackNavigator();

export default function PlaceStack() {
  return (
    <Stack.Navigator
      initialRouteName='AllPlaces'
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: Colors.gray700,
        contentStyle: { backgroundColor: Colors.gray700 },
      }}
    >
      <Stack.Screen
        name='AllPlaces'
        component={AllPlaces}
        options={({ navigation }) => ({
          title: 'Your Favorite Places',
          headerRight: ({ tintColor }) => (
            <IconButton
              icon='add'
              color={tintColor}
              size={24}
              onPress={() => navigation.navigate('AddPlace')}
            />
          ),
        })}
      />
      <Stack.Screen name='PlaceDetail' component={PlaceDetail} />
      <Stack.Screen
        name='AddPlace'
        component={AddPlace}
        options={{
          title: 'Add a new Place',
        }}
      />
      <Stack.Screen name='Map' component={Map} />
    </Stack.Navigator>
  );
}
