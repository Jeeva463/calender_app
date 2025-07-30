import React, { useEffect } from 'react';
import {
    View,
    Text,
    Image,
} from 'react-native';
import momentJS from 'moment';
import styles from './styleFirstScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    return (
        <View style={styles.homeView}>
            <View style={styles.imageView}>
                <Image
                    source={require('../assets/images/chopenew.png')}
                    style={styles.images}
                    resizeMode={"contain"}
                />
            </View>
            <View style={styles.coprightView}>
                <Text style={styles.copyRightText}>Copyright @{momentJS().local().format('YYYY')} AiTS. All rights reserved</Text>
            </View>
            <View style={styles.FooterContainer}>
                <Image source={require('../assets/images/AiTS.png')} style={styles.footerImage} />
            </View>
        </View>
    )
};


const FirstPage = () => {

    const navigation = useNavigation();

    useEffect(() => {
        const onTimeOut = setTimeout(() => {
            getSession();
        }, 9000);
        return () => {
            console.log("clear")
            clearTimeout(onTimeOut);
        };
    }, []);
    
    const getSession =async() => {
        var data = await AsyncStorage.getItem('roomName');
        if (data) {
            data = JSON.parse(data);
        }
        // if (data && data.roomName) {                
            navigation.navigate('MainScreen', {
              roomMail: 'meetingroom@fiber-transmission.com',
              roomName: 'meetingroom@fiber-transmission.com',
            });
        // } else {
            // navigation.navigate('LoginPage');
        // }
    }
    return (
        <Home />
    );
}

export default FirstPage;
