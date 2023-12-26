import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

const Heading = ({navigation, title, destinationScreen ,showViewAllButton }) => {

    const onPressViewAll = () => {
        navigation.navigate(destinationScreen);
      };
 return (
    <View style={[styles.heading]}>
      <MaskedView
        maskElement={
          <Text style={[styles.title, { backgroundColor: 'transparent' }]}>
            {title}
          </Text>
        }
      >
        <LinearGradient
          colors={['red', 'purple']}
          start={[0, 0]}
          end={[1, 1]}
          style={styles.PurpleHeader}
        >
          <Text style={[styles.title, { opacity: 0 }]}>{title}</Text>
        </LinearGradient>
      </MaskedView>
      {showViewAllButton && (
        <TouchableOpacity onPress={onPressViewAll}>
          <Text style={styles.Viewall}>view all</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({
heading: {
    flexDirection: "row",
    left: 10,
  },
  Viewall: {
    justifyContent:"flex-end",
    marginTop: 90,
    top:3,
    left: 25,
    color: "blue",
    fontFamily: "Roboto6",
    fontSize: 15,
    backgroundColor: "white",
    borderRadius: 20,
    width: 60,
    textAlign: "center",
  },
  title: {
    paddingBottom: 10,
    paddingTop: 85,
    paddingLeft: 5,
    fontSize: 26,
    justifyContent: "flex-start",
  },
})