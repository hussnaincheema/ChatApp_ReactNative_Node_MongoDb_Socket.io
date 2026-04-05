import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/Button';
import { colors } from '@/constants/theme';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const Welcome = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeInUp.duration(800).springify()} style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/Splash.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(800).delay(200).springify()} style={styles.contentContainer}>
        <Text style={styles.title}>Welcome to ChatApp</Text>
        <Text style={styles.subtitle}>
          Connect with friends and family seamlessly, beautifully and securely.
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            title="Get Started"
            onPress={() => router.push('/(auth)/register')}
            style={{ marginBottom: 15 }}
          />
          <Button
            title="Log In"
            outlined
            onPress={() => router.push('/(auth)/login')}
          />
        </View>
      </Animated.View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryLight,
    padding: 20,
  },
  imageContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '70%',
    aspectRatio: 1,
    borderRadius: 9999,
  },
  contentContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.neutral900,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
  },
});