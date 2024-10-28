import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Components/Home/home';
import { Ionicons } from 'react-native-vector-icons';
import Reports from '../Components/Reports/reports';
import Constant from '../Constant/Constant';
import Requests from '../Components/Requests/Requests';
import ProfileMenu from '../Components/ProfileMenu/ProfileMenu';
import ManagerRequests from '../Components/ManagerRequests/ManagerRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import ManagerHome from '../Components/ManagerHome/ManagerHome';

const Tab = createBottomTabNavigator();

function MyTabs() {
  const [id, setId] = useState('');

  useEffect(() => {
    const getUID = async () => {
      const uid = await AsyncStorage.getItem('userUID');
      setId(uid);
    };
    getUID();
  }, []);

  return (
    <Tab.Navigator 

    initialRouteName='Home'
    
    screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Menu') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Reports') {
            iconName = focused ? 'receipt' : 'receipt-outline';
          } else if (route.name === 'Requests') {
            iconName = focused ? 'document' : 'document-outline';
          } else if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Constant.Colors.purple,
        tabBarInactiveTintColor: Constant.Colors.grey,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={id==='3bH95rVYDhQWtpJWhirw6HIgP9C2'? ManagerHome:Home} />

      <Tab.Screen name="Requests"  component={id==='3bH95rVYDhQWtpJWhirw6HIgP9C2'?ManagerRequests:Requests}/>
      <Tab.Screen name="Menu"  component={ProfileMenu} />
    </Tab.Navigator>
  );
}

export default MyTabs;
