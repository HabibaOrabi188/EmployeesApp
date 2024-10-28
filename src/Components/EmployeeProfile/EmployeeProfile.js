import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome5, MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons';
import Header from '../Header';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker'; 
import { width, height, totalSize } from 'react-native-dimension';
import images from '../../Constant/Images';
import Constant from '../../Constant/Constant';
import { db } from '../../../Firebase/Firebase';
import { collection, query, where, getDocs, updateDoc, doc,getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EmployeeProfile = ({route}) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const navigation = useNavigation();
  const [id, setId] = useState('');
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { id: uid } = route.params;  
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
  }, [route.params]);  // Add as a dependency
  

  const handleImagePick = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
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
      const imageUri = result.assets[0].uri;
      setProfileImage(imageUri); 
      await uploadImageToFirebase(imageUri);  // Call upload function
    }
  };
  
  const uploadImageToFirebase = async (imageUri) => {
    try {
      if (!profile || !profile.uid) {
        console.error("Profile or UID is not available.");
        return;
      }
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const storage = getStorage();
      const storageRef = ref(storage, `profileImages/${profile.uid}.jpg`);
  
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
  
      // Update profile image URL in Firestore
      const userQuery = query(collection(db, "users"), where("uid", "==", profile.uid));
      const querySnapshot = await getDocs(userQuery);
      if (querySnapshot.empty) {
        console.error("No document found with this UID:", profile.uid);
        return;
      }
  
      const userDocRef = querySnapshot.docs[0].ref;
      await updateDoc(userDocRef, { image: downloadURL });
      console.log("Image uploaded and profile updated successfully!");
      setProfileImage(downloadURL); // Update state to immediately display new image
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  

  if (loading) {
    return <ActivityIndicator size="large" color={Constant.Colors.purple} style={{ marginTop: height(2) }} />;
  }

  return (
    <ScrollView>
      <View style={{ flex:1, paddingBottom: height(4), alignItems: 'center' }}>
        <Header title={'Profile'} />
        <View style={{ position: 'relative', marginTop: height(4) }}>
          <Image
            source={profileImage ? { uri: profileImage } : { uri: profile.image }}
            style={{ width: width(50), height: width(50), borderRadius: width(25) }}
          />
          <TouchableOpacity
            onPress={handleImagePick}  
            style={{
              position: 'absolute',
              bottom: height(2),
              right: width(1),
              backgroundColor: Constant.Colors.purple,
              borderRadius: width(7),
              alignItems: 'center',
              justifyContent: 'center',
              height: width(12),
              width: width(12),
            }}
          >
            <Entypo name="plus" size={26} color="white" />
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
              <InfoRow icon={<Ionicons name="call" size={26} style={{ width:width(13) }}
              color={Constant.Colors.purple} />} label="Phone" value={profile.phone} />
              {id !== "3bH95rVYDhQWtpJWhirw6HIgP9C2"?<View>
                <InfoRow icon={<FontAwesome5 name="money-check" size={26} style={{width:width(13)}}
               color={Constant.Colors.purple} />} label="Salary" value={profile.salary} />
              <InfoRow icon={<MaterialIcons name="access-time" size={26} style={{width:width(13)}}
               color={Constant.Colors.purple} />} label="Working Hours" value={profile.hours} />
               <InfoRow icon={<MaterialIcons name="today" size={26} style={{width:width(13) }}
               color={Constant.Colors.purple} />} label="Working days" value={profile.days} /></View>:null}
             
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

export default EmployeeProfile;
