import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet'


const BottomSheetModal = () => {
    const snapPoints = useMemo(() => ['20%', '50%','70%'],[]);
  return (
    <GestureHandlerRootView>
      <BottomSheet snapPoints= {snapPoints} >
          <View>
              <Text>BottomSheet</Text>
          </View>
      </BottomSheet>
    </GestureHandlerRootView>
  )
}

export default BottomSheetModal

const styles = StyleSheet.create({})