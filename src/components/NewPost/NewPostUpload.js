import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PostUploader from './PostUploader';
import { Camera } from 'expo-camera';
import FetchRecent from './FetchRecent';

const UploadScreen = ({ navigation, setSelectedImage }) => {
    const [camera, setCamera] = useState(null);
    useEffect(() => {
        requestPermissions();
    }, []);

    const requestPermissions = async () => {
        try {
            const storagePermissionStatus = await AsyncStorage.getItem('storagePermission');
            const cameraPermissionStatus = await AsyncStorage.getItem('cameraPermission');
            console.log(storagePermissionStatus, cameraPermissionStatus);
            if (cameraPermissionStatus !== 'granted') {
                const { status: cameraPermission } = await ImagePicker.requestCameraPermissionsAsync();
                if (cameraStatus === 'granted') {
                    await AsyncStorage.setItem('cameraPermission', 'granted');
                } else {
                    console.error('Permission to access camera denied');
                }
            }

            if (storagePermissionStatus !== 'granted') {
                const { status: storagePermission } = await ImagePicker.requestMediaLibraryPermissionsAsync();
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
                cameraPermission === 'granted' &&
                storagePermission === 'granted'
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

        console.log(result.assets, result.canceled);

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            navigation.push('Upload')
        }
    };
    const takePhoto = async () => {
        if (camera) {
            const photo = await camera.takePictureAsync();
            setSelectedImage(photo.uri);
            navigation.push('Upload')
        }
    };

    return (

        <View style={styles.container}>
            <View className="items-center">
                <Text style={styles.title}>Choose or Take a Photo</Text>

                <Camera
                    style={styles.cameraPreview}
                    type={Camera.Constants.Type.back}
                    ref={(ref) => setCamera(ref)}
                >

                </Camera>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={pickImage}>
                        <Text style={styles.buttonText}>Gallery</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.button} onPress={takePhoto}>
                        <Text style={styles.buttonText}>Take a Photo</Text>
                    </TouchableOpacity>
                </View>
                <FetchRecent navigation={navigation} setSelectedImage={setSelectedImage} />
            </View>
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
        paddingHorizontal: 10

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff',
    },
    buttonContainer: {
        marginVertical: 30,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
    },
    button: {
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 10,
        width: '40%',
        overflow: 'hidden'
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
    cameraPreview: {
        width: 300,
        height: 400,
        borderRadius: 50,

    },
});




// const styles = StyleSheet.create({
//     container: {
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//     },
//     selectedImage: {
//         width: 400,
//         height: 400,
//         borderRadius: 10,
//         marginVertical: 10,
//         resizeMode: 'contain'
//     },
//     button: {
//         backgroundColor: '#3498db',
//         padding: 10,
//         borderRadius: 5,
//         marginVertical: 10,
//     },
//     buttonText: {
//         color: '#fff',
//         textAlign: 'center',
//     },
// });

export default UploadScreen;
