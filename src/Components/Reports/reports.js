import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './reportsStyle';
import Constant from '../../Constant/Constant';
import Header from '../Header';

function Reports() {
  return (
    <ScrollView style={styles.scrollView}>
      <Header title={'Reports'}/>
      <View style={{paddingHorizontal:10}}>

      

      <View style={styles.subHeader}>
        <Text>Statistics for the current month</Text>
        <Text>October 2021</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <View style={[styles.statInnerBox, styles.attendanceBox]}>
            <Text style={[styles.statHeader,styles.attend]}>Attendance</Text>
            <Text style={[styles.statValue,styles.attend]}>73%</Text>
          </View>
          <View style={[styles.statInnerBox, styles.leaveEarlyBox]}>
            <Text style={[styles.statHeader,styles.late]}>Leave early</Text>
            <Text style={[styles.statValue,styles.late]}>04</Text>
          </View>
        </View>

        <View style={[styles.statBox, styles.marginHorizontal]}>
          <View style={[styles.statInnerBox, styles.absenceBox]}>
            <Text style={[styles.statHeader,styles.absent]}>Absence</Text>
            <Text style={[styles.statValue,styles.absent]}>73%</Text>
          </View>
          <View style={[styles.statInnerBox, styles.arrivingLateBox]}>
            <Text style={[styles.statHeader,styles.late]}>Arriving late</Text>
            <Text style={[styles.statValue,styles.late]}>08</Text>
          </View>
        </View>

        <View style={styles.workingHoursBox}>
          <Text style={[styles.statHeader,styles.working]}>Number of working hours</Text>
          <Text style={[styles.statValue,styles.working]}>127</Text>
        </View>
      </View>

      <View style={styles.detailsHeader}>
        <Text style={styles.detailsHeaderText}>Details of the month</Text>
      </View>

      {/* Date Entries */}
      <View style={styles.dateEntry}>
        <View>
          <Text>09 Thursday</Text>
        </View>
        <View style={[styles.statusBox, styles.attendanceStatus]}>
          <Text style={styles.attend}>attend</Text>
        </View>
      </View>

      <View style={styles.dateEntry}>
        <View>
          <Text>08 Wednesday</Text>
        </View>
        <View style={[styles.statusBox, styles.absentStatus]}>
          <Text style={styles.absent}>absent</Text>
        </View>
      </View>

      <View style={styles.dateEntry}>
        <View>
          <Text>07 Tuesday</Text>
        </View>
        <View style={[styles.statusBox, styles.lateStatus]}>
          <Text style={styles.late}>late</Text>
        </View>
      </View>

      </View>
    </ScrollView>
  );
}



export default Reports;
