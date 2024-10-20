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
        <Ionicons name="notifications-outline" size={25} />
        <Text style={styles.headerTitle}>الرئيسية</Text>
      </View>
      <View style={styles.header2}>
      <View>
        <Text>صباح الخير - عبد العزيز</Text>
        <Text>مصمم واجهات الاستخدام</Text>
      </View>
       <Image
         source={require('../../Assets/images/profile.png')}
          style={styles.profileImage} 
      />
      </View>




      <View style={styles.timeSection}>
        <Text style={styles.timeText}>08:07:00 AM 2021-الثلاثاء 23 سبتمبر</Text>
        <Text style={styles.timeText}>{formattedTime}</Text>

        <View style={styles.buttonsRow}>
          <Button mode="contained" onPress={() => console.log('Pressed')} contentStyle={styles.cafeButtonContent} style={styles.cafeButton}>
            <Ionicons name="cafe-outline" size={20} />
          </Button>
          <Button mode="contained" onPress={() => console.log('Pressed')} contentStyle={styles.exitButtonContent} labelStyle={styles.exitButtonLabel}>
            انصراف
          </Button>
        </View>

        <Text style={styles.breakText}>الوقت مناسب لاخذ الاستراحة-تمتع بوقتك</Text>
      </View>

      <Text style={styles.statsTitle}>احصائيات الشهر الحالى</Text>

      <View style={styles.statsRow}>
        <View style={styles.statCardLeft}>
          <Text style={[styles.statCardTextRight,styles.attend]}>الحضور</Text>
          <Text style={[styles.statCardNumber,styles.attend]}>17</Text>
        </View>
        <View style={styles.statCardRight}>
          <View style={styles.delayCard}>
            <Text style={[styles.statCardTextRight,styles.late]}>ايام التاخير</Text>
            <Text style={[styles.statCardNumber,styles.late]}>03</Text>
          </View>
          <View style={styles.absenceCard}>
            <Text style={[styles.statCardTextRight,styles.absent]}>ايام الغياب</Text>
            <Text style={[styles.statCardNumber,styles.absent]}>01</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default Home;


