import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Animated,
  ActivityIndicator
} from 'react-native';
import { images } from '../../constants';

const SPLASH_SCREEN_DURATION = 4000; // in milliseconds

const Splash = ({ navigation }) => {
  const animation = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: SPLASH_SCREEN_DURATION,
      useNativeDriver: true,
    }).start(() => {
      // After the splash screen animation is finished,
      // navigate to the next screen.
      navigation.navigate('Signin');
    });
  }, [animation, navigation]);

  const logoOpacity = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0],
  });

  const spinnerOpacity = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0, 1],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.logoContainer, { opacity: logoOpacity }]}
      >
        <Image
          source={images.one}
          style={styles.logo}
        />
      </Animated.View>
      <Animated.View
        style={[styles.spinnerContainer, { opacity: spinnerOpacity }]}
      >
        <ActivityIndicator size="large" color="grey" />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: '40%',
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 250,
  },
  spinnerContainer: {
    position: 'absolute',
    bottom: '15%',
  },
});

export default Splash;

