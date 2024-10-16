/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/self-closing-comp */
import {useEffect} from 'react';
import {ImageBackground, Text} from 'react-native';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import images from '../../Constant/Images';
export default function SplashScreen() {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
  }, [navigation]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 
      }}>
      <Animatable.Image
        source={images.logo}
        animation="zoomInDown"
        duration={4000}></Animatable.Image>
    </View>
  );
}
