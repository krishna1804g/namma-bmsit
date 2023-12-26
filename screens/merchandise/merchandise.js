import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { images } from '../../constants'

const Merchandise = () => {
  return (
    
    <View style={{backgroundColor:"white",flex:1,justifyContent:"center",alignItems:"center"}}>
      <Image
      source={images.under_construction}
      style={{ width:"100%",height:"30%"}}
      />
      <Text style={{fontSize:25,fontWeight:"bold"}}>
        UNDER CONSTRUCTION
      </Text>
    </View>
  )
}

export default Merchandise

const styles = StyleSheet.create({})