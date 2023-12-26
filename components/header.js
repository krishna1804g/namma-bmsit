// Header.js

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import  MaskedView  from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

const Header = ({
  title,
  showMenuIcon,
  showBellIcon,
  onMenuPress,
  onBellPress,
}) => {
  return (
    <View style={styles.header}>
      {showMenuIcon && (
        <TouchableOpacity onPress={onMenuPress}>
          <Ionicons
            name="menu-outline"
            size={24}
            style={styles.headerMenuIcon}
          />
        </TouchableOpacity>
      )}

      <MaskedView
        maskElement={
          <Text
            style={[styles.headerTitle, { backgroundColor: "transparent" }]}
          >
            {title}
          </Text>
        }
      >
        <LinearGradient
          colors={["red", "#E6DA00"]}
          start={[0, 0]}
          end={[1, 1]}
          style={styles.yellowHeader}
        >
          <Text style={[styles.headerTitle, { opacity: 0 }]}>{title}</Text>
        </LinearGradient>
      </MaskedView>

      {showBellIcon && (
        <TouchableOpacity onPress={onBellPress}>
          <Ionicons
            name="notifications-outline"
            size={24}
            color="black"
            style={styles.notifications}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10 ,
    height: 90,
    backgroundColor: "#fff",
    elevation: 50,
  },
  headerTitle: {
    fontSize: 25,
    color: "#000",
    marginTop: 35,
    flex:1,
    justifyContent:"center",
    alignItems:"center",
  },
  headerMenuIcon: {
    color: "#000",
    top: 16,
    marginLeft: 20,
  },
  notifications: {
    right: 30,
    marginTop: 35,
  },
  yellowHeader: {
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    marginTop:20
  },
});
