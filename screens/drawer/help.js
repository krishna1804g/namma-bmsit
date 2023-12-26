import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Header } from "../../components";
import { images } from "../../constants";

const Help = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: "lightgrey", flex: 1 }}>
      <Header
        title="DEVELOPER"
        showMenuIcon={true}
        showBellIcon={true}
        onMenuPress={() => navigation.openDrawer()}
        onBellPress={() => ""}
      />

      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={images.raghav} style={styles.image} />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>Raghav Kumar Jha</Text>
          <Text style={styles.jobTitle}>ISE</Text>
          <Text style={styles.email}>e55@bmsit.in</Text>
          <Text style={styles.phone}>7667472706</Text>
          <View style={styles.linksContainer}>
            <TouchableOpacity
              style={styles.link}
              onPress={() => console.log("Opening Instagram profile")}
            >
              <Text style={styles.linkText}>Instagram</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.link}
              onPress={() => console.log("Opening Facebook profile")}
            >
              <Text style={styles.linkText}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.link}
              onPress={() => console.log("Opening LinkedIn profile")}
            >
              <Text style={styles.linkText}>LinkedIn</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={images.krishna} style={styles.image} />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>Krishna Gupta</Text>
          <Text style={styles.jobTitle}>ISE</Text>
          <Text style={styles.email}>e55@bmsit.in</Text>
          <Text style={styles.phone}>7803024843</Text>
          <View style={styles.linksContainer}>
            <TouchableOpacity
              style={styles.link}
              onPress={() => console.log("Opening Instagram profile")}
            >
              <Text style={styles.linkText}>Instagram</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.link}
              onPress={() => console.log("Opening Facebook profile")}
            >
              <Text style={styles.linkText}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.link}
              onPress={() => console.log("Opening LinkedIn profile")}
            >
              <Text style={styles.linkText}>LinkedIn</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

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
    color: "#000",
  
    marginTop: 20,
  },
  headerMenuIcon: {
    color: "#000",
    top: 12,
    marginLeft: 20,
  },
  yellowHeader1: {
    textAlign: "center",
    marginTop: -2,
    marginRight: 100,
  },
  card: {
    flexDirection: "row",
    top: 10,
    margin: 10,
    padding: 10,
    backgroundColor: "#4A4A4A",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 20,
  },
  imageContainer: {
    marginTop: 10,
    marginRight: 10,
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: "hidden",
    borderColor: "grey",
    borderWidth: 2,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 20,
    color: "white",
   
  },
  jobTitle: {
    fontSize: 16,
    color: "white",
   
  },
  email: {
    fontSize: 16,
    color: "white",
   
  },
  phone: {
    fontSize: 16,
    color: "white",
    
  },
  linksContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  link: {
    marginRight: 10,
    backgroundColor: "grey",
    borderRadius: 5,
    padding: 5,
  },
  linkText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Help;
