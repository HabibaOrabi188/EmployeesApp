import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Image, ActivityIndicator, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './homeStyle';
import Constant from '../../Constant/Constant';
import Header from '../Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../../../Firebase/Firebase';
import { collection, getDocs, query, where, doc, updateDoc, arrayUnion } from 'firebase/firestore'; 

function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userDocRef, setUserDocRef] = useState(null);

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
            setUserDocRef(doc(db, 'users', querySnapshot.docs[0].id)); // Store the document reference
          } else {
            console.log('No user found with this uid.');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert("Error", "Unable to fetch user data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userDocRef]);

  let hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const formattedTime = `${hours}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`;
  const day = `${currentTime.getDate()}/${currentTime.getMonth() + 1}/${currentTime.getFullYear()}`;

  const logAttendance = async () => {
    if (userDocRef) {
      const attendanceRecord = { date: day, time: formattedTime };

      try {
        ((hours>=10&& ampm === 'AM')||(hours >= 6 && ampm === 'PM') )?
        await updateDoc(userDocRef, {
          absenceDays: (userData.absenceDays || 0) + 1 
        })
        :
        await updateDoc(userDocRef, {
          AttendTime: arrayUnion(attendanceRecord),
        })
        console.log('Attendance time logged successfully');
        Alert.alert("Success", "Attendance logged successfully.");
      } catch (error) {
        console.error('Error logging attendance time:', error);
        Alert.alert("Error", "Unable to log attendance. Please try again later.");
      }
    } else {
      Alert.alert("Error", "User document reference is not available.");
    }
  };
  const logLeave = async () => {
    if (userDocRef) {
      const leaveRecord = { date: day, time: formattedTime };

      try {
       
        await updateDoc(userDocRef, {
          leaveTime: arrayUnion(leaveRecord),
        })
        console.log('Attendance time logged successfully');
        Alert.alert("Success", "Attendance logged successfully.");
      } catch (error) {
        console.error('Error logging attendance time:', error);
        Alert.alert("Error", "Unable to log leave. Please try again later.");
      }
    } else {
      Alert.alert("Error", "User document reference is not available.");
    }
  };

  const logLateAttendance = async () => {
    if (userDocRef && userData) {
      try {
        await updateDoc(userDocRef, {
          lateDays: (userData.lateDays || 0) + 1 
        });
        console.log('Late attendance logged successfully');
        Alert.alert("Success", "Late attendance logged successfully.");
      } catch (error) {
        console.error('Error logging late attendance:', error);
        Alert.alert("Error", "Unable to log late attendance. Please try again later.");
      }
    } else {
      Alert.alert("Error", "User document reference or data is not available.");
    }
  };

  const logEarlyLeave = async () => {
    if (userDocRef && userData) {
      try {
        await updateDoc(userDocRef, {
          earlyLeave: (userData.earlyLeave || 0) + 1 
        });
        // console.log('Late attendance logged successfully');
        // Alert.alert("Success", "Late attendance logged successfully.");
      } catch (error) {
        console.error('Error logging late attendance:', error);
        Alert.alert("Error", "Unable to log late attendance. Please try again later.");
      }
    } else {
      Alert.alert("Error", "User document reference or data is not available.");
    }
  };

  const handleLeave = () => {
    if (userData) {
      
      const isValidTime = 
        (hours >= 1 && ampm === 'AM') ||
        (hours >= 5 && ampm === 'PM');
        
      logLeave();

      if (!isValidTime) {

        logEarlyLeave(); 
      }
    }
  };



  const handleAttendancePress = () => {
    if (userData) {
      
      const isValidTime = 
        (hours <= 9 && ampm === 'AM' && (minutes <= 5 || hours < 9)) ||
        (hours <= 5 && ampm === 'PM' && (minutes <= 5 || hours < 5));
        
      logAttendance();

      if (!isValidTime) {
        // Alert.alert("Late Attendance", "You are late. Logging late attendance.");
        ((hours>=10&& ampm === 'AM')||(hours >= 6 && ampm === 'PM') )?
null
        :

        logLateAttendance(); 
      }
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color={Constant.Colors.purple} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Header title={'Home'} />
      <View style={{ paddingHorizontal: 10, flex: 1 }}>
        <View style={styles.header2}>
          <Image 
            source={{ uri: userData?.image || 'default-image-url' }} 
            style={styles.profileImage} 
            onError={() => setUserData(prev => ({ ...prev, image: 'default-image-url' }))} // Update state cleanly
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
            <Button
              mode="contained"
              onPress={() => console.log('Pressed')}
              contentStyle={styles.cafeButtonContent}
              style={styles.cafeButton}
            >
              <Ionicons name="cafe-outline" size={20} />
            </Button>
          </View>

          <Text style={styles.breakText}>It's a good time to take a break - Enjoy your time</Text>

          <View style={{ flexDirection: 'row' }}>
            <Button
              mode="contained"
              onPress={handleAttendancePress}
              contentStyle={styles.exitButtonLabel}
              style={styles.exitButtonContent}
            >
              <Text style={styles.exitButtonLabel}>Attend</Text>
            </Button>
            <Button
              mode="contained"
              onPress={handleLeave}
              contentStyle={styles.exitButtonLabel}
              style={styles.exitButtonContent}
            >
              <Text style={styles.exitButtonLabel}>Leave</Text>
            </Button>
          </View>
        </View>

        <Text style={styles.statsTitle}>Current Month Statistics</Text>

        <View style={styles.statsRow}>
          <View style={styles.workingHoursBox}>
            <Text style={[styles.statHeader, styles.working]}>Arriving late</Text>
            <Text style={[styles.statValue, styles.working]}>{userData.lateDays}</Text>
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
