import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { width, height, totalSize } from 'react-native-dimension';
import images from '../../Constant/Images';
import Header from '../Header';
import Constant from '../../Constant/Constant';
import { Modal, PaperProvider, Portal } from 'react-native-paper';
import CreateRequest from './CreateRequest';
import { db } from '../../../Firebase/Firebase';
import { collection, getDocs, addDoc,query,where } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Requests() {
  const [requests, setRequests] = useState(null);
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleSaveRequest = async (newRequest) => {
    try {
      
      const docRef = await addDoc(collection(db, 'users'), newRequest);
      setRequests((prevRequests) => [
        ...prevRequests,
        { id: docRef.id, ...newRequest },
      ]);
      hideModal();
    } catch (error) {
      console.error("Error adding request: ", error);
    }
  };

  const handleCancelRequest= async () => {
    try {
     
      const uid = await AsyncStorage.getItem('userUID');
      
      if (uid) {
        await updateDoc(doc(db, 'users', uid), {
          request: [],
        });
        setRequests([]);
      Alert.alert('All requests deleted successfully');
    } else {
      Alert.alert('User ID not found in storage');
    }
  } catch (error) {
    console.error('Error deleting all requests:', error);
    Alert.alert('Failed to delete all requests. Please try again.');
  }
};

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const uid = await AsyncStorage.getItem('userUID');

        if (!uid) {
          console.log("User UID not found in AsyncStorage.");
          return;
        }

        const userQuery = query(collection(db, 'users'), where('uid', '==', uid));
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
          // Assuming there's only one user with the given uid
          const userData = querySnapshot.docs[0].data();
          const allRequests = userData.request || []; // Safely access requests
          setRequests(allRequests);
        } else {
          console.log("No user found with the provided uid.");
        }
      } catch (error) {
        console.error("Error fetching requests data: ", error);
      }
    };

    fetchRequests();
  }, []);

  return (
    <PaperProvider>
      <View style={{ flex: 1 }}>
        <Header title={'Request'} />

        {requests && requests.length > 0 ? (
          <View style={{ flex: 1, alignItems: 'center' }}>
            {requests[0].status===''? 
              <Animatable.Image
              source={require('../../Assets/images/waiting.png')}
              style={{
                width: width(100),
                height: height(40),
                marginTop: height(6),
              }}
              resizeMode='contain'
            />
            :
            ( requests[0].status==='true'? 
              <Animatable.Image
              source={require('../../Assets/images/accept.png')}
              style={{
                width: width(100),
                height: height(40),
                marginTop: height(6),
              }}
              resizeMode='contain'
            />
            :
            <Animatable.Image
              source={require('../../Assets/images/denied.png')}
              style={{
                width: width(100),
                height: height(40),
                marginTop: height(6),
              }}
              resizeMode='contain'
            />

            )

          
          }
            <Text
              style={{
                fontSize: totalSize(3),
                fontWeight: '600',
                margin: height(-5),
                textAlign: 'center',
                color: Constant.Colors.server,
                marginHorizontal: width(2),
              }}
            >
              I need to take
              {requests[requests.length-1].type === 'Vacation'
                ? ' ' + requests[requests.length-1].type + ' leave from ' + requests[requests.length-1].startDate + ' to ' + requests[requests.length-1].endDate
                : ' ' + requests[requests.length-1].type + ' to leave now'}
            </Text>

            <TouchableOpacity
              onPress={() => {
                handleCancelRequest
                setRequests([])
              }}
              style={{
                width: width(60),
                height: height(5),
                backgroundColor: Constant.Colors.gray,
                borderRadius: 10,
                borderColor: Constant.Colors.purple,
                borderWidth: 1,
                marginTop: height(3),
                alignItems: 'center',
                justifyContent: 'center',
                marginTop:height(3)
              }}
            >
              <Text style={{ fontSize: totalSize(2) }}>Cancel Request</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Animatable.Image
              source={images.Empty}
              style={{
                width: width(70),
                height: height(60),
                marginTop: height(3),
                marginBottom: height(-3),
              }}
              resizeMode="contain"
            />
            <Text
              style={{
                marginTop: height(-7),
                color: Constant.Colors.server,
                fontSize: totalSize(2.4),
              }}
            >
              There aren't requests yet
            </Text>
            <TouchableOpacity
              onPress={showModal}
              style={{
                width: width(60),
                height: height(5),
                backgroundColor: Constant.Colors.gray,
                borderRadius: 10,
                borderColor: Constant.Colors.purple,
                borderWidth: 1,
                marginTop: height(3),
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ fontSize: totalSize(2) }}>Create Request</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            padding: 20,
            alignSelf: 'center',
            borderRadius: width(2),
            marginTop: height(10),
          }}
        >
          <CreateRequest onSave={handleSaveRequest} onClose={hideModal} />
        </Modal>
      </Portal>
    </PaperProvider>
  );
}
