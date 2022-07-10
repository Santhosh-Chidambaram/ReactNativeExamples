import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ComparisonExample} from '@/screens/ComparisonExample';

const AppStack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator>
        <AppStack.Screen
          name="ComparisonExample"
          component={ComparisonExample}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
