import { StyleSheet } from "react-native";
import Constant from "../../Constant/Constant";
import {width, height, totalSize} from 'react-native-dimension';
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
      marginTop: 10,
      height:height(25),
      alignItems:'center',
      alignSelf:'center'
    },
    statCardRight: {
      width: '90%',
      borderRadius: 10,
      flexDirection:'row',
      height: height(10),
      justifyContent:'space-between',
      marginTop:height(3),
      paddingHorizontal:width(2)
    },
    statCardTextRight: {
      fontSize: 16,

      fontWeight:'600'
    },
    statCardNumber: {
      fontSize: 16,
      fontWeight:"bold",
      alignSelf: 'flex-end',
    },
    delayCard: {
      backgroundColor: Constant.Colors.lateBackground,
      justifyContent: 'center',
      paddingHorizontal:width(2),
      height: height(10),
      borderRadius: 10,
      width:width(38)
    },
    absenceCard: {
      backgroundColor: Constant.Colors.absentBackground,
      justifyContent: 'center',
      height: height(10),
      paddingHorizontal:width(2),
      borderRadius: 10,
      width:width(38)
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
      width:width(70),
      height: height(10),
      justifyContent: 'center',
      paddingHorizontal:width(10)
      
    },
    statHeader:{
      fontSize:15,
      fontWeight:"700",
      color:'#db6d45'
    },
    statValue: {
      alignSelf: 'flex-end',
      fontSize:18,
      fontWeight:"bold",
      color:'#db6d45'
    },
    working:{
      color:'#c45c36'
  }
  });
  export default styles