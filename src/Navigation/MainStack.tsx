import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../Components/SplashScreen/SplashScreen';
import Introo from '../Components/Introo/Introo';
import Login from '../Components/Login/Login';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={'Login'}>
        <Stack.Screen name={'Splash'} component={SplashScreen} />
        <Stack.Screen name={'Introo'} component={Introo} />
        <Stack.Screen name={'Login'} component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
