import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    PermissionsAndroid,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import AsyncStorage from '@react-native-async-storage/async-storage';

const UploadScreen = () => {
    const [selectedImage, setSelectedImage] = useState([]);
    useEffect(() => {
        requestPermissions();
    }, []);

    const requestPermissions = async () => {
        try {
            const storagePermissionStatus = await AsyncStorage.getItem('storagePermission');
            const cameraPermissionStatus = await AsyncStorage.getItem('cameraPermission');
            if (!cameraPermissionStatus !== 'granted') {
                const cameraPermission = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'This app needs access to your camera to take pictures.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                );
                if (cameraPermission === PermissionsAndroid.RESULTS.GRANTED) {
                    await AsyncStorage.setItem('cameraPermission', 'granted');
                } else {
                    console.error('Camera permission denied');
                }
            }

            if (storagePermissionStatus !== 'granted') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status === 'granted') {
                    await AsyncStorage.setItem('storagePermission', 'granted');
                } else {
                    console.error('Permission to access media library denied');
                }
            }
            if (cameraPermissionStatus === 'granted' && storagePermissionStatus === 'granted') {
                console.log('Permissions Already granted');
            }
            else if (
                cameraPermission === PermissionsAndroid.RESULTS.GRANTED &&
                storagePermission === PermissionsAndroid.RESULTS.GRANTED
            ) {
                console.log('Permissions granted');
            } else {
                console.log('Permissions denied');
            }
        } catch (error) {
            console.error('Error requesting permissions:', error);
        }
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setSelectedImage(result.assets);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Upload Screen</Text>

            {selectedImage.map((image, index) => (
                <Image source={{ uri: image.uri }} style={styles.selectedImage}
                    key={index}
                />
            ))}

            <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text style={styles.buttonText}>Choose from Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}  >
                <Text style={styles.buttonText}>Capture from Camera</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    selectedImage: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
});

export default UploadScreen;
