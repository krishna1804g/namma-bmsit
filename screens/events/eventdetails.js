import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { uri } from "../../constants/globalvariable";

const EventDetails= () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { event } = route.params; // Access the passed event parameter
  const [isEventBooked, setIsEventBooked] = useState(false); // Track booking status

  const getAppliedEventsIds = () => {
    axios
      .get(`${uri}/get/participant/eventsIds`)
      .then((resp) => {
        const appliedEventIds = resp.data;
        if (appliedEventIds.includes(event.id)) {
          setIsEventBooked(true); // Set booked state if the event is in appliedEventIds
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    getAppliedEventsIds();
  }, []);

  const handleEventPress = (eventId) => {
    if (isEventBooked) {
      // Show an alert that the event is already booked
      alert("You have already booked this event.");
    } else {
      axios
        .post(`${uri}/apply/event`, {
          event_id: eventId,
        })
        .then((resp) => {
          console.log(resp.data);
          setIsEventBooked(true); // Update the booked state
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };
  return (
    <View style={{ marginBottom: 20 }}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={24} style={styles.headerBackIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{event.title}</Text>
      </View>
      <ScrollView style={{ marginBottom: 50}} showsVerticalScrollIndicator={false}>
        <View style={{backgroundColor:"white",width:"90%",alignSelf:"center",marginTop:20,borderRadius:20,elevation:10,marginBottom:20}}>
            <View
              style={{ backgroundColor: "white", marginTop: 20, borderRadius: 20 }}
            >
              <Image
                source={{ uri: event.imageUrl }}
                style={{
                  width: "90%",
                  height: 350,
                  marginTop: 20,
                  marginBottom: 20,
                  borderRadius: 20,
                  alignSelf: "center",
                }}
              />
            </View>
            {/* <Text style={styles.listdate}> MAIN COORDINATORS: RAGHAV KUMAR JHA </Text> */}
            <View style={{ flexDirection: "row", marginTop: 10, marginLeft: 10 }}>
              <Ionicons
                name="calendar"
                size={30}
                color="#D9104C"
                style={styles.icon}
              />
              <Text style={styles.listdate}>{event.dateOfEvent}</Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 10, marginLeft: 10 }}>
              <Ionicons name="time" size={30} color="#D9104C" style={styles.icon} />
              <Text style={styles.listdate}>{event.timeOfEvent}</Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 10, marginLeft: 10 }}>
              <Ionicons
                name="location"
                size={30}
                color="#D9104C"
                style={styles.icon}
              />
              <Text style={styles.listdate}>{event.location}</Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 10, marginLeft: 10 }}>
              <Ionicons
                name="wallet"
                size={30}
                color="#D9104C"
                style={styles.icon}
              />
              <Text style={styles.listdate}>{event.amount}</Text>
            </View>
            <Text style={styles.listdescrip}>EVENT DESCRIPTION:</Text>
            <View
              style={{
                width: "80%",
                backgroundColor: "white",
                alignSelf: "center",
                borderRadius: 15,
              }}
            >
              <Text style={{ padding: 10, fontSize:15, }}>{event.description}</Text>
            </View>
            <Text style={styles.listdescrip}> RULES AND REGULATION:</Text>
            <ScrollView
              style={{
                width: "90%",
                backgroundColor: "white",
                alignSelf: "center",
                borderRadius: 15,
                padding:5
              }}
            >
              <Text style={styles.text}>
                1.Collaboration is not encouraged and the prize money goes to the
                one winner of the event. We shall not be responsible for splitting
                winnings.
              </Text>
              <Text style={styles.text}>
                2. All participants must stay within the campus walls. The game
                shall not require participants to exit the campus for clues.
              </Text>
              <Text style={styles.text}>
                3. Participants are free to use mobiles to communicate with each
                other or look up solutions for technical puzzles or any other
                activity.
              </Text>
              <Text style={styles.text}>
                3. Participants are free to use mobiles to communicate with each
                other or look up solutions for technical puzzles or any other
                activity.
              </Text>
            
            </ScrollView>
            <TouchableOpacity
              style={{
                backgroundColor: "#D9104C",
                borderRadius: 20,
                height: 35,
                marginTop: 20,
                width: "80%",
                alignSelf: "center",
                marginBottom: 20,
              }}
              onPress={() => handleEventPress(event.id)}
            >
              <Text style={styles.book}>{isEventBooked ? "Booked" : "BOOK"}</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default EventDetails;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    height: 70,
    backgroundColor: "#fff",
    elevation: 4,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight:"bold",
    color: "#000",
    marginTop: 20,
    textAlign: "center",
    flex: 1,
  },
  headerBackIcon: {
    color: "#000",
    top: 12,
    left: 10,
  },
  listdate: {
    fontSize: 15,
    marginLeft: 20,
    top: 8,
  },
  listdescrip: {
    fontSize: 25,
    fontWeight:"bold",
    marginLeft: 20,
    textTransform: "capitalize",
    marginTop: 20,
  },
  book: {
    fontSize: 25,
    textAlign: "center",
    color: "#CFC7D9",
  },
  icon: {
    textAlign: "right",
    left: 10,
  },
  text:{
    padding:5,
    fontSize:15,
    marginTop:10,
    justifyContent:"center",
    alignSelf:"center" ,
    textAlign:"justify"
  }
});
