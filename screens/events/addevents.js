import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator 
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import axios from 'axios';
import url from '../../globalVariable/apiEndpoint'

const AddEvents = ({ navigation }) => {
  const [posters, setPosters] = useState([require("../../assets/Images/bms.png")]);
  const [animation] = useState(new Animated.Value(0));
  const [showAddPick, setShowAddPick] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [title, setTitle] = useState("");
  // const [venue, setVenue] = useState("");
  // const [price, setPrice] = useState("");
  // const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [userData, setUserData] = useState([])

  const [addEventData, setAddEventdata] = useState({

    title: "",
    imageUrl: "",
    location: "",
    amount: 0,
    description: "",
    dateOfEvent: "",
    timeOfEvent: "",
    duration: 0,
    freeEvent: true,
    totalParticipants: 0,
    perTeamParticipants: 1

  })

  /*
  id                      String        @id @default(uuid())
  categoryType            String? // e.g, academic, dept, clubs, fest etc, this can be tags
  **description             String        @db.VarChar(500)
  **title                   String        @unique(map: "Title")
  **duration                Int? // in hours
  **location                String?
  ** locationDetails         String? // additional details for location
  **dateOfEvent             DateTime?
  **timeOfEvent             DateTime?
  **freeEvent               Boolean?
  **amount                  Int?
  **totalParticipants       Int?          @db.MediumInt() // total event participants
  **perTeamParticipants     Int?          @default(1) @db.TinyInt()
  requirements            String? //any prerequisites or materials required
  status                  String? // upcomming, ongoing or past
  */


  const handleAddEvent = async () => {
    // Perform event creation logic here
    console.log("Event added!", addEventData);
    try{
        const response = await axios.post(`${url}/event/`, {
        addEventData
      })
      console.log(response.data)
      if(response.status === 201){
        alert("Event Created!")
        setAddEventdata({
          title: "",
          imageUrl: "",
          location: "",
          amount: 0,
          description: "",
          dateOfEvent: "",
          timeOfEvent: "",
          duration: 0,
          freeEvent: true,
          totalParticipants: 0,
          perTeamParticipants: 1
        })
      }
    } catch(error){
      if(error.response && error.response.status === 400){
        alert("Event title and description required")
      }else if(error.response && error.response.status === 409){
        console.log("going")
        alert("Event title already exists")
      }else if(error.response && error.response.status === 500){
        alert('Internal server error')
      }else{
        console.error(error)
      }
    }
  };


  // fetching user info
  // const userInfo = () =>{
  //   axios.get(`${uri}/@me`)
  //   .then(resp =>{
  //     const response = resp.data
  //     setUserData(response)
  //   })
  //   .catch(e=>{
  //     console.log(e)
  //   })
  // }

  // useEffect(() => {
  //   userInfo()
  // }, [])



  //date and time

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    // setSelectedDate(date.toISOString().split("T")[0]);
    handleInputChange("dateOfEvent", date.toISOString().split("T")[0])
    hideDatePicker();
  };

  const handleTimeConfirm = (time) => {
    handleInputChange("timeOfEvent", time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
    hideTimePicker();
  };


  //description
  const handleDescriptionChange = (text) => {
    setDescription(text);
  };


  //  {/* amount and  participant */}

  const [eventType, setEventType] = useState("");
  // const [amount, setAmount] = useState(0);
  const [eventMode, setEventMode] = useState("");
  const [participants, setParticipants] = useState("");

  const handleEventTypeChange = (value) => {
    setEventType(value);
  };

  const handleAmountChange = (value) => {
    setAmount(value);
  };

  const handleEventModeChange = (value) => {
    setEventMode(value);
  };
  const handelPartipantChange = (value) => {
    setParticipants(value);
  };

  // handel input change
  const handleInputChange = (key, value) => {
    setAddEventdata({
      ...addEventData,
      [key]: value
    })
  }


  //image picker
  const handleImageSelect = async () => {
    setIsLoading(true);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission denied.");
      return;
    }
  
    try {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
    setIsLoading(true);

        const formData = new FormData();
        formData.append('file', {
          uri: selectedAsset.uri,
          type: 'image/jpeg',
          name: 'image.jpg',
        });
        formData.append('upload_preset', 'event_management_app'); // Replace with your Cloudinary upload preset
  
        // Make a POST request to Cloudinary upload endpoint
        const response = await axios.post('https://api.cloudinary.com/v1_1/kreventapp/image/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        // Check if the upload was successful
        if (response.status === 200) {
          console.log('Image uploaded successfully:', response.data.secure_url);
          handleInputChange("imageUrl", response.data.secure_url)
        } else {
          console.log('Image upload failed:', response.statusText);
          alert("Error uploading image")
        }
      }
    } catch (error) {
      console.log("Error selecting image:", error);
    }finally {
      setIsLoading(false); // Hide loader when image selection process completes
    }
  };
  

//ye animation ke liye use kiye hai 
  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      setShowAddPick(true);
    });
  }, []);


  const interpolatedTranslateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -100], //  animation distance
  });


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
      {/* Loader */}
      {isLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="black" />
          <Text style={styles.loaderText}>Uploading image...</Text>
        </View>
      )}
    </View>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons
            name="chevron-back-outline"
            size={24}
            style={styles.headerMenuIcon}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ marginBottom: 35 }}>
        <View style={styles.container}>
          {addEventData.imageUrl ? (
            <Image
              source={{ uri: addEventData.imageUrl }}
              style={styles.posterImage}
              resizeMode="contain"
            />
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginHorizontal: 22, marginTop: 10 }}
            >
              {posters.map((poster, index) => (
                <Image
                  key={index}
                  source={poster}
                  style={styles.posterImage}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>
          )}

          {/* Add Image Button */}

          <Animated.View style={{ transform: [{ translateX: interpolatedTranslateX }] }}>
      <TouchableOpacity onPress={handleImageSelect} style={styles.addImageButton}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </Animated.View>

          {showAddPick && <Text style={{ top:-40,left:10,color:"red"}} >CLICK TO ADD POSTER</Text>}
          
          
          
          
          <View
            style={{
              backgroundColor: "transparent",
              borderRadius: 20,
              justifyContent: "center",
              alignContent: "center",
              alignSelf: "center",
              paddingLeft: 15,
            }}
          >
            <Text
              style={{
                marginTop: 50,
             
                fontSize: 20,
              }}
            >
              Event Title :
            </Text>
            <TextInput
              style={[styles.input, { borderBottomWidth: 1, width: 300 }]}
              placeholder=""
              value={addEventData.title}
              onChangeText={(text) => handleInputChange("title", text)}
            />

            
            {/* date time  */}
            <View
              style={[
                styles.datetimecontainer,
                {
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginHorizontal: 65,
                },
              ]}
            >
              <Text style={{ left: 25, fontSize: 20 }}>
                Date :
              </Text>
              <View style={styles.daterow}>
                <TextInput
                  style={[styles.dateinput]}
                  placeholder="Select date" 
                  value={addEventData.dateOfEvent}
                  editable={false}
                />
                <TouchableOpacity onPress={showDatePicker}>
                  <MaterialIcons name="date-range" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <Text style={{ left: 90,  fontSize: 20 }}>
                Time :
              </Text>
              <View style={styles.timerow}>
                <TextInput
                  style={styles.dateinput}
                  placeholder="Select time"
                  value={addEventData.timeOfEvent}
                  editable={false}
                />
                <TouchableOpacity onPress={showTimePicker}>
                  <MaterialIcons name="access-time" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
              />
              <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleTimeConfirm}
                onCancel={hideTimePicker}
              />
            </View>
            <View>
                    <Text style={styles.label}>Event Duration:</Text>
                    <TextInput
                      style={styles.input2}
                      value={addEventData.duration}
                      onChangeText={(text) => handleInputChange("duration", Number(text))}
                      placeholder="duration (in hrs)"
                      keyboardType="numeric"
                    />
                  </View>
            {/* amount and mode */}

            <Text style={styles.label}>Event Type:</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.button2,
                  addEventData.freeEvent  && styles.activeButton,
                ]}
                onPress={() => handleInputChange("freeEvent", true)}
              >
                <Text style={styles.buttonText2}>Free</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button2,
                  !addEventData.freeEvent && styles.activeButton,
                ]}
                onPress={() => handleInputChange("freeEvent", false)}
              >
                <Text style={styles.buttonText2}>Paid</Text>
              </TouchableOpacity>
            </View>

            {!addEventData.freeEvent && (
                  <View>
                    <Text style={styles.label}>Amount:</Text>
                    <TextInput
                      style={styles.input2}
                      value={addEventData.amount}
                      onChangeText={(text) => handleInputChange("amount", Number(text))}
                      placeholder="Enter Amount"
                      keyboardType="numeric"
                    />
                  </View>
                )}

                <Text style={styles.label}>Event Mode:</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[
                      styles.button2,
                      eventMode === "Individual" && styles.activeButton,
                    ]}
                    onPress={() => handleEventModeChange("Individual")}
                  >
                    <Text style={styles.buttonText2}>Individual</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.button2,
                      eventMode === "Group" && styles.activeButton,
                    ]}
                    onPress={() => handleEventModeChange("Group")}
                  >
                    <Text style={styles.buttonText2}>Group</Text>
                  </TouchableOpacity>
                </View>
                {eventMode === "Group" && (
                  <View>
                    <Text style={styles.label}>Total number of participants:</Text>
                    <TextInput
                      style={styles.input2}
                      value={addEventData.totalParticipants}
                      onChangeText={ text => handleInputChange("totalParticipants", Number(text)) }
                      placeholder="Enter total number of participants"
                      keyboardType="numeric"
                    />
                    <Text style={styles.label}>Per-team participants:</Text>
                    <TextInput
                      style={styles.input2}
                      value={addEventData.perTeamParticipants}
                      onChangeText={ text => handleInputChange("perTeamParticipants", Number(text)) }
                      placeholder="Enter per-team participants"
                      keyboardType="numeric"
                    />
                  </View>     
                )}
              
           

            {/* Venue */}
            <Text
              style={{
                marginTop: 20,
                fontSize: 20,
              }}
            >
              Venue :
            </Text>
            <TextInput
              style={[styles.input, { borderBottomWidth: 1, width: 300 }]}
              placeholder=""
              value={addEventData.location}
              onChangeText={(text) => handleInputChange("location", text)}
            />

            {/* description */}
            <Text
              style={{
             
                fontSize: 20,
                marginTop: 20,
              }}
            >
              Event Description :
            </Text>
            <TextInput
              style={styles.descriptioninput}
              placeholder="Describe events in few lines for push notifications"
              value={addEventData.description}
              onChangeText={(text) => handleInputChange("description", text)}
              multiline
              numberOfLines={5}
            />
            <TouchableOpacity style={styles.button} onPress={handleAddEvent}>
              <Text style={styles.buttonText}>Create Event</Text>
            </TouchableOpacity>

            <Text style={{color:"green",textAlign:"center"}}>*Event Created By:-{userData.email}</Text>
          </View>
        </View>
      </ScrollView>
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    paddingTop: 20,
  },

  headerMenuIcon: {
    color: "#000",
    top: 16,
    marginLeft: 20,
  },

  posterImage: {
    width: 300,
    height: 400,
    marginBottom: 20,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "black",
  },
  input: {
    height: 40,
    borderColor: "black",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#F15350",
    padding: 10,
    borderRadius: 5,
    marginBottom: 25,
    width: 300,
    borderRadius: 20,
    marginTop: 20,
    left: 15,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  
  },

  datetimecontainer: {
    justifyContent: "space-around",
    marginHorizontal: 50,
    right: 50,
  },
  daterow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    right: 15,
    marginTop: 30,
  },
  timerow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 16,
    left: 50,
    marginTop: 30,
  },
  dateinput: {
    height: 40,
    paddingHorizontal: 8,
    backgroundColor: "white",
    borderRadius: 20,
    width: 135,
    elevation: 10,
    justifyContent: "space-around",
    left: 35,
  },
  descriptioninput: {
    height: 150,
    borderWidth: 1,
    borderColor: "#ccc",
    textAlignVertical: "top",
    width: 320,
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 10,
    marginTop: 10,
    padding: 10,
  },
  // amount
  label: {
   
    fontSize: 20,
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 8,
    borderRadius: 20,
  },
  button2: {
    flex: 1,
    marginRight: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  activeButton: {
    borderColor: "blue",
    backgroundColor: "#F15350",
    borderRadius: 20,
  },
  buttonText2: {
    fontSize: 14,
   
  },
  selectedContainer: {
    marginTop: 6,
  },
  selectedText: {
    fontSize: 16,
    color: "transparent",
  },
  input2: {
    marginTop: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 20,
  },
  addImageButton: {
    // position: 'absolute',
    // bottom: 20,
    // right: 20,
    backgroundColor: '#F15350',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    position: 'absolute',
    top: '50',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: 50 }],
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 10,
    color: 'black',
  },
};

export default AddEvents;
