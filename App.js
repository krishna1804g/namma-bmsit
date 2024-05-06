import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import AppNavigator from './navigation/Appnavigator'
import { Splash } from './screens';
import { AsyncStorage } from 'react-native';
import { isLoading, useFonts } from "expo-font";
import { LinearGradient } from 'expo-linear-gradient';
import { SIZES } from './constants';
import { scale } from 'react-native-size-matters';
import { StyleSheet } from 'react-native';


const gradientColors = ["#0019A1", "#000B48"];
const SplashScreen = () => (
  <LinearGradient colors={gradientColors} style={styles.container}>
    <View style={[styles.logoContainer]}>
      <Image
        source={{ uri: "../assets/Images/bms.png" }}
        style={styles.logo}
      />
    </View>
    {/* <View style={styles.textContainer}>
      <Text style={styles.text}>
        Chem{" "}
        <Text
          style={{ color: "green", fontStyle: "italic", fontWeight: "bold" }}
        >
          Square
        </Text>
      </Text>
    </View> */}
  </LinearGradient>
);



const App = () => {
  let [fontsLoaded] = useFonts({
    "Poppins-Black": require("./assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
  });

  useEffect(() => {
    // const checkLoginStatus = async () => {
    //   try {
    //     const user = await AsyncStorage.getItem("user");

    //     if (user) {
    //       const parsedUser = JSON.parse(user);
    //       setIsLoggedIn(true);
    //     }
    //   } catch (error) {
    //     console.error("Error retrieving data from AsyncStorage:", error);
    //     setIsLoading(false);
    //   } finally {
    //     setIsLoading(false);
    //     setSplashVisible(false);
    //   }
    // };

    // if (fontsLoaded) {
    //   checkLoginStatus();
    // }
  }, [fontsLoaded]);

  if (!fontsLoaded || isLoading) {
    return <AppNavigator/>;
  }
  return (
   <AppNavigator/>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    marginBottom: 0,
  },
  logo: {
    width: SIZES.radius * 25,
    height: SIZES.radius * 24,
  },
  textContainer: {
    flexDirection: "row",
    marginBottom: 50,
  },
  text: {
    fontSize: scale(26),
    marginTop: scale(5),
    color: "white",
    fontWeight: "bold",
  },
});

export default App