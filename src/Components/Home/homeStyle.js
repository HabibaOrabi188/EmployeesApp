import { StyleSheet } from "react-native";
 const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      backgroundColor:"white"
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
         justifyContent: 'flex-end',
          marginVertical: 10,
           alignItems: 'center'
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 30, // Circular image
      },
    timeSection: {
      backgroundColor: '#D91656',
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
      fontSize: 18,
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
      fontSize: 18,
    },
    statsTitle: {
      textAlign: 'right',
      fontSize: 18,
    },
    statsRow: {
      flexDirection: 'row',
      marginTop: 10,
      marginBottom:100
    },
    statCardLeft: {
      backgroundColor: '#C7FFD8',
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
      alignSelf: 'flex-end',
      fontWeight:"bold"
    },
    statCardNumber: {
      fontSize: 20,
      fontWeight:"bold"
    },
    delayCard: {
      backgroundColor: '#FADFA1',
      justifyContent: 'center',
      padding: 10,
      height:'30%',
      marginBottom: 10,
      borderRadius: 10,
    },
    absenceCard: {
      backgroundColor: '#FF7777',
      justifyContent: 'center',
      height:'30%',
      padding: 10,
      borderRadius: 10,
    },
  });
  export default styles