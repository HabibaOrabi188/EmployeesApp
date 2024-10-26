import { StyleSheet } from "react-native";
import Constant from "../../Constant/Constant";
 const styles = StyleSheet.create({
    container: {
      backgroundColor:Constant.Colors.white
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    headerTitle: {
      textAlign: 'right',
      fontSize: 18,
    },
    header2:{
        flexDirection:"row",
          marginVertical: 10,
           alignItems: 'center'
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 30,
        marginRight:10
         // Circular image
      },
    timeSection: {
      backgroundColor: Constant.Colors.pink,
      paddingVertical: 40,
      paddingHorizontal:20,
      borderRadius: 10,
      margin: 30,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    timeText: {
      color: 'white',
      fontSize: 16,
    },
    buttonsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 10,
    },
    cafeButtonContent: {
      backgroundColor: '#FFA24C',
    },
    cafeButton: {
      marginHorizontal: 10,
    },
    exitButtonContent: {
      backgroundColor: 'white',
      paddingHorizontal: 10,
    },
    exitButtonLabel: {
      color: 'black',
    },
    breakText: {
      color: 'white',
      fontSize: 16,
    },
    statsTitle: {
      fontSize: 18,
    },
    statsRow: {
      flexDirection: 'row',
      marginTop: 10,
      marginBottom:100
    },
    statCardLeft: {
      backgroundColor: Constant.Colors.attendBackground,
      justifyContent: 'center',
      width: '48%',
      height:'45%',
      marginTop:'10%',
      borderRadius: 10,
      marginRight: '4%',
      padding: 10,
    },
    statCardRight: {
      width: '48%',
      borderRadius: 10,
      padding: 10,
    },
    statCardTextRight: {
      fontSize: 16,

      fontWeight:"bold"
    },
    statCardNumber: {
      fontSize: 20,
      fontWeight:"bold",
      alignSelf: 'flex-end',
    },
    delayCard: {
      backgroundColor: Constant.Colors.lateBackground,
      justifyContent: 'center',
      padding: 10,
      height:'30%',
      marginBottom: 10,
      borderRadius: 10,
    },
    absenceCard: {
      backgroundColor: Constant.Colors.absentBackground,
      justifyContent: 'center',
      height:'30%',
      padding: 10,
      borderRadius: 10,
    },
    attend:{
      color:Constant.Colors.green
    },
    absent:{
      color:Constant.Colors.red
    },
    late:{
      color:Constant.Colors.late 
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
    working:{
      color:Constant.Colors.white
  }
  });
  export default styles