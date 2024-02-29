import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from './src/pages/Dashboard/Dashboard';
import MyTabs from './src/components/MyTabs/MyTabs';
import AddCar from './src/pages/AddCar/AddCar';
import ViewCar from './src/pages/ViewCar/ViewCar';
import UpdateCar from './src/pages/UpdateCar/UpdateCar';
import {Provider} from 'react-redux';
import store from './src/store';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Dashboard"
            options={{
              headerShown: false,
            }}
            component={Dashboard}
          />
          <Stack.Screen
            name="MyTabs"
            options={{headerShown: false}}
            component={MyTabs}
          />
          <Stack.Screen
            name="AddCar"
            options={{headerShown: false}}
            component={AddCar}
          />
          <Stack.Screen
            name="ViewCar"
            options={{headerShown: false}}
            component={ViewCar}
          />
          <Stack.Screen
            name="UpdateCar"
            options={{headerShown: false}}
            component={UpdateCar}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
export default App;
