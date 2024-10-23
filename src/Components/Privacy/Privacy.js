import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../Header'; // Assuming you have a Header component
import { width, height } from 'react-native-dimension';
import Constant from '../../Constant/Constant';

export default function Privacy() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <Header title={'Privacy Policy'} />
      <View style={styles.content}>
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.paragraph}>
          This Privacy Policy outlines how we collect, use, and protect your information when you use our app. By using the app, you agree to the collection and use of information in accordance with this policy.
        </Text>
        
        <Text style={styles.subtitle}>Information Collection</Text>
        <Text style={styles.paragraph}>
          We collect personal information that you provide to us, such as your name, email address, and phone number when you register or contact us.
        </Text>

        <Text style={styles.subtitle}>Use of Information</Text>
        <Text style={styles.paragraph}>
          The information we collect is used to improve our services and provide a better user experience. We do not share your personal information with third parties without your consent.
        </Text>

        <Text style={styles.subtitle}>Data Security</Text>
        <Text style={styles.paragraph}>
          We take the security of your personal information seriously. We implement reasonable security measures to protect your information from unauthorized access, use, or disclosure.
        </Text>

        <Text style={styles.subtitle}>Changes to This Privacy Policy</Text>
        <Text style={styles.paragraph}>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
        </Text>

        <Text style={styles.subtitle}>Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have any questions about this Privacy Policy, please contact us at support@example.com.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constant.Colors.gray,
  },
  content: {
    padding: width(5),
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: height(2),
    textAlign: 'center',
    color: Constant.Colors.purple,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: height(2),
    marginBottom: height(1),
    color: Constant.Colors.grayishPurple,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: height(1.5),
    color: Constant.Colors.black,
    lineHeight: 24,
  },
});
