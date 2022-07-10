import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const ScreenLayout = ({children}) => {
  return <SafeAreaView style={{flex: 1}}>{children}</SafeAreaView>;
};

export default ScreenLayout;
