import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Image, FlatList, StyleSheet } from 'react-native'; // Import FlatList correctly
import { Button } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import Header from '../Header';
import * as Animatable from 'react-native-animatable'; // Import Animatable if used

const ManagerHome = () => {
  const [persons, setPersons] = useState([]); 

  useEffect(() => {
    const fetchPersons = async () => {
      const fetchedData = [
        { id: '1', name: 'John Doe' },
        { id: '2', name: 'Jane Smith' },
        { id: '1', name: 'John Doe' },
        { id: '2', name: 'Jane Smith' },
        { id: '1', name: 'John Doe' },
        { id: '2', name: 'Jane Smith' },
      ];
      setPersons(fetchedData);
    };

    fetchPersons();
  }, []);

  const FlatList_body = (item) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
    );
  };

  return (
    <ScrollView>
      <View>
        <Header title={'Home'} />
        <View style={{ flex: 1 }}>
          <FlatList
            data={persons}
            renderItem={({ item,index }) => (
              <Animatable.View
              delay={1000 * (index + 1)}
                animation={'flipInX'}
                easing={'ease-in-cubic'}
                style={styles.animatableView}
              >
                {FlatList_body(item)}
              </Animatable.View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    // Add your styles for item container
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginVertical: 5,
  },
  itemText: {
    fontSize: 18,
    color: '#333',
  },
  animatableView: {
    width: '90%',
    marginBottom: 15,
    alignSelf: 'center',
    borderRadius: 20,
  },
});

export default ManagerHome;
