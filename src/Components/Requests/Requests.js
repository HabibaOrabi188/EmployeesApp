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
import { collection, getDocs, addDoc } from 'firebase/firestore';

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

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const allRequests = querySnapshot.docs.flatMap(doc => doc.data().request || []); 
        setRequests(allRequests); 
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
              {requests[0].type === 'Vacation'
                ? ' ' + requests[0].type + ' leave from ' + requests[0].startDate + ' to ' + requests[0].endDate
                : ' ' + requests[0].type + ' to leave now'}
            </Text>

            <TouchableOpacity
              onPress={() => setRequests([])}
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
          <CreateRequest onSave={handleSaveRequest} />
        </Modal>
      </Portal>
    </PaperProvider>
  );
}
