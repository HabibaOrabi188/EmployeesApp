import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../Components/SplashScreen/SplashScreen';
import Introo from '../Components/Introo/Introo';
import Login from '../Components/Login/Login';
import Home from '../Components/Home/home';
import MyTabs from './BottomTaps';
import Register from '../Components/Register/Register';
import ManagerHome from '../Components/ManagerHome/ManagerHome';
import CreateRequest from '../Components/Requests/CreateRequest';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}} 
        initialRouteName={'Register'}>
        <Stack.Screen name={'Splash'} component={SplashScreen} />
        <Stack.Screen name={'Introo'} component={Introo} />
        <Stack.Screen name={'Login'} component={Login} />
        <Stack.Screen name={'Register'} component={Register} />
        <Stack.Screen name={'ManagerHome'} component={ManagerHome} />
        <Stack.Screen name={'Requests'} component={MyTabs} />
        <Stack.Screen name={'CreateRequest'} component={CreateRequest} />
        <Stack.Screen name={'Home'} component={MyTabs} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
