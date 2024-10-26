import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Image, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './homeStyle';
import Constant from '../../Constant/Constant';
import Header from '../Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../../../Firebase/Firebase'; // Adjust the import based on your project structure
import { collection, getDocs, query, where } from 'firebase/firestore';

function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const uid = await AsyncStorage.getItem('userUID');

        if (uid) {
          const userQuery = query(collection(db, 'users'), where('uid', '==', uid));
          const querySnapshot = await getDocs(userQuery);

          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0].data();
            setUserData(userDoc);
          } else {
            console.log('No user found with this uid.');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  let hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12;

  const formattedTime = `${hours}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`;

  if (loading) {
    return <ActivityIndicator size="large" color={Constant.Colors.purple} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Header title={'Home'} />
      <View style={{ paddingHorizontal: 10, flex: 1 }}>
        <View style={styles.header2}>
          <Image
            source={{uri: userData.image}}
            style={styles.profileImage}
          />
          <View>
            {userData ? (
              <>
                <Text>Good Morning - {userData.name || 'User'}</Text>
                <Text>{userData.position || 'Position'}</Text>
              </>
            ) : (
              <Text>Loading user data...</Text>
            )}
          </View>
        </View>

        <View style={styles.timeSection}>
          <Text style={styles.timeText}>{formattedTime}</Text>

          <View style={styles.buttonsRow}>
            
            <Button mode="contained" onPress={() => console.log('Pressed')} contentStyle={styles.cafeButtonContent} style={styles.cafeButton}>
              <Ionicons name="cafe-outline" size={20} />
            </Button>
          </View>

          <Text style={styles.breakText}>It's a good time to take a break - Enjoy your time</Text>
        </View>

        <Text style={styles.statsTitle}>Current Month Statistics</Text>

        <View style={styles.statsRow}>
        <View style={styles.workingHoursBox}>
        <Text style={[styles.statHeader,styles.working]}>Arriving late</Text>
        <Text style={[styles.statValue,styles.working]}>{userData.lateDays}</Text>
        </View>
          <View style={styles.statCardRight}>
            <View style={styles.delayCard}>
              <Text style={[styles.statCardTextRight, styles.late]}>Leave early </Text>
              <Text style={[styles.statCardNumber, styles.late]}>{userData.earlyLeave}</Text>
            </View>
            <View style={styles.absenceCard}>
              <Text style={[styles.statCardTextRight, styles.absent]}>Days of Absence</Text>
              <Text style={[styles.statCardNumber, styles.absent]}>{userData.absenceDays}</Text>
            </View>

          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default Home;
