// CarouselComponent.js

import React from 'react';
import { View, TouchableOpacity, Image, ScrollView,Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
//import styles from './yourStyles'; // Import your styles

const CarouselComponent = ({ data, navigation }) => {
    const windowWidth = Dimensions.get("window").width;
  
  return (
    <ScrollView style={styles.carouselcontainer1}>
      <View style={styles.carouselContainer}>
        <Carousel
          layout="default"
          data={data.slice(0, 10)}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("EventDetail", { item })}
              activeOpacity={0.8}
              style={styles.imageContainer}
            >
              <Image
                source={item}
                style={[styles.image2, { borderRadius: 20 }]}
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
          sliderWidth={windowWidth}
          itemWidth={windowWidth - 60}
          autoplay={true}
          autoplayInterval={2000}
          loop={true}
          enableMomentum={false}
          lockScrollWhileSnapping={true}
        />
      </View>
    </ScrollView>
  );
};

export default CarouselComponent;

const styles = StyleSheet.create({
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
})