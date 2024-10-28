import { View, Text, TouchableOpacity, ScrollView, Alert,TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { width, height, totalSize } from 'react-native-dimension';
import { PaperProvider, } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
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
      // Step 1: Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      // Step 2: Add user to Firestore
      await addDoc(collection(db, 'users'), {
        name: values.name,
        email: values.email,
        phone: values.phone,
        position: values.position,
        salary: values.salary,
        days: values.workingDays,
        hours: values.workingHours,
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCbU49DD_iYcjSUEXG-Oy7POjJzaMn1GYEZg&s',
        absenceDays:0,
        earlyLeave:0,
        lateDays:0,
        leaveTime:[],
        uid:user.uid,


      });

      Alert.alert('User added successfully!');
      onClose();
    } catch (error) {
      console.error('Error adding user:', error);
      Alert.alert('Failed to add user. Please try again.');
    }
  };
  const textInputStyle={
    borderBottomWidth:1,
    borderBottomColor:Constant.Colors.purple,
    marginHorizontal:height(1.6),
    marginVertical:width(1.7)
}
  return (
      <View style={{ flex: 1,backgroundColor:'#fff',padding:10 }}>
        <Text style={{ textAlign: 'center', fontSize: totalSize(2.6), color: Constant.Colors.grayishPurple, marginBottom: height(2) }}>
          New Employee
        </Text>
        <Formik
          initialValues={{ name: '', email: '', phone: '', password: '', position: '', salary: '', workingDays: '', workingHours: '' }}
          validationSchema={validationSchema}
          onSubmit={handleAddUser}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <TextInput
                label="Name"
                placeholder="Enter name"
                mode="outlined"
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                style={textInputStyle}
              />
              {touched.name && errors.name && <Text style={{ color: 'red' }}>{errors.name}</Text>}
              
              <TextInput
                label="Email"
                placeholder="Enter email"
                mode="outlined"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                style={textInputStyle}
              />
              {touched.email && errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}

              <TextInput
                label="Phone"
                placeholder="Enter phone number"
                mode="outlined"
                value={values.phone}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                style={textInputStyle}
              />
              {touched.phone && errors.phone && <Text style={{ color: 'red' }}>{errors.phone}</Text>}

              <TextInput
                label="Password"
                placeholder="Enter password"
                mode="outlined"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry
                style={textInputStyle}
              />
              {touched.password && errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}

              <TextInput
                label="Position"
                placeholder="Enter position"
                mode="outlined"
                value={values.position}
                onChangeText={handleChange('position')}
                onBlur={handleBlur('position')}
                style={textInputStyle}
              />
              {touched.position && errors.position && <Text style={{ color: 'red' }}>{errors.position}</Text>}

              <TextInput
                label="Salary"
                placeholder="Enter salary"
                mode="outlined"
                value={values.salary}
                onChangeText={handleChange('salary')}
                onBlur={handleBlur('salary')}
                style={textInputStyle}
              />
              {touched.salary && errors.salary && <Text style={{ color: 'red' }}>{errors.salary}</Text>}

              <TextInput
                label="Working Days"
                placeholder="Enter working days (e.g., Sunday-Thursday)"
                mode="outlined"
                value={values.workingDays}
                onChangeText={handleChange('workingDays')}
                onBlur={handleBlur('workingDays')}
                style={textInputStyle}
              />
              {touched.workingDays && errors.workingDays && <Text style={{ color: 'red' }}>{errors.workingDays}</Text>}

              <TextInput
                label="Working Hours"
                placeholder="Enter working hours (e.g., 9 AM - 5 PM)"
                mode="outlined"
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
                  marginTop: height(7),
                }}
                onPress={handleSubmit}
              >
                <Text style={{ fontSize: totalSize(2), color: Constant.Colors.white }}>Add User</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
  );
}
