/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AllCars from '../../pages/AllCars/AllCars';
import SoldOutCars from '../../pages/SoldOutCars/SoldOutCars';
import {Image} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddCar from '../../pages/AddCar/AddCar';
import ViewCar from '../../pages/ViewCar/ViewCar';
import UpdateCar from '../../pages/UpdateCar/UpdateCar';
import Profile from '../../pages/ProfilePage/Profile';
import Svg, {Path} from 'react-native-svg';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const FirstScreenNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AllCars"
        options={{headerShown: false}}
        component={AllCars}
      />
      {/* <Stack.Screen name="AddCar" component={AddCar} /> */}
      {/* <Stack.Screen name="ViewCar" component={ViewCar} /> */}
      <Stack.Screen name="UpdateCar" component={UpdateCar} />
    </Stack.Navigator>
  );
};
export default function MyTabs(props) {
  return (
    <Tab.Navigator
      barStyle={{backgroundColor: 'white'}}
      screenOptions={{
        tabBarActiveTintColor: '#F9532F',
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarStyle: [{display: 'flex'}],
      }}>
      <Tab.Screen
        name="FirstScreenNavigator"
        component={FirstScreenNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'All',
          tabBarIcon: ({color, size}) => (
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              xmlSpace="preserve"
              width={size}
              height={size}
              style={{
                enableBackground: 'new 0 0 122.88 92.02',
              }}
              viewBox="0 -15.43 122.88 122.88"
              {...props}>
              <Path
                fill={color}
                d="M10.17 34.23C-.81 28.65.45 22.43 11.48 23.08l2.47 4.63 5.09-15.83C21.04 5.65 24.37 0 30.9 0H96c6.53 0 10.29 5.54 11.87 11.87l3.82 15.35 2.2-4.14c11.34-.66 12.35 5.93.35 11.62l1.95 2.99c7.89 8.11 7.15 22.45 5.92 42.48v8.14c0 2.04-1.67 3.71-3.71 3.71h-15.83c-2.04 0-3.71-1.67-3.71-3.71v-4.54H24.04v4.54c0 2.04-1.67 3.71-3.71 3.71H4.5c-2.04 0-3.71-1.67-3.71-3.71V78.2c0-.2.02-.39.04-.58-1.2-15.37-2.89-35.47 9.34-43.39zM30.38 58.7l-14.06-1.77c-3.32-.37-4.21 1.03-3.08 3.89l1.52 3.69c.49.95 1.14 1.64 1.9 2.12.89.55 1.96.82 3.15.87l12.54.1c3.03-.01 4.34-1.22 3.39-4-.78-2.61-2.56-4.25-5.36-4.9zm24-5.91h14.4c.85 0 1.55.7 1.55 1.55 0 .85-.7 1.55-1.55 1.55h-14.4c-.85 0-1.55-.7-1.55-1.55-.01-.85.69-1.55 1.55-1.55zm35.58 20.36h14.4c.85 0 1.55.7 1.55 1.55 0 .85-.7 1.55-1.55 1.55h-14.4c-.85 0-1.55-.7-1.55-1.55 0-.85.69-1.55 1.55-1.55zM92.5 58.7l14.06-1.77c3.32-.37 4.21 1.03 3.08 3.89l-1.52 3.69c-.49.95-1.14 1.64-1.9 2.12-.89.55-1.96.82-3.15.87l-12.54.1c-3.03-.01-4.34-1.22-3.39-4 .78-2.61 2.56-4.25 5.36-4.9zM18.41 73.15h14.4c.85 0 1.55.7 1.55 1.55 0 .85-.7 1.55-1.55 1.55h-14.4c-.85 0-1.55-.7-1.55-1.55 0-.85.7-1.55 1.55-1.55zm.82-41.95h86.82l-3.83-15.92c-1.05-4.85-4.07-9.05-9.05-9.05H33.06c-4.97 0-7.52 4.31-9.05 9.05L19.23 31.2v.75-.75z"
                style={{
                  fillRule: 'evenodd',
                  clipRule: 'evenodd',
                }}
              />
            </Svg>
          ),
        }}
      />
      <Tab.Screen
        name="SoldOutCars"
        component={SoldOutCars}
        options={{
          headerShown: false,
          tabBarLabel: 'Sold Out',
          tabBarIcon: ({color, size}) => (
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width={size}
              height={size}
              viewBox="0 0 24 24"
              {...props}>
              <Path
                fill={color}
                fillRule="evenodd"
                d="M11.948 1.25h.104c.899 0 1.648 0 2.242.08.628.084 1.195.27 1.65.725.456.456.642 1.023.726 1.65.06.44.075.964.079 1.57.648.021 1.226.06 1.74.128 1.172.158 2.121.49 2.87 1.238.748.749 1.08 1.698 1.238 2.87.153 1.14.153 2.595.153 4.433v.112c0 1.838 0 3.294-.153 4.433-.158 1.172-.49 2.121-1.238 2.87-.749.748-1.698 1.08-2.87 1.238-1.14.153-2.595.153-4.433.153H9.944c-1.838 0-3.294 0-4.433-.153-1.172-.158-2.121-.49-2.87-1.238-.748-.749-1.08-1.698-1.238-2.87-.153-1.14-.153-2.595-.153-4.433v-.112c0-1.838 0-3.294.153-4.433.158-1.172.49-2.121 1.238-2.87.749-.748 1.698-1.08 2.87-1.238.514-.069 1.092-.107 1.74-.128.004-.606.02-1.13.079-1.57.084-.627.27-1.194.725-1.65.456-.455 1.023-.64 1.65-.725.595-.08 1.345-.08 2.243-.08ZM8.752 5.252c.378-.002.775-.002 1.192-.002h4.112c.417 0 .814 0 1.192.002-.004-.57-.018-1-.064-1.347-.063-.461-.17-.659-.3-.789-.13-.13-.328-.237-.79-.3-.482-.064-1.13-.066-2.094-.066s-1.612.002-2.095.067c-.461.062-.659.169-.789.3-.13.13-.237.327-.3.788-.046.346-.06.776-.064 1.347ZM5.71 6.89c-1.006.135-1.586.389-2.01.812-.422.423-.676 1.003-.811 2.009-.138 1.027-.14 2.382-.14 4.289 0 1.907.002 3.262.14 4.29.135 1.005.389 1.585.812 2.008.423.423 1.003.677 2.009.812 1.028.138 2.382.14 4.289.14h4c1.907 0 3.262-.002 4.29-.14 1.005-.135 1.585-.389 2.008-.812.423-.423.677-1.003.812-2.009.138-1.027.14-2.382.14-4.289 0-1.907-.002-3.261-.14-4.29-.135-1.005-.389-1.585-.812-2.008-.423-.423-1.003-.677-2.009-.812-1.027-.138-2.382-.14-4.289-.14h-4c-1.907 0-3.261.002-4.29.14ZM12 9.25a.75.75 0 0 1 .75.75v.01c1.089.274 2 1.133 2 2.323a.75.75 0 0 1-1.5 0c0-.384-.426-.916-1.25-.916-.824 0-1.25.532-1.25.916s.426.917 1.25.917c1.385 0 2.75.96 2.75 2.417 0 1.19-.911 2.048-2 2.323V18a.75.75 0 0 1-1.5 0v-.01c-1.089-.274-2-1.133-2-2.323a.75.75 0 0 1 1.5 0c0 .384.426.916 1.25.916.824 0 1.25-.532 1.25-.916s-.426-.917-1.25-.917c-1.385 0-2.75-.96-2.75-2.417 0-1.19.911-2.049 2-2.323V10a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
              />
            </Svg>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width={size}
              height={size}
              viewBox="-1 0 22 22"
              {...props}>
              <Path
                fill={color}
                fillRule="evenodd"
                d="M14 6c0-2.206-1.794-4-4-4S6 3.794 6 6s1.794 4 4 4 4-1.794 4-4Zm6 14h-5v-2h2.784c-.826-3.786-3.999-6-7.784-6-3.785 0-6.958 2.214-7.784 6H5v2H0c0-4.555 2.583-7.952 6.242-9.327A5.983 5.983 0 0 1 4 6a6 6 0 1 1 9.758 4.673C17.417 12.048 20 15.445 20 20Zm-9-2h2v2h-2v2H9v-2H7v-2h2v-2h2v2Z"
              />
            </Svg>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
