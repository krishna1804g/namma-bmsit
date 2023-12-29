
import React from "react";
import { Home , Events, Profile} from "../../screens";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddEvents from "../../screens/events/addevents";



const Tab = createBottomTabNavigator();

const BottomNavigator = () => {

  return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}   />
        <Tab.Screen name="Add-Events" component={AddEvents} options={{ headerShown: false , tabBarIcon: ({ color, size }) => (
            <Ionicons name="happy-outline" color={color} size={size} />
          ),}} />
        <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false ,tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ), }} />
      </Tab.Navigator>
  );
};

export default BottomNavigator;


