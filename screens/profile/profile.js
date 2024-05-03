import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const renderIcon = (text, iconName, color, index) => {
  let IconComponent = FontAwesome;
  if (iconName.startsWith("md-")) {
    IconComponent = MaterialIcons;
    iconName = iconName.slice(3);
  } else if (iconName.startsWith("mcm-")) {
    IconComponent = MaterialCommunityIcons;
    iconName = iconName.slice(4);
  }

  return (
    <TouchableOpacity
      key={index}
      style={styles.iconContainer}
      onPress={() => handleIconPress(index)}
    >
      <IconComponent name={iconName} size={50} color={color} />
      <Text style={styles.iconText}>{text}</Text>
    </TouchableOpacity>
  );
};

const Profile = () => {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {/* <StatusBar barStyle="light-content" backgroundColor="#94b49f" />
      <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <MaterialIcons name="account-circle" size={30} color="black" />
        <Text style={styles.title}>Profile</Text>
      </View>
    </View> */}
      <View style={styles.background}>
        <LinearGradient
          colors={["white", "black"]}
          start={[0, 0]}
          end={[1, 1]}
          style={styles.yellowHeader}
        >
          <View style={{ height: 20, right: 9, left: 35 }}>
            <View>
            <TouchableOpacity>
                <Image
                  source={require("../../assets/raghav.jpg")}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 60,
                    borderWidth: 2,
                    borderColor: "black",
                    left:100,
                    top:30
                  }}
                />
                </TouchableOpacity>
              <Text style={[styles.headerText]}>Raghav Kumar Jha</Text>
              <Text style={[styles.headerText2]}>1BY21IS124</Text>
              </View>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={["white", "#b8b8b8"]}
          start={[0, 0]}
          end={[1, 1]}
          style={styles.whiteContainer}
        >
          <ScrollView contentContainerStyle={styles.grid}>
            <View style={{ height: 20 }}></View>
            <View style={styles.iconRow}>
              {renderIcon("Friends", "users", "#FFC107", 0)}
              <View style={{ width: 20 }}></View>
              {renderIcon("Wallet", "money", "#9C27B0", 1)}
            </View>
            <View style={styles.iconRow}>
              {renderIcon(
                "Sessions",
                "mcm-calendar-check-outline",
                "#4CAF50",
                2
              )}
              <View style={{ width: 20 }}></View>
              {renderIcon(
                "Class Time Table",
                "mcm-calendar-clock",
                "#F44336",
                3
              )}
            </View>
            <View style={styles.iconRow}>
              {renderIcon("History", "history", "#2196F3", 4)}
              <View style={{ width: 20 }}></View>
              {renderIcon("Remarks", "home", "#FF9800", 5)}
            </View>
           
          </ScrollView>
          
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    box: {
        justifyContent: "space-between",
        backgroundColor: "#E0E0E0",
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
     //   marginVertical: 10,
        width: screenWidth - 60,
        borderColor:'black',
        borderWidth:2,
        elevation:5,
        marginBottom:15,
    
        
      },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 30,
    marginTop: 20,
  },
  menuContainer: {
    position: "absolute",
    right: 0,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
      
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 3,
  },
  menuItem: {
    paddingVertical: 5,
    paddingHorizontal: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: "black",
    justifyContent: "center",
    alignItems: "flex-start",
    width: 95,
  },
  menuText: {
    fontSize: 14,
    color: "#333333",
  },
  iconContainer: {
    height: screenHeight * 0.15,
    width: screenWidth * 0.3,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    elevation: 20,
    padding: 8,
    margin: 12,
    width: 120,
  },
  iconText: {
    fontSize: 18,
    color: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    backgroundColor: "whiteF",
  },
  yellowHeader: {
    flexDirection: "row",
    height: screenHeight / 4,
    //paddingTop: screenHeight*0.05,
  },
  headerText: {
    fontSize: 24,
    color: "black",
    textDecorationLine: "underline",
    left:50,
    marginTop:29
  },
  headerText2: {
    fontSize: 24,
    color: "black",
    textDecorationLine: "underline",
    left:90,
    bottom:5
  },

  whiteContainer: {
    position: "absolute",
    top: screenHeight / 3.3,
    bottom: 0,
    left: 18,
    right: 18,
    width: screenWidth - 36,
    borderColor:'black',
    // height: screenHeight / 1.3,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    transform: [{ translateY: -20 }],
    zIndex:1,
    borderWidth:1,
  },
  containerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  image: {
    height: 50,
    width: 50,
  },

  grid: {
    // flexDirection: 'row',
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
  },

  headerpic: {
    flexDirection: "row",
    paddingLeft: 10,
    justifyContent: "space-around",
  },
  container: {
    backgroundColor: '#94b49f',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  title: {
    color: 'black',
    fontSize: 20,
    marginLeft: 5,
  },
});



export default Profile;