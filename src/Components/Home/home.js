import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView,Image } from 'react-native';
import { Button } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './homeStyle';
import Constant from '../../Constant/Constant';

function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  let hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12;

  const formattedTime = `${hours}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`;

  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home</Text>
        <Ionicons name="notifications-outline" size={25} />
      </View>
      <View style={styles.header2}>
      <Image
         source={require('../../Assets/images/profile.png')}
          style={styles.profileImage} 
      />
      <View>
        <Text>Good Morning - Abdulaziz</Text>
        <Text>UI Designer  </Text>
      </View>
      
      </View>




      <View style={styles.timeSection}>
        <Text style={styles.timeText}>08:07:00 AM Tuesday 23 September 2021</Text>
        <Text style={styles.timeText}>{formattedTime}</Text>

        <View style={styles.buttonsRow}>
          
          <Button mode="contained" onPress={() => console.log('Pressed')} contentStyle={styles.exitButtonContent} labelStyle={styles.exitButtonLabel}>
          Exit
          </Button>
          <Button mode="contained" onPress={() => console.log('Pressed')} contentStyle={styles.cafeButtonContent} style={styles.cafeButton}>
            <Ionicons name="cafe-outline" size={20} />
          </Button>
        </View>

        <Text style={styles.breakText}>It's a good time to take a break - Enjoy your time</Text>
      </View>

      <Text style={styles.statsTitle}>Current Month Statistics</Text>

      <View style={styles.statsRow}>
        <View style={styles.statCardLeft}>
          <Text style={[styles.statCardTextRight,styles.attend]}>Attendance</Text>
          <Text style={[styles.statCardNumber,styles.attend]}>17</Text>
        </View>
        <View style={styles.statCardRight}>
          <View style={styles.delayCard}>
            <Text style={[styles.statCardTextRight,styles.late]}> Days of Tardiness</Text>
            <Text style={[styles.statCardNumber,styles.late]}>03</Text>
          </View>
          <View style={styles.absenceCard}>
            <Text style={[styles.statCardTextRight,styles.absent]}>Days of Absence</Text>
            <Text style={[styles.statCardNumber,styles.absent]}>01</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default Home;


