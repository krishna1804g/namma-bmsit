import React from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView, 
} from "react-native";
import {EventCard,Header,Heading,Wavebox,CarouselComponent, Search} from "../../components";
import { images,constants } from "../../constants";



const Home = ({ navigation }) => {
  

  return (
    <View style={styles.container}>
      <Header
        title="NAMMA BMSIT"
        showMenuIcon={true}
        showBellIcon={true}
        onMenuPress={() => navigation.openDrawer()}
        onBellPress={() => ""}
      />

      <ScrollView>
        <ImageBackground
          source={images.Home}
          style={styles.background}
          resizeMode="cover"
        ></ImageBackground>
        <Wavebox />

        {/* search bar */}
        <Search/>

        
        {/* //horizontalcarousel */}
        <Heading
          navigation={navigation}
          title="Events Pics :"
          showViewAllButton={false}
          destinationScreen="event"
        />
        <CarouselComponent data={constants.image} navigation={navigation} />


        {/* eventlisting */}
        <Heading
          navigation={navigation}
          title="UPCOMING EVENTS :"
          showViewAllButton={true}
          destinationScreen="event"
        />
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.container1}
        >
          <EventCard source={images.Event1} isImageBackground={true} />
          <EventCard source={images.Event2} isImageBackground={true} />
          <EventCard source={images.Event3} isImageBackground={true} />
          <EventCard source={images.Event4} />
          <EventCard source={images.Event5} />
          <EventCard source={images.Event6} />
          <EventCard source={images.Event7} />
        </ScrollView>
      </ScrollView>
    </View>
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
  container1: {
    height: 400,
    flex: 1,
  },
});

export default Home;
