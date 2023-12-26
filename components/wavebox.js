import { StyleSheet, Text, View ,Dimensions} from 'react-native'
import React from 'react'
import Svg, { Path } from "react-native-svg";

const Wavebox = () => {
  return (
    <View style={styles.wavebox}>
          <Svg
            height={200}
            width={Dimensions.get("screen").width}
            viewBox="0 0 1440 320"
            style={styles.topWavy}
          >
            <Path
              fill="#241E20"
              d="M0,128L20,154.7C40,181,80,235,120,218.7C160,203,200,117,240,106.7C280,96,320,160,360,160C400,160,440,96,480,112C520,128,560,224,600,272C640,320,680,320,720,277.3C760,235,800,149,840,133.3C880,117,920,171,960,202.7C1000,235,1040,245,1080,224C1120,203,1160,149,1200,117.3C1240,85,1280,75,1320,85.3C1360,96,1400,128,1420,144L1440,160L1440,0L1420,0C1400,0,1360,0,1320,0C1280,0,1240,0,1200,0C1160,0,1120,0,1080,0C1040,0,1000,0,960,0C920,0,880,0,840,0C800,0,760,0,720,0C680,0,640,0,600,0C560,0,520,0,480,0C440,0,400,0,360,0C320,0,280,0,240,0C200,0,160,0,120,0C80,0,40,0,20,0L0,0Z"
            />
          </Svg>
        </View>
  )
}

export default Wavebox

const styles = StyleSheet.create({
    wavebox: {
        backgroundColor: "#241E20",
        height: 50,
        elevation: 30,
      },
      topWavy: {
        bottom: 20,
        borderWidth: 10,
        elevation: 10,
      },
})