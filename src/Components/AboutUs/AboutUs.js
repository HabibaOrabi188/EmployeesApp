import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Constant from '../../Constant/Constant';
import Header from '../Header';

export default function AboutUs() {
  return (
    <ScrollView >
        <Header title={'About As'}/>
      <View style={{
    flex: 1,
    padding: 20,
    backgroundColor: Constant.Colors.lightBackground,
  }}>
      <Text style={styles.title}> El-Rahma Laboratory</Text>
      <Text style={styles.description}>
        El-Rahma Laboratory is dedicated to providing high-quality laboratory services. We understand the importance of timely and accurate results in healthcare, which is why we strive to ensure every test is conducted with precision.
      </Text>
      
      <Text style={styles.subTitle}>Our Mission</Text>
      <Text style={styles.description}>
        Our mission is to enhance healthcare through innovative laboratory services, facilitating quick and reliable diagnostics for our clients.
      </Text>
      
      <Text style={styles.subTitle}>Our Vision</Text>
      <Text style={styles.description}>
        Our vision is to be a leading laboratory that exceeds client expectations by continually improving our services and implementing advanced technology in our operations.
      </Text>

      <Text style={styles.subTitle}>Our Values</Text>
      <Text style={styles.description}>
        We uphold the following core values:
      </Text>
      <Text style={styles.listItem}>• Integrity: Upholding the highest standards of ethics in all our operations.</Text>
      <Text style={styles.listItem}>• Quality: Committed to delivering superior laboratory services.</Text>
      <Text style={styles.listItem}>• Innovation: Continuously seeking new technologies to improve our processes.</Text>
      <Text style={styles.listItem}>• Customer Focus: Prioritizing the needs of our clients and their patients.</Text>

      <Text style={styles.subTitle}>Our Services</Text>
      <Text style={styles.description}>
        El-Rahma Laboratory offers a wide range of diagnostic services, including:
      </Text>
      <Text style={styles.listItem}>• Blood Tests</Text>
      <Text style={styles.listItem}>• Biochemistry Analysis</Text>
      <Text style={styles.listItem}>• Microbiology Tests</Text>
      <Text style={styles.listItem}>• Pathology Services</Text>

      
      <Text style={styles.imageCaption}>State-of-the-art Laboratory Equipment</Text>
      </View>  
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
 
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: Constant.Colors.purple,
  },
  description: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 22,
    color: Constant.Colors.darkGray,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 10,
    color: Constant.Colors.purple,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 5,
    color: Constant.Colors.grayishPurple,
  },
  labImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginVertical: 15,
  },
  imageCaption: {
    fontSize: 14,
    textAlign: 'center',
    color: Constant.Colors.darkGray,
  },
});
