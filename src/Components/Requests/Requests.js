/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/self-closing-comp */
import { useEffect, useState } from 'react';
import { ImageBackground, StatusBar, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { width, height, totalSize } from 'react-native-dimension';
import images from '../../Constant/Images';
import Header from '../Header';
import Constant from '../../Constant/Constant';
import { Modal, PaperProvider, Portal } from 'react-native-paper';
import CreateRequest from './CreateRequest';
import { db } from '../../../Firebase/Firebase'; 
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

export default function Requests() {
  const navigation = useNavigation();
  const [requests, setRequests] = useState({});
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleRequest = (request) => {
    setRequests(request);
    hideModal();
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Employees'));
        const employeeData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(employeeData);
      } catch (error) {
        console.error("Error fetching employee data: ", error);
      }
    };
  
    fetchRequests();
  }, []);
  
  
  return (
    <PaperProvider>
      <View style={{ flex: 1 }}>
        <Header title={'Request'} />

        {requests.type ? (
          <View style={{ flex: 1, alignItems: 'center' }}>
                width: width(90),
                marginTop: height(6),
              }}
              resizeMode="stretch"
            />
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
              {requests.type === 'Vacation'
                ? ' ' + requests.type + ' leave from ' + requests.startDate + ' to ' + requests.endDate
                : ' ' + requests.type + ' to leave new'}
            </Text>

            <TouchableOpacity
              onPress={() => setRequests({})}
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
          <CreateRequest onClose={handleRequest} />
        </Modal>
      </Portal>
    </PaperProvider>
  );
}
