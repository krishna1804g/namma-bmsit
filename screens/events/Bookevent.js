import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const Bookevent = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { event } = route.params; // Access the passed event parameter

  const [bookingData, setBookingData] = useState({
    teamName: "",
    studentId: "",
    studentUsn: [],
    eventId: event.id
  })
  // State variables for team name and team members
  const [teamName, setTeamName] = useState("");
  const [teamLeader, setTeamLeader] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);

  // Function to add a new input box for team members
  const addTeamMemberInput = () => {
    setTeamMembers([...teamMembers, ""]);
  };

  // Function to update team member username
  const updateTeamMember = (index, username) => {
    const updatedTeamMembers = [...teamMembers];
    updatedTeamMembers[index] = username;
    setTeamMembers(updatedTeamMembers);
  };

  const handleBookEvent = () => {
    // Handle booking event here
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} style={styles.headerBackIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{event.title}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Input box for team name */}
        <Text style={styles.label}>PLEASE ENTER YOUR UNIQUE TEAM NAME</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Team Name"
            value={teamName}
            onChangeText={setTeamName}
          />
        </View>

        <Text style={styles.label}>PLEASE ENTER TEAM LEADER'S NAME</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Team Leader Name"
            value={teamLeader}
            onChangeText={setTeamLeader}
          />
        </View>

        {/* Button to add a new input box for team members */}
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.label}>
            PLEASE ADD YOUR {event.perTeamParticipants > 1 ? event.perTeamParticipants - 1 : 0} TEAM
            MEMBERS
          </Text>
          {teamMembers.length < event.perTeamParticipants - 1 && (
            <TouchableOpacity
              onPress={addTeamMemberInput}
              style={styles.addButton}
            >
              <Ionicons name="add-circle" size={24} style={styles.addIcon} />
            </TouchableOpacity>
          )}
        </View>

        {/* Input boxes for team members */}
        {teamMembers.map((member, index) => (
          <View key={index} style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Team Member Username"
              value={member}
              onChangeText={(username) => updateTeamMember(index, username)}
            />
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity onPress={handleBookEvent} style={styles.bookButton}>
        <Text style={styles.bookButtonText}>BOOK EVENT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Bookevent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    fontWeight: "bold",
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
  scrollViewContent: {
    flexGrow: 1,
    padding: 10,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputContainer: {
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
  },
  input: {
    paddingHorizontal: 10,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  addIcon: {
    marginLeft: 5,
  },
  bookButton: {
    backgroundColor: "#D9104C",
    borderRadius: 20,
    height: 35,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  bookButtonText: {
    fontSize: 20,
    color: "#fff",
  },
});
