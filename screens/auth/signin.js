
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScreenWidth } from "@rneui/themed/dist/config";
import {images} from "../../constants"
import axios from 'axios';
import url from '../../globalVariable/apiEndpoint'

const Signin = ({ navigation }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});


  const handleLogin = async () => {
    let formErrors = {};

    // Check if username or email is filled
    if (!usernameOrEmail) {
      formErrors.usernameOrEmail = "Username or email is required";
    }
    // Check if password is filled
    if (!password) {
      formErrors.password = "Password is required";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      try{
        const response = await axios.post(`${url}/student/signin`, {
          usernameOrEmail,
          password
        })
        console.log("data is there dwtgoib", response)
        if(response.status === 200 && response.data.data.isEmailVerified){
          console.log("ooh")
          navigation.navigate("Parent");
        }
        else if(response.status === 200 && !response.data.isEmailVerified){
          // otp code
        }
          
      } catch (error) {
        if(error.response && error.response.status === 409){
          alert("email already exists")
        }
        if(error.response.status === 500){
          alert("error signing up!")
        }
      }
    }
  };

  // handel forgot password
  const handleForgotPassword = () => {
    navigation.navigate("Otp");
  };

  // toggle pasword visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // redirect to register page
  const handleSignup = () => {
    navigation.navigate("Signup");
  };
  

  return (
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <ImageBackground
            source={images.two}
            style={styles.image}
          >
            <View style={styles.root}>
              <Image source={images.one} style={[styles.logo]} resizeMode="center"/>
            </View>
          </ImageBackground>
          <Text style={styles.heading}>
            --BMS Institute of Technology and Management--
          </Text>

          <View style={{width:350,alignItems:'center',top:40}}>
          <View style={styles.inputContainer}>
            <Icon name="user" size={20} color="#808080" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Username / Email"
              onChangeText={(text) => setUsernameOrEmail(text)}
              value={usernameOrEmail}
            />
          </View>
          {errors.usernameOrEmail && <Text style={styles.error}>{errors.usernameOrEmail}</Text>}
          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="#808080" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Icon
                name={isPasswordVisible ? 'eye-slash' : 'eye'}
                size={20}
                color="#808080"
                style={styles.passwordIcon}
              />
            </TouchableOpacity>
          </View>
          {errors.password && <Text style={styles.error}>{errors.password}</Text>}
        </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.LoginbuttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleForgotPassword}style={{marginTop:20}}>
            <Text style={styles.forgotPassword}>
              Forgot Password? Click here
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSignup}>
            <Text style={styles.forgotPassword}>
              New User? Click here
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
   
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
    height: 350,
    width: 500,
    flexWrap: "wrap",
  },
  heading: {
   //fontWeight: "800",
    marginTop: 100,
    
    fontSize:16,
    textDecorationLine:"underline"
  },
  root: {
    paddingBottom: 150,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6.84,
    elevation: 50,
  },
  logo: {
    width: 200,
    height: 200,
    marginLeft: 150,
    borderColor: "black",
    borderRadius: 100,
   
    top:250,
    

    
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginBottom: 100,
  },
  LoginbuttonText: {
    color: "white",
    fontSize: 18,
    textAlign:'center',
    justifyContent:"center",
    alignContent:"center"
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    marginTop:50,
    width:200
  },
  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
    marginBottom: 10,
    width:ScreenWidth/1.2,
    
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#000000',
  },
  error: {
    color: "red",
    marginBottom: 5,
    alignItems: "flex-start"
  },
});

export default Signin;
