import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Main from "./main";
import { Club, Events ,Help,Merchandise, Roadmap, Utsava} from "../../screens";
import CustomDrawer from "./customDrawer";




const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} /> }>
      <Drawer.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Event"
        component={Events}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Merchandise"
        component={Merchandise}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Club"
        component={Club}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Help"
        component={Help}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Roadmap"
        component={Roadmap}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({});
