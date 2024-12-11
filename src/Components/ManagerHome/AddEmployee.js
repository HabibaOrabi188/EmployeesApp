import React from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { width, height, totalSize } from 'react-native-dimension';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Constant from '../../Constant/Constant';
import { db } from '../../../Firebase/Firebase';

export default function AddUser({ onClose }) {
  const navigation = useNavigation();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[A-Za-z\s]{3,}$/, 'The name must be more than 3 letters')
      .required('The name is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    phone: Yup.string()
      .matches(/^[0-9]{11}$/, 'Phone number must be 11 digits')
      .required('Phone number is required'),
    password: Yup.string()
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, 'Password must be at least 6 characters, including letters and numbers')
      .required('Password is required'),
    position: Yup.string().required('Position is required'),
    salary: Yup.string().required('Salary is required'),
    workingDays: Yup.string().required('Working days are required'),
    workingHours: Yup.string().required('Working hours are required'),
  });

  const handleAddUser = async (values) => {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      await addDoc(collection(db, 'users'), {
        name: values.name,
        email: values.email,
        phone: values.phone,
        position: values.position,
        salary: values.salary,
        days: values.workingDays,
        hours: values.workingHours,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCbU49DD_iYcjSUEXG-Oy7POjJzaMn1GYEZg&s',
        absenceDays: 0,
        earlyLeave: 0,
        lateDays: 0,
        leaveTime: [],
        uid: user.uid,
      });

      Alert.alert('User added successfully!');
      onClose();
    } catch (error) {
      console.error('Error adding user:', error);
      Alert.alert('Failed to add user. Please try again.');
    }
  };

  const textInputStyle = {
    borderBottomWidth: 1,
    borderBottomColor: Constant.Colors.purple,
    marginHorizontal: height(1.6),
    marginVertical: width(1.7),
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1, padding: 6 }}
      extraScrollHeight={20}
      enableOnAndroid
      keyboardShouldPersistTaps="handled"
    >
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: totalSize(2.6),
            color: Constant.Colors.grayishPurple,
            marginBottom: height(2),
          }}
        >
          New Employee
        </Text>
        <Formik
          initialValues={{
            name: '',
            email: '',
            phone: '',
            password: '',
            position: '',
            salary: '',
            workingDays: '',
            workingHours: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleAddUser}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <TextInput
                placeholder="Enter name"
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                style={textInputStyle}
              />
              {touched.name && errors.name && <Text style={{ color: 'red' }}>{errors.name}</Text>}

              <TextInput
                placeholder="Enter email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                style={textInputStyle}
              />
              {touched.email && errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}

              <TextInput
                placeholder="Enter phone number"
                value={values.phone}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                style={textInputStyle}
              />
              {touched.phone && errors.phone && <Text style={{ color: 'red' }}>{errors.phone}</Text>}

              <TextInput
                placeholder="Enter password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry
                style={textInputStyle}
              />
              {touched.password && errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}

              <TextInput
                placeholder="Enter position"
                value={values.position}
                onChangeText={handleChange('position')}
                onBlur={handleBlur('position')}
                style={textInputStyle}
              />
              {touched.position && errors.position && <Text style={{ color: 'red' }}>{errors.position}</Text>}

              <TextInput
                placeholder="Enter salary"
                value={values.salary}
                onChangeText={handleChange('salary')}
                onBlur={handleBlur('salary')}
                style={textInputStyle}
              />
              {touched.salary && errors.salary && <Text style={{ color: 'red' }}>{errors.salary}</Text>}

              <TextInput
                placeholder="Enter working days (e.g., Sunday-Thursday)"
                value={values.workingDays}
                onChangeText={handleChange('workingDays')}
                onBlur={handleBlur('workingDays')}
                style={textInputStyle}
              />
              {touched.workingDays && errors.workingDays && <Text style={{ color: 'red' }}>{errors.workingDays}</Text>}

              <TextInput
                placeholder="Enter working hours (e.g., 9 AM - 5 PM)"
                value={values.workingHours}
                onChangeText={handleChange('workingHours')}
                onBlur={handleBlur('workingHours')}
                style={textInputStyle}
              />
              {touched.workingHours && errors.workingHours && <Text style={{ color: 'red' }}>{errors.workingHours}</Text>}

              <TouchableOpacity
                style={{
                  width: width(60),
                  height: height(5),
                  backgroundColor: Constant.Colors.purple,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginTop: height(4),
                }}
                onPress={handleSubmit}
              >
                <Text style={{ fontSize: totalSize(2), color: Constant.Colors.white }}>Add User</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
  );
}
