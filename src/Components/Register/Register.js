/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/self-closing-comp */
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import { useNavigation } from '@react-navigation/native';
  import * as Animatable from 'react-native-animatable';
  import images from '../../Constant/Images';
  import * as Yup from 'yup';
  import { PaperProvider, TextInput } from 'react-native-paper';
  import { width, height, totalSize } from 'react-native-dimension';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  import { Formik } from 'formik';
  import Constant from '../../Constant/Constant';
  import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { getFirestore, collection, addDoc,setDoc,doc } from 'firebase/firestore';
  import { db } from '../../../Firebase/Firebase'; 
  export default function Register() {
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
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const handleSubmit = async (values) => {
      const auth = getAuth();
      try {
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
        const user = userCredential.user;

        // Store user token in AsyncStorage
        await AsyncStorage.setItem('userToken', user.uid);

        await addDoc(collection(db, 'users'), {
            uid: user.uid,
            name: values.name,
            email: values.email,
            phone: values.phone,
          });

        // Navigate to the Home screen
        navigation.navigate('Home');
      } catch (error) {
        console.log('Error during registration:', error);
        alert('Registration failed. Please try again.');
      }
    };

    return (
      <ScrollView>
        <View style={{ flex: 1, alignItems: 'center', paddingTop: height(2) }}>
          <Animatable.Image
              source={images.MaimLogo}
              animation="zoomIn"
              style={{ width: width(100), height: height(35) }}
              duration={4000}
              resizeMode='contain'
          />
          <Formik
              initialValues={{ name:'',email: '', phone: '', password: '', confirmPassword: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}>
              {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
              }) => (
                  <>

<TextInput
                          placeholder="Enter your email"
                          label="Name"
                          mode="outlined"
                          value={values.name}
                          onChangeText={handleChange('name')}
                          onBlur={handleBlur('name')}
                          style={{
                              width: width(90),
                              height: height(7),
                              marginTop: height(-6),
                              borderRadius: 20,
                          }}
                      />
                      {touched.name && errors.name ? (
                          <View style={{ width: width(90) }}>
                              <Text style={{ color: 'red', marginBottom: height(1) }}>
                                  {errors.name}
                              </Text>
                          </View>
                      ) : null}
                      <TextInput
                          placeholder="Enter your email"
                          label="Email"
                          mode="outlined"
                          value={values.email}
                          onChangeText={handleChange('email')}
                          onBlur={handleBlur('email')}
                          style={{
                              width: width(90),
                              height: height(7),
                              marginTop: height(-6),
                              borderRadius: 20,
                          }}
                      />
                      {touched.email && errors.email ? (
                          <View style={{ width: width(90) }}>
                              <Text style={{ color: 'red', marginBottom: height(1) }}>
                                  {errors.email}
                              </Text>
                          </View>
                      ) : null}

                      <TextInput
                          placeholder="Enter your phone number"
                          label="Phone"
                          mode="outlined"
                          value={values.phone}
                          onChangeText={handleChange('phone')}
                          onBlur={handleBlur('phone')}
                          style={{
                              width: width(90),
                              height: height(7),
                              marginTop: height(2),
                              borderRadius: 20,
                          }}
                      />
                      {touched.phone && errors.phone ? (
                          <View style={{ width: width(90) }}>
                              <Text style={{ color: 'red', marginBottom: height(1) }}>
                                  {errors.phone}
                              </Text>
                          </View>
                      ) : null}

                      <TextInput
                          style={{
                              width: width(90),
                              height: height(7),
                              marginTop: height(2.6),
                          }}
                          mode="outlined"
                          label="Password"
                          placeholder="Enter your password"
                          value={values.password}
                          onChangeText={handleChange('password')}
                          onBlur={handleBlur('password')}
                          secureTextEntry
                          right={
                              <TouchableOpacity>
                                  <MaterialCommunityIcons
                                      name="lock"
                                      size={24}
                                      color="#f00"
                                  />
                              </TouchableOpacity>
                          }
                      />
                      {touched.password && errors.password ? (
                          <View style={{ width: width(90) }}>
                              <Text style={{ color: 'red', marginBottom: height(1) }}>
                                  {errors.password}
                              </Text>
                          </View>
                      ) : null}

                      <TextInput
                          style={{
                              width: width(90),
                              height: height(7),
                              marginTop: height(2.6),
                          }}
                          mode="outlined"
                          label="Confirm Password"
                          placeholder="Confirm your password"
                          value={values.confirmPassword}
                          onChangeText={handleChange('confirmPassword')}
                          onBlur={handleBlur('confirmPassword')}
                          secureTextEntry
                          right={
                              <TouchableOpacity>
                                  <MaterialCommunityIcons
                                      name="lock"
                                      size={24}
                                      color="#f00"
                                  />
                              </TouchableOpacity>
                          }
                      />
                      {touched.confirmPassword && errors.confirmPassword ? (
                          <View style={{ width: width(90) }}>
                              <Text style={{ color: 'red', marginBottom: height(1) }}>
                                  {errors.confirmPassword}
                              </Text>
                          </View>
                      ) : null}

                      <TouchableOpacity
                          style={{
                              width: width(70),
                              height: height(6),
                              backgroundColor: Constant.Colors.purple,
                              marginTop: height(3),
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: 15,
                          }}
                          onPress={handleSubmit}>
                          <Text
                              style={{
                                  color: Constant.Colors.rose,
                                  fontSize: totalSize(3),
                              }}>
                              Register
                          </Text>
                      </TouchableOpacity>
                  </>
              )}
          </Formik>
          <View style={{ flexDirection: 'row', alignItems: 'center', margin: height(2) }}>
            <Text style={{ color: Constant.Colors.server }}>
              If you have an account,
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Text style={{ color: Constant.Colors.purple, marginRight: width(1), fontWeight: '700' }}>
                Login now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
