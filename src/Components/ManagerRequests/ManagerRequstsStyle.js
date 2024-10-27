import { StyleSheet } from "react-native";
import Constant from "../../Constant/Constant";

 const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 8,
        marginTop:20,
        marginHorizontal:7,
        borderRadius:15,
    },
    secondRow:{
        borderWidth:1,
        borderColor: Constant.Colors.rose,
        paddingVertical:15,
        backgroundColor:Constant.Colors.rose,
    },
    header: {
        backgroundColor: '#f1f1f1',
        borderBottomWidth: 2,
    },
    headerText: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cell: {
        flex: 1,
        textAlign: 'center',
        paddingHorizontal: 5,
        color:Constant.Colors.purple,
        fontWeight:"bold",
        fontSize:12
    },
    cellAccepted: {
        flex: 1,
        textAlign: 'center',
        paddingHorizontal: 5,
        color:Constant.Colors.green,
        fontWeight:"bold",
        fontSize:13
    },
    cellRefused: {
        flex: 1,
        textAlign: 'center',
        paddingHorizontal: 5,
        color:Constant.Colors.red,
        fontWeight:"bold",
        fontSize:13
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flex: 1,
    },
    icon: {
        paddingHorizontal: 5,
    },
    noRequestsText: {
        textAlign: 'center',
        marginVertical: 10,
        color: 'gray',
    },
});
export default styles;

