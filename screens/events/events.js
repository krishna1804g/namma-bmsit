import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { 
  COLORS,
  FONTS,
  SIZES,
  dummyData
} from '../../constants'
import axios from "axios";
import url from '../../globalVariable/apiEndpoint'
import EventDetails from "./eventdetails";
import { useNavigation} from "@react-navigation/native";

const Events = () => {
  const navigation = useNavigation();
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedClub, setSelectedClub] = useState(null);
  const [allEvents, setAllEvents] = useState([]);
  const [allDeptEvents, setAllDeptEvents] = useState([]);
  const [allClubEvents, setAllClubEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [filterType, setFilterType] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleValueChange = (itemValue) => {
    setFilterType(itemValue);
  };

  const handleSearch = () => {
    const filtered = allEvents.filter(
      (event) =>
        event.title.toLowerCase().includes(searchText.toLowerCase()) ||
        event.dept.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  const handleFilterSelect = (type) => {
    setFilterType(type);
    setModalVisible(false);
  };

  const handleClearFilter = () => {
    setSelectedDepartment(null);
    setSelectedClub(null);
  };
  // Define a static event object
  

  // useEffect(() => {
  //   // 
  //   setAllEvents(event);
  //   setFilteredEvents(event);
  // }, []);

  const eventsDetail = () => {
    axios
      .get(`${url}/event/`)
      .then((resp) => {
        const response = resp.data;
        console.log(response);
        // if (Array.isArray(response)) {
        //   setAllDeptEvents(response);
        //   setFilteredEvents(response);
        // } else {
        //   const result = [resp.data];
        //   setAllDeptEvents(result);
        //   setFilteredEvents(result);
        // }
        setAllEvents(response.event);
        setFilteredEvents(response.event);
      })
      .catch((e) => {
        console.error(e);
      });
  };
  useEffect(() => {
    eventsDetail(); // Call the function eventsDetail() with parentheses to invoke it
  }, []);

  const handleEventPress = (event) => {
    navigation.navigate("EventDetails", { event }); // Navigate to EventDetailsScreen
  };

  const EventCard = ({ event}) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleEventPress(event)}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{ uri: event.imageUrl }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 15,
              borderWidth: 4,
              borderColor: "black",
            }}
          />
          <View
            style={{ flex: 1, justifyContent: "flex-start", marginLeft: 10 }}
          >
            <Text style={styles.listtitle}>{event.title}</Text>
            <Text style={styles.listdate}> Date: {event.dateOfEvent}</Text>
          </View>

          <TouchableOpacity
            style={styles.insidecard}
            onPress={() => handleEventPress(event)}
          >
            <Text style={styles.listregister}>{">"}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEventCard = ({ item }) => {
    return <EventCard event={item} />;
  };

  const handleRefresh = () => {
    setRefreshing(true);
    eventsDetail();
    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Ionicons
            name="menu-outline"
            size={24}
            style={styles.headerMenuIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>EVENTS</Text>
      </View>

      {/* //search bar */}

      {/* <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
      </View> */}
      {/* <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Filter Type</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleFilterSelect("department")}
            >
              <Text style={styles.modalButtonText}>Department</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleFilterSelect("club")}
            >
              <Text style={styles.modalButtonText}>Club</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}

      <View style={styles.container}>
        {/* {selectedEvent ? (
          <EventDetailsScreen event={selectedEvent} />
        ) : ( */}
          <FlatList
            data={filteredEvents}
            showsVerticalScrollIndicator={false}
            renderItem={renderEventCard}
            keyExtractor={(item,index) => index.toString()}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
          />
        {/* )} */}
      </View>
    </View>
  );
};

// Styles...

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
    ...FONTS.h2,
    color: "#000",

    marginTop: 20,
    right: 150,
  },
  headerMenuIcon: {
    color: "#000",
    top: 12,
    marginLeft: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#fff",
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#ccc",
    borderRadius: 8,
  },
  filterButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  modalButton: {
    paddingVertical: 8,
    marginBottom: 8,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007bff",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: "#E3E3E3",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  insidecard: {
    backgroundColor: "#D9104C",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  listtitle: {
    fontSize: 25,
    marginBottom: 10,
  },
  listdate: {
    fontSize: 15,
  },
  listdescrip: {
    fontSize: 12,
    marginLeft: 10,
    textAlign: "center",
  },
  listregister: {
    fontSize: 25,
    color: "#CFC7D9",
  },
});

export default Events;
