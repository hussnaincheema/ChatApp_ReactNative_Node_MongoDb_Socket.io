import { Stack } from 'expo-router';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';

const _layout = () => {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }} />
    </Provider>
  );
}

export default _layout;