// App.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Avatar, IconButton } from 'react-native-paper';
import Header from '../Header';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { width, height, totalSize } from 'react-native-dimension';
import images from '../../Constant/Images';
import Constant from '../../Constant/Constant';
import Icon from 'react-native-vector-icons/MaterialIcons'
export default function ProfileMenu (){
    const navigation = useNavigation();
  return (
    <View style={{
        flex: 1,
    }}>
     <Header title={'Menu'} />
    <TouchableOpacity style={ {
    alignItems: 'center',
    paddingHorizontal:width(2),
    paddingVertical:width(1.7),
    backgroundColor: '#f4f4f4',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection:'row',
    marginBottom:height(2),
    justifyContent:'space-between'
  }}
  
  >
        <View style={{flexDirection:'row',alignItems:'center'}}>

        <Avatar.Image 
        style={{marginRight:10 }}
        size={64} 
        source={{ uri: 'https://www.shutterstock.com/shutterstock/videos/1094588083/thumb/1.jpg?ip=x480' }} />
        <Text style={{
                fontSize: totalSize(2.8),
                fontWeight: 'bold',
                color: Constant.Colors.grayishPurple,
            }}>Ahmed El-araby</Text>

        </View>
        <Icon name='keyboard-double-arrow-right' color={Constant.Colors.server} size={30} style={{marginRight:width(2)}}/>
      </TouchableOpacity>

      {/* Menu Options */}
      <ScrollView style={styles.menuList}>
      <TouchableOpacity 
      onPress={() => {navigation.navigate('ContactUs')}}
      
      style={styles.menuItem} >
          
          <View style={styles.menuContainer}>
                <Icon name='privacy-tip' color={Constant.Colors.server} size={30} />
                <Text style={styles.menuText}>Contact Us</Text>
              </View>
              <Icon name='keyboard-double-arrow-right' color={Constant.Colors.server} size={30} style={{marginRight:width(2)}}/>
            </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => {navigation.navigate('Privacy')}}>
          
      <View style={styles.menuContainer}>
            <Icon name='privacy-tip' color={Constant.Colors.server} size={30} />
            <Text style={styles.menuText}>Privacy Policy</Text>
          </View>
          <Icon name='keyboard-double-arrow-right' color={Constant.Colors.server} size={30} style={{marginRight:width(2)}}/>
        </TouchableOpacity>

<TouchableOpacity style={styles.menuItem} onPress={() => {navigation.navigate('AboutUs')}}>
          
        <View style={styles.menuContainer}>
            <Icon name='group' color={Constant.Colors.server} size={30} />
            <Text style={styles.menuText}>About US</Text>
          </View>
          <Icon name='keyboard-double-arrow-right' color={Constant.Colors.server} size={28} style={{marginRight:width(2)}}/>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
          
          <View style={styles.menuContainer}>
            <Icon name='exit-to-app' color={Constant.Colors.server} size={30} />
            <Text style={styles.menuText}>Log Out </Text>
          </View>
          <Icon name='keyboard-double-arrow-right' color={Constant.Colors.server} size={30} style={{marginRight:width(2)}}/>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  
 
  roleText: {
    fontSize: 14,
    color: '#777',
  },
  
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height:height(9.5),
    backgroundColor:Constant.Colors.purple,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent:'space-between',
    marginBottom:height(2.6)
  },
  menuText: {
    fontSize: totalSize(2.6),
    color:Constant.Colors.server,
    marginLeft: 10,
  },
  menuContainer:{
    flexDirection:'row',
    backgroundColor:Constant.Colors.gray,
    height:height(9.5),
    alignItems:'center',
    width:width(80),
    borderTopEndRadius:width(10),
    paddingLeft:width(3)
  }
});

