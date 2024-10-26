import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { width, height, totalSize } from 'react-native-dimension';
import { collection, query, where, getDocs, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../Header';
import Constant from '../../Constant/Constant';
import { db } from '../../../Firebase/Firebase'; // import your Firestore config

export default function CreateRequest({ onClose }) {
  const navigation = useNavigation();
  const [Vacation, setVacation] = useState(true);
  const [Permission, setPermission] = useState(false);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data once on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const uid = await AsyncStorage.getItem('userUID');
        if (uid) {
          const userQuery = query(collection(db, 'users'), where('uid', '==', uid));
          const querySnapshot = await getDocs(userQuery);
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            setUserData(userDoc);  // Storing the document reference for updates
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

  // Add the request to the user's document in Firebase
  const handleSaveRequest = async () => {
    if ((endDate.length > 0 && startDate.length > 0) || Permission) {
      const request = {
        type: Vacation ? 'Vacation' : 'Permission',
        startDate: startDate,
        endDate: endDate,
        createdAt: new Date().toISOString(),
        status:''
      };

      if (userData) {
        try {
          await updateDoc(doc(db, 'users', userData.id), {
            request: arrayUnion(request),
          });
          Alert.alert('Request added successfully');
          onClose(request);
        } catch (error) {
          console.error('Error adding request:', error);
          Alert.alert('Failed to add request. Please try again.');
        }
      } else {
        Alert.alert('User not found');
      }
    } else {
      Alert.alert('Complete the form');
    }
  };

  const sectionStyle = {
    width: width(89),
    padding: width(2),
    borderStyle: 'dotted',
    borderWidth: 1,
    marginLeft: width(3),
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: height(70), alignItems: 'center', backgroundColor: '#fff' }}>
        <View style={{ width: width(96), flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity
            onPress={() => {
              setPermission(true);
              setVacation(false);
            }}
            style={{
              width: width(40),
              height: height(5),
              backgroundColor: Permission ? Constant.Colors.purple : Constant.Colors.gray,
              borderRadius: 10,
              borderColor: Constant.Colors.purple,
              borderWidth: 1,
              marginTop: height(3),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text>Permission</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setVacation(true);
              setPermission(false);
            }}
            style={{
              width: width(40),
              height: height(5),
              backgroundColor: Vacation ? Constant.Colors.purple : Constant.Colors.gray,
              borderRadius: 10,
              borderColor: Constant.Colors.purple,
              borderWidth: 1,
              marginTop: height(3),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text>Vacation</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: Constant.Colors.server,
            width: width(94),
            height: height(0.2),
            marginTop: height(3),
          }}
        ></View>
        <Text style={{ fontSize: totalSize(2.5), fontWeight: '600', width: width(92), marginTop: height(2) }}>
          {Vacation ? 'Vacation' : 'Permission'} Request
        </Text>
        {Vacation ? (
          <View style={{ width: width(92), padding: width(1), margin: width(1) }}>
            <Text style={{ margin: width(2), fontSize: totalSize(2.3), marginTop: height(2) }}>Start of Vacation</Text>
            <TextInput
              style={sectionStyle}
              placeholder="YYYY-MM-DD"
              keyboardType="numeric"
              value={startDate}
              onChangeText={setStartDate}
            />
            <Text style={{ margin: width(2), fontSize: totalSize(2.2), marginTop: height(2.6) }}>End of Vacation</Text>
            <TextInput
              style={sectionStyle}
              placeholder="YYYY-MM-DD"
              keyboardType="numeric"
              value={endDate}
              onChangeText={setEndDate}
            />
            <Text style={{ margin: width(2), fontSize: totalSize(2.2), marginTop: height(2.6) }}>Comment</Text>
            <TextInput multiline={true} style={sectionStyle} placeholder="Add a comment" />
          </View>
        ) : (
          <Text
            style={{
              fontSize: totalSize(3),
              fontWeight: '600',
              margin: height(5),
              textAlign: 'center',
              color: Constant.Colors.server,
            }}
          >
            {' Do you sure you\'re leaving now '}
          </Text>
        )}
        <TouchableOpacity
          onPress={handleSaveRequest}
          style={{
            width: width(60),
            height: height(5),
            backgroundColor: Constant.Colors.gray,
            borderRadius: 10,
            borderColor: Constant.Colors.purple,
            borderWidth: 1,
            marginTop: Vacation ? height(4) : height(7),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: totalSize(2) }}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
