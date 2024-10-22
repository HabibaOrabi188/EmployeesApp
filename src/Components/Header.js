/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/self-closing-comp */
import {useEffect} from 'react';
import {ImageBackground, Text,Image} from 'react-native';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { width, height, totalSize } from 'react-native-dimension';
import images from '../Constant/Images';
import Icon from 'react-native-vector-icons/Ionicons'
import Constant from '../Constant/Constant';
export default function Header({title}) {
  const navigation = useNavigation();
  
  return (
    <View
      style={{
        width:width(100),
        height:height(8),
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center', 
        backgroundColor:'#a98fb3',
        paddingHorizontal:width(2),
        paddingLeft:width(4)
      }}>

        <Icon name='arrow-undo-sharp' size={totalSize(3)} color={Constant.Colors.gray} onPress={() => navigation.goBack()} />

        <Text style={{
            color:Constant.Colors.gray,
            fontSize:totalSize(2.8),
            fontWeight:'600'
        }}>
            {title}
        </Text>

        <Animatable.Image style={{width:width(16),height:height(7)}} resizeMode='stretch'  source={images.MaimLogo}/>

        

        
    </View>
  );
}
