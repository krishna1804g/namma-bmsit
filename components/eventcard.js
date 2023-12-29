import React from 'react';
import { TouchableOpacity, ImageBackground, Image, Text ,StyleSheet } from 'react-native';

const EventCard = ({ source, isImageBackground = false }) => {
  return (
    <TouchableOpacity style={styles.box}>
      {isImageBackground ? (
        <ImageBackground
          source={source}
          style={styles.image}
          resizeMode="cover"
          borderRadius={20}
        >
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Interested!!</Text>
          </TouchableOpacity>
        </ImageBackground>
      ) : (
        <Image source={source} style={styles.image} resizeMode="cover" />
      )}
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 2,
      top: -20,
    },
    background: {
      flex: 1,
      justifyContent: "center",
      height: 250,
      width: 500,
      flexWrap: "wrap",
    },
    wavebox: {
      backgroundColor: "#241E20",
      height: 50,
      elevation:30
    },
    topWavy: {
      bottom: 20,
      borderWidth:10,
      elevation:10
    },
  
    searchcontainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#f1f1f1",
      borderRadius: 20,
      paddingHorizontal: 10,
      marginHorizontal: 20,
      marginTop: 20,
      borderWidth: 1,
      elevation: 20,
      marginTop: 100,
    },
    searchIcon: {
      marginRight: 10,
    },
    notifications:{
      right:20,
      marginTop:35,
    },
    searchInput: {
      flex: 1,
      color: "#333",
      fontSize: 16,
      paddingVertical: 10,
    },
    clearIcon: {
      marginLeft: 10,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: 10,
      height: 90,
      backgroundColor: "#fff",
      elevation: 50,
    },
    headerTitle: {
      fontSize: 25,
      color: "#000",
      marginTop: 28,
      paddingLeft: 70,
    },
    headerMenuIcon: {
      color: "#000",
      top: 16,
      marginLeft: 20,
    },
    title: {
      paddingBottom: 10,
      paddingTop: 85,
      paddingLeft: 5,
      fontSize: 26,

      justifyContent: "flex-start",
    },
    title2: {
      paddingTop: 50,
      paddingLeft: 20,
      fontSize: 26,
      color: "#000",
      justifyContent: "flex-start",
    },
    container1: {
      height: 400,
      flex: 1,
    },
    heading: {
      flexDirection: "row",
      justifyContent:'space-around',
      right:10
    },
    Viewall: {
      marginTop:90,
      right:10,
      color: "blue",
      
      fontSize: 15,
      backgroundColor:'white',
      borderRadius:20,
      width:60,
      textAlign:'center'
    },
    box: {
      width: 200,
      height: 300,
      margin: 10,
      backgroundColor: "#ccc",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 20,
      elevation: 20,
      borderWidth: 1,
    },
    image: {
      height: "100%",
      width: "100%",
      resizeMode: "cover",
      borderRadius: 20,
    },
    text: {
      color: "#fff",
      fontWeight: "bold",
    },
    yellowHeader: {
      //flexDirection: "row",
      //paddingTop: screenHeight*0.05,
  
      textAlign: "center",
      marginTop: -5,
      marginRight:90
    },
    
    carouselcontainer1: {
      flex: 1,
      backgroundColor: "#241E20",
      height: 320,
    },
    carouselContainer: {
      height: 300,
      marginTop: 10,
      backgroundColor: "#201E10",
    },
    imageContainer: {
      flex: 1,
      borderRadius: 20,
      overflow: "hidden",
      borderWidth: 2,
      resizeMode: "cover",
    },
    image2: {
      flex: 1,
      height: "100%",
      width: "100%",
      resizeMode: "cover",
    },
    imageOverlay: {
      backgroundColor: "transparent",
      padding: 10,
      borderRadius: 20,
    },
    imageTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#fff",
      textAlign: "center",
      textShadowColor: "rgba(0, 0, 0, 0.75)",
      textShadowOffset: { width: -1, height: 1 },
      textShadowRadius: 10,
    },
    button: {
      backgroundColor: 'grey',
      paddingVertical: 0,
      paddingHorizontal: 20,
      borderRadius:10,
      top:300,
      left:20,
      width:150,
      height:30,
      
    },
    buttonText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff',
      textAlign:'center'
    },
  });
  
export default EventCard;
