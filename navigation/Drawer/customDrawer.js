import {
    View,
    Text,
    Image,
    StyleSheet,
    ImageBackground,
    ScrollView,
  } from "react-native";
  import React from "react";
  import { TouchableOpacity } from "react-native-gesture-handler";
  import { Ionicons } from "@expo/vector-icons";
  import { useNavigation } from "@react-navigation/native";
  import {useState, useEffect} from 'react'
  
  const CustomDrawer = () => {
    const [userData, setUserData] = useState([])
    const handelLogout = async () =>{
    //   try{
    //     const resp = await httpClient.post(`${uri}/logout`)
    //     console.log(resp.status)
    //     console.log(resp.headers)
    //     if(resp.status === 200){
    //       navigation.navigate('Login')
    //     }
    //     else
    //     {
    //       alert('Error logging out')
    //     }
    //   }catch(error){
    //     console.error(error.message)
    //   }
    }
  
    // fetching user info
    const userInfo = () =>{
    //   axios.get(`${uri}/@me`)
    //   .then(resp =>{
    //     const response = resp.data
    //     setUserData(response)
    //   })
    //   .catch(e=>{
    //     console.log(e)
    //   })
    }
  
    useEffect(() => {
      userInfo()
    }, [])
  
    const navigation = useNavigation();
    return (
      <View style={[styles.container]}>
        <View>
          <View style={[styles.backgroundColor]}>
            <TouchableOpacity>
              <Image
                source={require("../../assets/raghav.jpg")}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 60,
                  borderWidth: 2,
                  borderColor: "black",
                  left: 80,
                  marginTop: 40,
                }}
              />
            </TouchableOpacity>
  
            <Text style={[styles.headerText]}>RAGHAV KUMAR JHA</Text>
            <Text style={[styles.headerText2]}>1BY21IS124</Text>
          </View>
          <ScrollView>
            <TouchableOpacity onPress={() => navigation.navigate("Main")}>
              <View style={[styles.option]}>
                <Ionicons
                  name="home"
                  size={30}
                  color="black"
                  style={styles.icon}
                />
                <Text style={[styles.optiontext]}>HOMESCREEN</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Event")}>
              <View style={[styles.option]}>
                <Ionicons
                  name="megaphone"
                  size={30}
                  color="black"
                  style={styles.icon}
                />
                <Text style={[styles.optiontext]}>Events</Text>
              </View>
            </TouchableOpacity>
           
  
            <TouchableOpacity onPress={() => navigation.navigate("Merchandise")}>
              <View style={[styles.option]}>
                <Ionicons
                  name="shirt"
                  size={30}
                  color="black"
                  style={styles.icon}
                />
                <Text style={[styles.optiontext]}>MERCHANDISE</Text>
              </View>
            </TouchableOpacity>
  
            <TouchableOpacity onPress={() => navigation.navigate("Club")}>
              <View style={[styles.option]}>
                <Ionicons
                  name="people"
                  size={30}
                  color="black"
                  style={styles.icon}
                />
                <Text style={[styles.optiontext]}>CLUBS</Text>
              </View>
            </TouchableOpacity >
            <TouchableOpacity onPress={() => navigation.navigate("Roadmap")}>
              <View style={[styles.option]}>
                <Ionicons
                  name="locate-outline"
                  size={30}
                  color="black"
                  style={styles.icon}
                />
                <Text style={[styles.optiontext]}>ROAD MAP</Text>
              </View>
            </TouchableOpacity>
  
            <TouchableOpacity onPress={() => navigation.navigate("Help")}>
              <View style={[styles.option]}>
                <Ionicons
                  name="help-circle-outline"
                  size={30}
                  color="black"
                  style={styles.icon}
                />
                <Text style={[styles.optiontext]}>Need help?</Text>
              </View>
            </TouchableOpacity>
  
  
            <TouchableOpacity onPress={handelLogout}>
              <View
                style={[styles.option, { flexDirection: "row", marginTop: 100 }]}
              >
                <Ionicons
                  name="log-out"
                  size={30}
                  color="black"
                  style={styles.icon}
                />
                <Text
                  style={[
                    styles.optiontext,
                    { left: 10, fontSize: 20, fontWeight: "400" },
                  ]}
                >
                  LOGOUT
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      flex: 1,
      opacity: 1,
      borderWidth: 1,
    },
    backgroundColor: {
      backgroundColor: "grey",
      borderBottomEndRadius: 30,
      borderBottomLeftRadius: 30,
    },
    headerText: {
      fontSize: 24,
      color: "black",
      textDecorationLine: "underline",

      marginTop: 20,
      textAlign:"center"
    },
    headerText2: {
      fontSize: 24,
      color: "black",
      textDecorationLine: "underline",
      left: 70,
   
      bottom: 5,
    },
    option: {
      marginTop: 20,
      marginLeft: 20,
      marginRight: 20,
      height: 45,
      borderWidth: 1,
      borderRadius: 20,
      flexDirection: "row",
      textAlign:'center',
      alignContent:'center',
      backgroundColor: "lightgrey",
    },
    optiontext: {
  
      left: 20,
      fontSize: 17,
      top: 8,
    },
    icon: {
      textAlign: "right",
      left: 10,
      top: 5,
    },
  });
  
  export default CustomDrawer;
  