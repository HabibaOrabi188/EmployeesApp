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
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import images from '../../Constant/Images';
import * as Yup from 'yup';
import {PaperProvider, TextInput} from 'react-native-paper';
import {width, height, totalSize} from 'react-native-dimension';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Formik} from 'formik';
import Constant from '../../Constant/Constant';
import { auth } from '../../../Firebase/Firebase';  // Adjust the import based on your project structure
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const navigation = useNavigation();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        'Password must be at least 6 characters, including letters and numbers',
      )
      .required('Password is required'),
  });

  const handleSubmit = async (values) => {
    try {
      // Sign in the user
      await signInWithEmailAndPassword(auth, values.email, values.password);
      // Navigate to Home screen on successful login
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error signing in:', error);
      // Handle error messages based on the error code
      if (error.code === 'auth/user-not-found') {
        alert('User not found. Please register.');
      } else if (error.code === 'auth/wrong-password') {
        alert('Incorrect password. Please try again.');
      } else {
        alert('Error logging in. Please try again later.');
      }
    }
  };

  return (
    <PaperProvider>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}>
        <ScrollView>
          <View style={{flex: 1, alignItems: 'center', padding: height(4)}}>
            <Animatable.Image
              source={images.logo}
              animation="zoomIn"
              style={{width: width(100), height: height(45)}}
              duration={4000}
            />
            <Formik
              initialValues={{email: '', password: ''}}
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
                    <View style={{width: width(90)}}>
                      <Text style={{color: 'red', marginBottom: height(1)}}>
                        {errors.email}
                      </Text>
                    </View>
                  ) : null}

                  <TextInput
                    style={{width: width(90), height: height(7), marginTop: height(2.6)}}
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
                    <View style={{width: width(90)}}>
                      <Text style={{color: 'red', marginBottom: height(1)}}>
                        {errors.password}
                      </Text>
                    </View>
                  ) : null}

                  <TouchableOpacity
                    style={{
                      width: width(70),
                      height: height(6),
                      backgroundColor: Constant.Colors.purple,
                      marginTop: height(5),
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
                      Login
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
            <View style={{ flexDirection: 'row', alignItems: 'center', margin: height(2) }}>
              <Text style={{ color: Constant.Colors.server }}>
                If you don't have an account,
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Register');
                }}>
                <Text style={{ color: Constant.Colors.purple, marginRight: width(1), fontWeight: '700' }}>
                  Register now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
}
