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
import ProfileMenu from '../Components/ProfileMenu/ProfileMenu';
import ContactUs from '../Components/ContactUs/ContactUs';
import Privacy from '../Components/Privacy/Privacy';
import AboutUs from '../Components/AboutUs/AboutUs';
import Profile from '../Components/Profile/Profile';
import EmployeeProfile from '../Components/EmployeeProfile/EmployeeProfile';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}} 
        initialRouteName={'Splash'}>
        <Stack.Screen name={'Splash'} component={SplashScreen} />
        <Stack.Screen name={'Introo'} component={Introo} />
        <Stack.Screen name={'Login'} component={Login} />
        <Stack.Screen name={'Register'} component={Register} />
        {/* <Stack.Screen name={'ManagerHome'} component={ManagerHome} /> */}
        {/* <Stack.Screen name={'Requests'} component={MyTabs} /> */}
        <Stack.Screen name={'CreateRequest'} component={CreateRequest} />
        <Stack.Screen name={'Home'} component={MyTabs} /> 
        <Stack.Screen name={'ContactUs'} component={ContactUs} />
        <Stack.Screen name={'Privacy'} component={Privacy} />
        <Stack.Screen name={'AboutUs'} component={AboutUs} />
        <Stack.Screen name={'Profile'} component={Profile} />
        <Stack.Screen name={'EmployeeProfile'} component={EmployeeProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
