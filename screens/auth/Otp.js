import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScreenWidth } from "@rneui/themed/dist/config";
import { images } from "../../constants";

const Otp = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState(['', '', '', '']);
  const otpInputs = useRef([]);

  const handleOtpChange = (index, value) => {
    if (/^\d+$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value !== '' && index < otp.length - 1) {
        // Move focus to the next TextInput
        otpInputs.current[index + 1].focus();
      }
    }
  };

  const handleKeyPress = (index, key) => {
    if (key === 'Backspace' && otp[index] === '' && index > 0) {
      // Move focus to the previous TextInput on Backspace press
      otpInputs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join('');
    // Perform verification logic here with enteredOtp
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

        <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#808080" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder=" Email"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <TouchableOpacity style={styles.sendbutton} onPress={handleVerify}>
          <Text style={styles.LoginbuttonText}>Send</Text>
        </TouchableOpacity>
      </View>
        <View style={styles.otpContainer}>
          {otp.map((value, index) => (
            <TextInput
              ref={(ref) => (otpInputs.current[index] = ref)}
              key={index}
              style={styles.otpInput}
              keyboardType="numeric"
              maxLength={1}
              value={value}
              onChangeText={(text) => handleOtpChange(index, text)}
              onKeyPress={({ nativeEvent: { key } }) => handleKeyPress(index, key)}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleVerify}>
          <Text style={styles.LoginbuttonText}>Verify</Text>
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
    fontSize: 16,
    textDecorationLine: "underline"
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
    top: 250,
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginBottom: 100,
  },
  LoginbuttonText: {
    color: "white",
    fontSize: 18,
    textAlign: 'center',
    justifyContent: "center",
    alignContent: "center"
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    marginTop: 50,
    width: 200
  },
  otpContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  otpInput: {
    borderWidth: 1,
    borderRadius:10,
    borderColor: '#000',
    fontSize: 20,
    width: 50,
    height: 50,
    textAlign: 'center',
    marginHorizontal: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
    marginBottom: 10,
    marginTop: 20,
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
  sendbutton:{
    backgroundColor:"black",
    padding:5,
    borderRadius:10
  }
});

export default Otp;
