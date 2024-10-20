import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Components/Home/home';
import { Ionicons } from 'react-native-vector-icons'; // Import Ionicons
import Reports from '../Components/Reports/reports';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator 
    screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'القائمة') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'التقارير') {
            iconName = focused ? 'document' : 'document-outline';
          } else if (route.name === 'الطلبات') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'الرئيسية') {
            iconName = focused ? 'home' : 'home-outline';
          }

          // Return the appropriate icon component from Ionicons
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })} >
      <Tab.Screen name="القائمة"  component={Home} />
      <Tab.Screen name="التقارير"  component={Reports}/>
      <Tab.Screen name="الطلبات"  component={Home}/>
      <Tab.Screen name="الرئيسية" component={Home} />
    </Tab.Navigator>
  );
}
export default MyTabs