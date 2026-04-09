import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Dynamically handle Local Network APIs for physical devices
const getBaseUrl = () => {
  if (Platform.OS === 'ios') {
     return 'http://localhost:5001/api';
  }

  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:5001/api';
  }

  const debuggerHost = Constants.expoConfig?.hostUri;
  const localhost = debuggerHost?.split(':')[0];

  if (localhost) {
    return `http://${localhost}:5001/api`;
  }
  
  return 'http://localhost:5001/api';
};

console.log("Using API Base URL:", getBaseUrl());

const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept requests to attach the JWT token
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('userToken');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
