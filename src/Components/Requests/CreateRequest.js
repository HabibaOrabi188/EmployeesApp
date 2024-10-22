import { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { width, height, totalSize } from 'react-native-dimension';
import Header from '../Header';
import Constant from '../../Constant/Constant';

export default function CreateRequest({onClose}) {
  const navigation = useNavigation();
  const [Vacation, setVacation] = useState(true);
  const [Permission, setPermission] = useState(false);

  // Separate states for start date and end date
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [requests,setRequests]=useState({
    type:'',
    startDate:'',
    endDate:'',

  })

  const sectionStyle = {
    width: width(89),
    padding: width(2),
    borderStyle: 'dotted',
    borderWidth: 1,
    marginLeft: width(3),
  };

  return (
    <View style={{ flex: 1 }}>
      

      <View style={{ height:height(70), alignItems: 'center',backgroundColor:'#fff' }}>
        <View
          style={{
            width: width(96),
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setPermission(true);
              setVacation(false);
            }}
            style={{
              width: width(40),
              height: height(5),
              backgroundColor: Permission ? Constant.Colors.purple : Constant.Colors.gray,
              borderRadius: 10,
              borderColor: Constant.Colors.purple,
              borderWidth: 1,
              marginTop: height(3),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text>Permission</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setVacation(true);
              setPermission(false);
            }}
            style={{
              width: width(40),
              height: height(5),
              backgroundColor: Vacation ? Constant.Colors.purple : Constant.Colors.gray,
              borderRadius: 10,
              borderColor: Constant.Colors.purple,
              borderWidth: 1,
              marginTop: height(3),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text>Vacation</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            backgroundColor: Constant.Colors.server,
            width: width(94),
            height: height(0.2),
            marginTop: height(3),
          }}
        ></View>
        <View
          style={{
            backgroundColor: Constant.Colors.server,
            width: width(94),
            height: height(0.2),
            margin: height(0.2),
          }}
        ></View>
        <Text
          style={{
            fontSize: totalSize(2.5),
            fontWeight: '600',
            width: width(92),
            marginTop: height(2),
          }}
        >
          {Vacation ? 'Vacation' : 'Permission'} Request
        </Text>


        {Vacation?
        <View
          style={{
            width: width(92),
            padding: width(1),
            margin: width(1),
          }}
        >
          <Text
            style={{
              margin: width(2),
              fontSize: totalSize(2.3),
              marginTop: height(2),
            }}
          >
            Start of Vacation
          </Text>

          <TextInput
            style={sectionStyle}
            placeholder="YYYY-MM-DD"
            keyboardType='numeric'
            value={startDate}
            onChangeText={setStartDate}
          />

          <Text
            style={{
              margin: width(2),
              fontSize: totalSize(2.2),
              marginTop: height(2.6),
            }}
          >
            End of Vacation
          </Text>

          <TextInput
            style={sectionStyle}
            placeholder="YYYY-MM-DD"
            keyboardType='numeric'
            value={endDate}
            onChangeText={setEndDate}
          />

          <Text
            style={{
              margin: width(2),
              fontSize: totalSize(2.2),
              marginTop: height(2.6),
            }}
          >
            Comment
          </Text>

          <TextInput
            multiline={true}
            style={sectionStyle}
            placeholder="Add a comment"
          />
        </View>
        :
       <Text style={{
        fontSize:totalSize(3),
        fontWeight:'600',
        margin:height(5),
        textAlign:'center',
        color:Constant.Colors.server
       }}>
        {" Do you sure you're leaving now "}
       </Text>
        }

        <TouchableOpacity
          onPress={() => {
            if (endDate.length > 0 && startDate.length > 0||Permission) {
              const request={
                type:Vacation?'Vacation':'Permission',
                startDate:startDate,
                endDate:endDate,
              }
                onClose(request);
            } else {
              Alert.alert('Complete the form');
            }
          }}
          style={{
            width: width(60),
            height: height(5),
            backgroundColor: Constant.Colors.gray,
            borderRadius: 10,
            borderColor: Constant.Colors.purple,
            borderWidth: 1,
            marginTop:Vacation? height(4):height(7),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: totalSize(2) }}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
