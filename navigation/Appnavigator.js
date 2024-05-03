import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import {Splash,Signin, Parent, Events, Signup, Otp, EventDetails, AddEvents, Bookevent} from "../screens";
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <BottomSheetModalProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="splash"
            component={Splash}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signin"
            component={Signin}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Otp"
            component={Otp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Parent"
            component={Parent}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Event"
            component={Events}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EventDetails"
            component={EventDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddEvents"
            component={AddEvents}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BookEvents"
            component={Bookevent}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </BottomSheetModalProvider>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
