import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome5, MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons';
import Header from '../Header';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker'; 
import { width, height, totalSize } from 'react-native-dimension';
import images from '../../Constant/Images';
import Constant from '../../Constant/Constant';

const Profile = () => {
  const profile = {
    name: "Ahmed El-araby",
    jobTitle: "Assistant",
    gender: "Male",
    workingHours: "09:00am - 05:00pm",
    phone: "+20100987100",
    salary: "6,000",
    jobId: "2921112626341",
    workLocation: "Cairo Office"
  };

  const [profileImage, setProfileImage] = useState(null);  
  const navigation = useNavigation();

  const handleImagePick = async () => { 
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access media library is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri); 
    }
  };

  return (
    <ScrollView>
     <View style={{flex:1, paddingBottom: height(4), alignItems: 'center'}}>
       <Header title={'Profile'} />
       <View style={{ position: 'relative', marginTop: height(4) }}>
         <Image
           source={profileImage ? { uri: profileImage } : { uri: 'https://png.pngitem.com/pimgs/s/522-5220445_anonymous-profile-grey-person-sticker-glitch-empty-profile.png' }} 
           style={{ width: width(50), height: height(25), borderRadius: width(25) }}
         />
         <TouchableOpacity
           onPress={handleImagePick}  
           style={{
             position: 'absolute',
             bottom: height(2),
             right: width(1),
             backgroundColor: Constant.Colors.purple,
             borderRadius: height(3),
            alignItems:'center',
            justifyContent:'center',
             height:height(6),
             width:width(14)
           }}
         >
           <Entypo name="plus" size={24} color="white" />
         </TouchableOpacity>
       </View>

       <Text style={{
           fontSize: totalSize(3),
           fontWeight: 'bold',
           color: Constant.Colors.grayishPurple,
         }}
       >
         {profile.name}
       </Text>
       <Text style={{
           color: 'gray',
           marginBottom: 10,
           fontSize: totalSize(2.6),
         }}
       >
         {profile.jobTitle}
       </Text>

       <View style={{
          backgroundColor: '#FFF',
          borderRadius: 10,
          padding: 10,
          elevation: 3,
          marginHorizontal: height(2)
         }}>
         <InfoRow icon={<Ionicons name="person" size={24} color="gray" style={{ marginRight: width(1.6) }} />} 
         label="Gender" value={profile.gender} />
         <InfoRow icon={<MaterialIcons name="access-time" size={24} color="gray" style={{ marginRight: width(1.6) }} />} 
         label="Working Hours" value={profile.workingHours} />
         <InfoRow icon={<Ionicons name="call" size={24} color="gray" style={{ marginRight: width(1.6) }} />} 
         label="Phone" value={profile.phone} />
         <InfoRow icon={<FontAwesome5 name="money-check" size={24} color="gray" style={{ marginRight: width(1.6) }} />} 
         label="Salary" value={profile.salary} />
         <InfoRow icon={<MaterialIcons name="badge" size={24} color="gray" style={{ marginRight: width(1.6) }} />} 
         label="Job ID" value={profile.jobId} />
         <InfoRow icon={<Entypo name="location-pin" size={24} color="gray" style={{ marginRight: width(1.6) }} />} 
         label="Work Location" value={profile.workLocation} />
       </View>
      </View>
    </ScrollView>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <View style={styles.row}>
    <View style={styles.iconContainer}>{icon}</View>
    <View style={styles.textContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: height(1),
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    width: width(88),
  },
  label: {
    fontSize: 16,
    color: Constant.Colors.server,
    fontWeight: '700',
  },
  value: {
    fontSize: 16,
    color: Constant.Colors.server,
    fontWeight: '600',
  },
});

export default Profile;
