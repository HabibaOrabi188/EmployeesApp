import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Components/Home/home';
import { Ionicons } from 'react-native-vector-icons'; // Import Ionicons
import Reports from '../Components/Reports/reports';
import Constant from '../Constant/Constant';
import Requests from '../Components/Requests/Requests';
import ProfileMenu from '../Components/ProfileMenu/ProfileMenu';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator 
    
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
      })} >
      <Tab.Screen name="Home" component={Home} />

      <Tab.Screen name="Reports"  component={Reports}/>
      <Tab.Screen name="Requests"  component={Requests}/>
      <Tab.Screen name="Menu"  component={ProfileMenu} />
    </Tab.Navigator>
  );
}
export default MyTabs