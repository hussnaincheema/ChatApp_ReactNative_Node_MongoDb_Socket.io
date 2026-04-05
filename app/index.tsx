import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '@/constants/theme'
import Animated, { FadeInDown } from 'react-native-reanimated'

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.neutral900} />
      <Animated.Image
        source={require('../assets/images/Splash.png')}
        entering={FadeInDown.duration(700).springify()}
        style={styles.splashImage}
        resizeMode={'contain'}
      />
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: colors.primaryLight,
  },
  splashImage:{
    height: "70%",
    aspectRatio: 1,
  }
})