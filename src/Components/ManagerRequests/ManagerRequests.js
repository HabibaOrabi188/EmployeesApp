import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { db } from '../../../Firebase/Firebase';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importing FontAwesome icons
import Constant from '../../Constant/Constant';
import styles from './ManagerRequstsStyle';
import Header from '../Header';

function ManagerRequests() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'users'));

                const userRequests = querySnapshot.docs.map((doc) => {
                    const data = doc.data();
                    const lastRequest = data.request ? data.request[data.request.length - 1] : null;
                    return lastRequest
                        ? {
                              userId: doc.id, 
                              request: lastRequest,
                              name: data.name || 'Unknown User', 
                          }
                        : null;
                }).filter(Boolean); 

                setRequests(userRequests);
            } catch (error) {
                console.error('Error fetching user requests:', error);
            }
        };

        fetchRequests();
    }, []);

    const handleRequestStatus = async (userId, request, status) => {
        try {
            const userRef = doc(db, 'users', userId);
            const updatedRequest = { ...request, status };

            await updateDoc(userRef, {
                request: updatedRequest,
            });

            setRequests((prevRequests) =>
                prevRequests.map((req) =>
                    req.userId === userId ? { ...req, request: updatedRequest } : req
                )
            );
        } catch (error) {
            console.error('Error updating request status:', error);
        }
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>
            <Header title={'Requests'} />                
                <View style={[styles.row, styles.header]}>
                    <Text style={[styles.cell, styles.headerText]}>Name</Text>
                    <Text style={[styles.cell, styles.headerText]}>Type</Text>
                    <Text style={[styles.cell, styles.headerText]}>Start Date</Text>
                    <Text style={[styles.cell, styles.headerText]}>End Date</Text>
                    <Text style={[styles.cell, styles.headerText]}>Status</Text>
                </View>
                {requests.length > 0 ? (
                    <FlatList
                        data={requests}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={[styles.row,styles.secondRow]}>
                                <Text style={styles.cell}>{item.name}</Text>
                                <Text style={styles.cell}>{item.request.type}</Text>
                                <Text style={styles.cell}>{item.request.startDate || '_'}</Text>
                                <Text style={styles.cell}>{item.request.endDate || '_'}</Text>
                                <View style={styles.actionButtons}>
                             {item.request.status==''?<View style={styles.actionButtons}>
                                <TouchableOpacity
                                    
                                    onPress={() => handleRequestStatus(item.userId, item.request, 'Accepted')}
                                >
                                    <Icon name="check" size={20} color="green" style={styles.icon} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                
                                    onPress={() => handleRequestStatus(item.userId, item.request, 'Refused')}
                                >
                                    <Icon name="times" size={20} color="red" style={styles.icon} />
                                </TouchableOpacity>
                             </View >:<Text style={item.request.status=='Accepted'?styles.cellAccepted:styles.cellRefused}>{item.request.status}</Text>}      
                                </View>
                            </View>
                        )}
                    />
                ) : (
                    <Text style={styles.noRequestsText}>No requests found</Text>
                )}
            </View>
        </SafeAreaView>
    );
}
export default ManagerRequests;
