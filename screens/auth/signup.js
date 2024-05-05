
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

const Signup = ({ navigation }) => {
  // const [userResp, setUserResp] = useState("");
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      userName: "",
      usn : "",
      department: "",
      semester  : "",
      phoneNo : "",
      email: "",
      password: ""
  })
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({})

  const handleInputChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value
    })

    setErrors({
      ...errors,
      [key]: ""
    })
  }

  // Handle user registration
  const handleSignup = async () => {
    let formErrors = {};

    // check firstName
    if(!formData.firstName){
      formErrors.firstName = "First name is required";
    }

    // check lastName
    if(!formData.lastName){
      formErrors.lastName = "Last name is required";
    }

    // contact number
    if(!formData.phoneNo){
      formErrors.phoneNo = "Contact number is required"
    }else if(!isValidContactNo(formData.phoneNo)){
      formErrors.phoneNo = "Not a valid contact number"
    }

    // usn
    if(!formData.usn){
      formErrors.usn = "Usn required"
    }

    // department
    if(!formData.department){
      formErrors.department = "Department required"
    }
    
    // semester
    if(!formData.semester){
      formErrors.semester = "Semester required"
    }

    // email
    if(!formData.email){
      formErrors.email = "Email required"
    } else if (!isValidEmail(formData.email)){
      formErrors.email = "please enter bmsit official email"
    }

    // username
    if(!formData.userName){
      formErrors.userName = "Username required"
    } else{
      try{
        const isUsernameValid = await isValidUsername(formData.userName)
        if(!isUsernameValid)
          formErrors.userName = "Username should be unique"
      } catch (error) {
        console.error("Error checking username:", error)

      }
    }

    // password
    if(!formData.password){
      formErrors.password = "password required"
    }else if (!isValidPassword(formData.password)){
      formErrors.password = "Password must contain at least 8 characters, including uppercase, lowercase, and numbers"
    }

    // Send formData to backend for registration
    console.log(formData);

    if(Object.keys(formErrors).length > 0){
      setErrors(formErrors)
    } else {
      formData.phoneNo = Number(formData.phoneNo)
      formData.semester = Number(formData.semester)
      try{
        const response = await axios.post(`${url}/student/signup`, {
          formData
        })
        console.log(response.data)
        if(response.status === 201){
          handleSignin()
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

  // check for valid email
  const isValidEmail = (email) => {
    // Basic email validation regex
    const emailRegex =  /^[^\s@]+@(?:bmsit\.in|BMSIT\.IN)$/; 
    return emailRegex.test(email);
  };

  // check for valid password
  const isValidPassword = (password) => {
    // Password must contain at least 8 characters, including uppercase, lowercase, and numbers
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return passwordRegex.test(password);
  };

  // check username
  const isValidUsername = async (username) => {
    try {
      const response = await axios.post(`${url}/student/checkUsername`, {
        username: username
      })
      console.log(response.data)
      return response.status === 200
    } catch(error){
       if (error.response.status === 400) {
      // Username is not unique
      return false;
    } else {
      // Other error occurred, log and rethrow
      console.error("Error checking username:", error);
      throw error;
    }
    }
  }

  // check phone number
  const isValidContactNo = (contactNo) => {
    const contactNoRegex = /^\d{10}$/;
    return contactNoRegex.test(Number(contactNo));
  }

  // toggle pasword visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // redirect to register page
  const handleSignin = () => {
    navigation.navigate("Signin");
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
          placeholder="First Name"
          onChangeText={(text) => handleInputChange("firstName", text)}
          value={formData.firstName}
        />
      </View>
      {errors.firstName && <Text style={ styles.error } > { errors.firstName } </Text>}

      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#808080" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          onChangeText={(text) => handleInputChange("lastName", text)}
          value={formData.lastName}
        />
      </View>
      {errors.lastName && <Text style={ styles.error } > { errors.lastName } </Text>}

      <View style={styles.inputContainer}>
        <Icon name="phone" size={20} color="#808080" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Contact number"
          onChangeText={(text) => handleInputChange("phoneNo", text)}
          value={formData.phoneNo}
        />
      </View>
      {errors.phoneNo && <Text style={ styles.error } > { errors.phoneNo } </Text>}

      <View style={styles.inputContainer}>
        <Icon name="hashtag" size={20} color="#808080" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Usn"
          onChangeText={(text) => handleInputChange("usn", text)}
          value={formData.usn}
        />
      </View>
      {errors.usn && <Text style={ styles.error } > { errors.usn } </Text>}

      <View style={styles.inputContainer}>
        <Icon name="building" size={20} color="#808080" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Department"
          onChangeText={(text) => handleInputChange("department", text)}
          value={formData.department}
        />
      </View>
      {errors.department && <Text style={ styles.error } > { errors.department } </Text>}

      <View style={styles.inputContainer}>
        <Icon name="graduation-cap" size={20} color="#808080" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Semester"
          onChangeText={(text) => handleInputChange("semester", text)}
          value={formData.semester}
        />
      </View>
      {errors.semester && <Text style={ styles.error } > { errors.semester } </Text>}

      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="#808080" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => handleInputChange("email", text)}
          value={formData.email}
        />
      </View>
      {errors.email && <Text style={ styles.error } > { errors.email } </Text>}

      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#808080" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(text) => handleInputChange("userName", text)}
          value={formData.userName}
        />
      </View>
      {errors.userName && <Text style={ styles.error } > { errors.userName } </Text>}

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#808080" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => handleInputChange("password", text)}
          value={formData.password}
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
      {errors.password && <Text style={ styles.error } > { errors.password } </Text>}

    </View>
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.LoginbuttonText}>Login</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPassword}>
              Forgot Password? Click here
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={handleSignin} style={{marginTop:20}}>
            <Text style={styles.forgotPassword}>
              Already User? Click here
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

export default Signup;
