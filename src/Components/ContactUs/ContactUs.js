import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Alert, ScrollView,Image } from 'react-native';
import { Avatar, IconButton } from 'react-native-paper';
import Header from '../Header';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { width, height, totalSize } from 'react-native-dimension';
import images from '../../Constant/Images';
import Constant from '../../Constant/Constant';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
export default function ContactUs() {
  const person1 = {
    name: 'Nada El-Hady',
    position:'Manager',
    email: 'NadaElHady20@example.com',
    whatsapp: '0123456789', 
    phone: 'tel:0123456789', 
  };

  const person2 = {
    name: 'Sara Osman',
    position:'Assistant',
    email: 'SaraOsman80@example.com',
    whatsapp: '0105756680', 
    phone: 'tel:0105756680', 
  };
  const person3 = {
    name: 'Ramy Gamal',
    position:'Support',
    email: 'ramyGamal@example.com',
    whatsapp: '0105711180', 
    phone: 'tel:0105711180', 
  };

  const handleEmailPress = (email) => {
    const emailUrl = `mailto:${email}`;
    Linking.openURL(emailUrl).catch(() => {
      Alert.alert('Error', 'Failed to open email client.');
    });
  };

  const handleWhatsAppPress = (phoneNumber) => {
    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}`;
    Linking.openURL(whatsappUrl).catch(() => {
      Alert.alert('Error', 'WhatsApp is not installed on this device.');
    });
  };

  const handlePhonePress = (phoneNumber) => {
    Linking.openURL(phoneNumber).catch(() => {
      Alert.alert('Error', 'Failed to initiate a phone call.');
    });
  };

  const renderPersonCard = (person) => (
    <View style={styles.card}>
        <View style={{flexDirection:'row',alignItems:'center'}}>

<Image 
style={{marginRight:10,width:width(18),height:height(8),borderRadius:height(2) }}
resizeMode='cover'
source={{ uri: 'https://www.shutterstock.com/shutterstock/videos/1094588083/thumb/1.jpg?ip=x480' }} />
<View>
    <Text style={ {
    fontSize: totalSize(3),
    fontWeight: '700',
    marginBottom: height(.5),
    color:Constant.Colors.grayishPurple,
    alignItems:'center'
  }}>
    {person.name}</Text>
    <Text style={ {
    fontSize: totalSize(2),
    marginBottom: height(1.6),
    marginLeft: height(.8),
    color:Constant.Colors.server
  }}>
    {'The '+person.position}</Text>
    </View>

</View>
    

      <View style={{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:height(2)
      }}>
      <TouchableOpacity style={[styles.contactButton,]} onPress={() => handleEmailPress(person.email)}>
      <View style={[styles.contactButton2,]}>

<Icon name='email' size={33} color={Constant.Colors.grayishPurple}/>
</View>
</TouchableOpacity>

<TouchableOpacity style={[styles.contactButton,]} onPress={() => handleWhatsAppPress(person.whatsapp)}>
<View style={[styles.contactButton2,]}>
<Fontisto name='whatsapp' size={33} color={Constant.Colors.grayishPurple}/>
</View>
</TouchableOpacity>

<TouchableOpacity style={[styles.contactButton,]} onPress={() => handlePhonePress(person.phone)}>
<View style={[styles.contactButton2,]}>
<Fontisto name='phone'size={33} color={Constant.Colors.grayishPurple}/>
</View>
</TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView>
        <View style={{
        flex: 1,
        alignItems:'center'
      }}>
    <Header title={'Contact Us'}/>    
      <Text style={{
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: height(5),
    marginTop: height(2),
    textAlign: 'center',
    color: Constant.Colors.purple,
    borderBottomWidth:1,
    width:width(50),
    borderColor:Constant.Colors.server
  }}>Contact with</Text>

      {renderPersonCard(person1)}
      {renderPersonCard(person2)}
      {renderPersonCard(person3)}
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  
  card: {
    width:width(90),

    backgroundColor: '#e4e4e4',
    padding: 20,
    borderRadius: 8,
    marginBottom: height(3),
  },
  contactButton: {
    width:width(18),
    height:width(18),
    alignItems:'center',
    justifyContent:'center',
    borderRadius:width(10),
    borderColor:Constant.Colors.grayishPurple,
    borderWidth:1,

  },
  contactButton2: {
    width:width(17),
    height:width(17),
    alignItems:'center',
    justifyContent:'center',
    borderRadius:width(10),
    borderColor:Constant.Colors.grayishPurple,
    borderWidth:1,

  },
});
