import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Image, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Modal, PaperProvider, Portal, FAB } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Header from '../Header';
import * as Animatable from 'react-native-animatable';
import { collection, getDocs, doc, deleteDoc, setDoc } from 'firebase/firestore';
import firebase from 'firebase/app'; 
import { db } from '../../../Firebase/Firebase';
import { width, height, totalSize } from 'react-native-dimension';
import Constant from '../../Constant/Constant';
import AddUser from './AddEmployee';
import { useNavigation } from '@react-navigation/native';

const ManagerHome = () => {
  const navigation = useNavigation();
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const userData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPersons(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [visible]);

  const handleEdit = (id) => {
    console.log('Edit user with ID:', id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'users', id));
      setPersons(prevPersons => prevPersons.filter(person => person.id !== id));
      Alert.alert('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      Alert.alert('Error deleting user');
    }
  };

  const handleAddEmployee = async (newEmployee) => {
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(newEmployee.email, newEmployee.password);

      const userRef = doc(db, 'users', userCredential.user.uid);
      await setDoc(userRef, {
        ...newEmployee, 
        uid: userCredential.user.uid, 
      });

      setPersons(prevPersons => [...prevPersons, newEmployee]);
      Alert.alert('Employee added successfully');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Error', 'This email is already in use.');
      } else {
        error('Error adding user:', error);
        Alert.alert('Error', 'Failed to add employee. Please try again.');
      }
    }
  };

  return (
    <PaperProvider>
      <View style={{ flex: 1 }}>
        <Header title={'Home'} />
        <View style={{ flex: 1, padding: width(5) }}>
          <FlatList
            data={persons}
            renderItem={({ item, index }) => (
              item.position !== 'Manager' ? (
                <Animatable.View
                  delay={1000 * (index + 1)}
                  animation="flipInX"
                  easing="ease-in-cubic"
                  style={{
                    width: '96%',
                    marginBottom: 15,
                    alignSelf: 'center',
                    borderRadius: width(2),
                  }}
                >
                  <TouchableOpacity onPress={() => navigation.navigate('EmployeeProfile', { id: item.uid })}>
                    <View style={{
                      height: height(13),
                      backgroundColor: Constant.Colors.grayishPurple,
                      borderRadius: 10,
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      marginTop: height(1.4),
                    }}>
                      <Image 
                        source={{ uri: item.image }}
                        style={{
                          width: width(22),
                          height: width(22),
                          borderRadius: width(11),
                        }} 
                        resizeMode='cover'
                      />
                      <View style={{ marginRight: width(3), width: width(38), marginLeft: width(1) }}>
                        <Text style={{
                          fontSize: totalSize(2.5),
                          color: Constant.Colors.rose,
                          fontWeight: '600',
                        }}>
                          {item.name}
                        </Text>
                        <Text style={{
                          fontSize: totalSize(2),
                          color: Constant.Colors.gray,
                          marginBottom: 10,
                        }}>
                          {item.position}
                        </Text>
                      </View>
    
                      <TouchableOpacity 
                        style={{ padding: width(1.6) }} 
                        onPress={() => handleDelete(item.id)}
                      >
                        <FontAwesome color={Constant.Colors.red} size={28} name='user-times'/>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                </Animatable.View>
              ) : null
            )}
            keyExtractor={(item) => item.id}
          />
          <FAB
            icon="plus"
            style={{
              position: 'absolute',
              bottom: 16,
              right: 16,
            }}
            onPress={() => setVisible(true)}
          />
        </View>
      </View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          style={{
            height: height(80),
            paddingTop: height(6),
            justifyContent: 'center',
          }}
          contentContainerStyle={{
            alignSelf: 'center',
            borderRadius: width(2),
            width: width(90),
            height: '100%',
          }}
        >
          <AddUser onClose={hideModal} onAddEmployee={handleAddEmployee} />
        </Modal>
      </Portal>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({});

export default ManagerHome;
