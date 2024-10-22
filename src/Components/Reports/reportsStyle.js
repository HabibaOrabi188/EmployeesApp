import { StyleSheet } from "react-native";
import Constant from "../../Constant/Constant";

const styles = StyleSheet.create({
    scrollView: {
      // paddingHorizontal: 10,
      // paddingTop:10
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    headerText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    subHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    statsContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    statBox: {
      width: '30%',
    },
    marginHorizontal: {
      marginHorizontal: 10,
    },
    statInnerBox: {
      borderRadius: 15,
      padding: 10,
      height: 100,
      justifyContent: 'center',
      marginBottom: 10,
    },
    attendanceBox: {
      backgroundColor: '#C7FFD8',
    },
    leaveEarlyBox: {
      backgroundColor: '#FADFA1',
    },
    absenceBox: {
      backgroundColor: '#FF7777',
    },
    arrivingLateBox: {
      backgroundColor: '#FADFA1',
    },
    workingHoursBox: {
      backgroundColor: '#FF885B',
      borderRadius: 15,
      padding: 10,
      width: '35%',
      height: 220,
      justifyContent: 'center',
    },
    statHeader:{
      fontSize:15,
      fontWeight:"bold"
    },
    statValue: {
      alignSelf: 'flex-end',
      fontSize:18,
      fontWeight:"bold"
    },
    detailsHeader: {
      marginBottom: 30,
    },
    detailsHeaderText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    dateEntry: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 2,
      elevation: 5,
      padding: 10,
      borderRadius: 15,
      backgroundColor: 'white',
      marginBottom: 10,
      alignItems: 'center',
    },
    statusBox: {
      borderRadius: 15,
      padding: 10,
      width:"18%",
      alignItems:"center"
    },
    attendanceStatus: {
      backgroundColor: Constant.Colors.attendBackground,
    },
    absentStatus: {
      backgroundColor: Constant.Colors.absentBackground,
    },
    lateStatus: {
      backgroundColor: Constant.Colors.lateBackground,
    },
    attend:{
        color:Constant.Colors.green,
    },
    absent:{
        color:Constant.Colors.red
    },
    late:{
        color:Constant.Colors.late 
    },
    working:{
        color:Constant.Colors.white
    }
  });
  export default styles