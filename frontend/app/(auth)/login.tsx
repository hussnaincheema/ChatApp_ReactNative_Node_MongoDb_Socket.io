import React, { useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { colors } from '@/constants/theme';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { loginUser, clearError } from '@/store/slices/authSlice';
import { Formik } from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (error) {
      Alert.alert('Login Failed', error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        router.replace('/');
      }, 300);
    }
  }, [user, router]);

  const handleLogin = (values: any) => {
    dispatch(loginUser(values));
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Animated.View entering={FadeInUp.duration(800).springify()} style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue connecting</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(800).delay(200).springify()} style={styles.form}>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View>
                <Input 
                  label="Email Address" 
                  placeholder="Enter your email" 
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  error={touched.email && errors.email ? errors.email : undefined}
                />

                <Input 
                  label="Password" 
                  placeholder="Enter your password" 
                  isPassword
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  error={touched.password && errors.password ? errors.password : undefined}
                />

                <View style={styles.buttonContainer}>
                  <Button 
                    title="Log In" 
                    loading={loading}
                    onPress={handleSubmit as any} 
                    style={{ marginBottom: 20 }}
                  />
                  
                  <View style={styles.footerRow}>
                    <Text style={styles.footerText}>Don't have an account? </Text>
                    <Text style={styles.linkText} onPress={() => router.push('/(auth)/register')}>
                      Sign Up
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </Formik>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.white,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 40,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.neutral900,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: colors.neutral500,
  },
  form: {
    width: '100%',
  },
  buttonContainer: {
    marginTop: 30,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: colors.neutral500,
    fontSize: 15,
  },
  linkText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 15,
  },
});
