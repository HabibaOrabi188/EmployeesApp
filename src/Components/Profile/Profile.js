import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome5, MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons';
import Header from '../Header';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker'; 
import { width, height, totalSize } from 'react-native-dimension';
import images from '../../Constant/Images';
import Constant from '../../Constant/Constant';
import { db } from '../../../Firebase/Firebase'; // Ensure Firebase config is set up
import { collection, query, where, getDocs } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const uid = await AsyncStorage.getItem('userUID');
        if (uid) {
          const userQuery = query(collection(db, 'users'), where('uid', '==', uid));
          const querySnapshot = await getDocs(userQuery);
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0].data();
            setProfile(userDoc);
          } else {
            console.log('No user found with this uid.');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

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

  if (loading) {
    return <ActivityIndicator size="large" color={Constant.Colors.purple} style={{ marginTop: height(2) }} />;
  }

  return (
    <ScrollView>
      <View style={{flex:1, paddingBottom: height(4), alignItems: 'center'}}>
        <Header title={'Profile'} />
        <View style={{ position: 'relative', marginTop: height(4) }}>
          <Image
            source={profileImage ? { uri: profileImage } : { uri: profile.image }}
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
              alignItems: 'center',
              justifyContent: 'center',
              height: height(6),
              width: width(14),
            }}
          >
            <Entypo name="plus" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {profile && (
          <>
            <Text style={{
           fontSize: totalSize(3),
           fontWeight: 'bold',
           color: Constant.Colors.grayishPurple,
         }}>{profile.name}</Text>
            <Text style={{
           color: 'gray',
          //  marginBottom: height(1),
           marginTop: height(.6),
           fontSize: totalSize(2.6),
         }}>{profile.position}</Text>
            <View style={{
          backgroundColor: '#FFF',
          borderRadius: 10,
          padding: 10,
          elevation: 3,
          marginHorizontal: height(2),
          marginVertical:height(5),
         }}>
              {/* <InfoRow icon={<Ionicons name="person" size={24} color="gray" />} label="Gender" value={profile.gender} /> */}
              <InfoRow icon={<Ionicons name="call" size={26} style={{ width:width(13) }}
              color={Constant.Colors.purple} />} label="Phone" value={profile.phone} />
              <InfoRow icon={<FontAwesome5 name="money-check" size={26} style={{width:width(13)}}
               color={Constant.Colors.purple} />} label="Salary" value={profile.salary} />
              <InfoRow icon={<MaterialIcons name="access-time" size={26} style={{width:width(13)}}
               color={Constant.Colors.purple} />} label="Working Hours" value={profile.hours} />
               <InfoRow icon={<MaterialIcons name="today" size={26} style={{width:width(13) }}
               color={Constant.Colors.purple} />} label="Working Hours" value={profile.hours} />
              
              {/* <InfoRow icon={<MaterialIcons name="badge" size={24} color="gray" />} label="User ID" value={profile.userId} /> */}
              {/* <InfoRow icon={<Entypo name="location-pin" size={24} style={{ marginRight: width(2) }}
              color="gray" />} label="Work Location" value={profile.workLocation} /> */}
            </View>
          </>
        )}
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
    fontSize: totalSize(2.4),
    color: Constant.Colors.purple,
    fontWeight: '700',
  },
  value: {
    fontSize: 16,
    color: Constant.Colors.server,
    fontWeight: '600',
  },
});
export default Profile;
