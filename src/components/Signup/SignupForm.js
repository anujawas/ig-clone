import { Alert, Pressable, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Divider, Image } from 'react-native-elements'


import { Formik } from 'formik'
import * as Yup from 'yup'
import validator from 'email-validator'

import { firebase, db } from '../../../firebase'
import { useLoading } from '../../../LoadingContext'
import { useAuth } from '../../../AuthContext'
const IG_LOGO = 'https://www.shawspaving.co.uk/wp-content/uploads/2019/01/instagram-font-logo-white-png-350x133.png'

import ProfilePicUpload from '../Profilepic/profilePicHandler'
import useUploadMedia from '../../hooks/useUploadMedia'

const SignUpForm = ({ navigation }) => {
    const { setCurrentUser } = useAuth()
    const [secureTextEntry, setSecureTextEntry] = useState(true)

    const SignUpFormSchema = Yup.object().shape({
        email: Yup.string()
            .required('An email is Required')
            .email('Invalid email address')
            .test('email', 'Email address must be valid', (value) => validator.validate(value)),
        username: Yup.string()
            .required('Required')
            .min(6, 'Username must be at least 6 characters'),
        password: Yup.string()
            .required('Required')
            .min(6, 'Password must be at least 6 characters')
    })

    const verify_username = async (username) => {
        const userExist = await db.collection('users')
            .doc(username).get()

        return userExist
    }
    const [authCredential, setAuthCredentials] = useState({})

    const create_user = async (email, password) => {
        const authCredential = await firebase.auth().createUserWithEmailAndPassword(email, password)
        return authCredential;

    }
    const { uploadMedia } = useUploadMedia()

    const UploadProfilePic = async (selectedImage) => {
        const img = await uploadMedia(selectedImage, 'profilePic');
        console.log(img);
        return img;
    }
    const { setLoading } = useLoading()
    const handleform1 = async (email, password, username) => {
        try {
            setLoading(true);
            const userExist = await verify_username(username);
            if (userExist.exists) {
                throw TypeError(`Username ${username} already exists. Kindly try another Username.`)
            }
            const authCredential = await create_user(email, password);
            setAuthCredentials(authCredential)
            setSelectImageStage(true);
        }
        catch (error) {
            Alert.alert("Error", "Something Went Wrong!")
        }
        finally {
            setLoading(false);
        }

    }

    const onSignUp = async (email, password, username, selectedImage) => {
        setLoading(true)
        try {
            const imgUrl = await UploadProfilePic(selectedImage);
            ToastAndroid.showWithGravityAndOffset(
                "New Account Created Successfully.",
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
                0, 200
            )

            await db.collection('users')
                .doc(username)
                .set({
                    owner_uid: authCredential.user?.uid,
                    username: username,
                    email: authCredential.user?.email,
                    profilePic: imgUrl
                })
            setCurrentUser(true)

        } catch (error) {
            Alert.alert('Error', error.message)
        }
        setLoading(false)
    }

    const [selectImageStage, setSelectImageStage] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null)
    return (
        <>

            <View style={{ flex: 1, justifyContent: 'space-between' }} >
                <Formik
                    initialValues={{ email: '', username: '', password: '' }}
                    onSubmit={(values) => { onSignUp(values.email, values.password, values.username, selectedImage) }}
                    validationSchema={SignUpFormSchema}
                    validateOnMount={true}

                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => {
                        if (selectedImage) {
                            return (
                                <View className="items-center flex-1 justify-around">
                                    <View className="flex-1 items-center w-full h-[70%]" style={{ marginHorizontal: 10 }}>
                                        <Image source={{ uri: `${selectedImage}` }}
                                            style={{ width: 350, height: 500, resizeMode: 'contain' }} />

                                        <Divider width={0.2}
                                            orientation='vertical' />
                                    </View>
                                    <View className="h-[30%] w-full justify-center items-center">
                                        <Pressable style={styles.submitButton} onPress={handleSubmit} disabled={selectedImage === null ? true : false}>
                                            <Text className="text-white font-semibold text-md">
                                                Upload
                                            </Text>
                                        </Pressable>
                                    </View>
                                </View>
                            )
                        }
                        else if (selectImageStage) {
                            return (
                                <ProfilePicUpload setSelectedImage={setSelectedImage} />
                            )
                        }
                        return (
                            <>
                                <View style={styles.logoContainer}>
                                    <Image
                                        source={{
                                            uri: IG_LOGO
                                        }}
                                        style={{
                                            width: 200,
                                            height: 100,
                                            resizeMode: 'contain'
                                        }}
                                    />
                                </View>
                                <View style={{
                                    marginHorizontal: 5,
                                    marginBottom: 150

                                }}>

                                    <View style={[styles.inputFields,
                                    {
                                        borderColor: values.email.length < 1 || validator.validate(values.email) ? '#444' : 'red',
                                        borderWidth: errors.email ? 1 : 0,
                                    }]}>
                                        <TextInput
                                            placeholderTextColor={'#777'}
                                            placeholder={'Email'}
                                            autoCapitalize='none'
                                            keyboardType='email-address'
                                            textContentType={'emailAddress'}
                                            autoFocus={true}
                                            style={styles.inputField}
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                            value={values.email}
                                        />
                                    </View>
                                    <View style={[styles.inputFields,
                                    {
                                        borderColor: values.username.length < 1 || values.username.length >= 6 ? '#444' : 'red',
                                        borderWidth: errors.username ? 1 : 0,
                                    }]}>
                                        <TextInput
                                            placeholderTextColor={'#777'}
                                            placeholder={'Username'}
                                            autoCapitalize='none'
                                            keyboardType='email-address'
                                            textContentType={'username'}
                                            style={styles.inputField}
                                            onChangeText={handleChange('username')}
                                            onBlur={handleBlur('username')}
                                            value={values.username}
                                        />
                                    </View>

                                    <View style={[styles.inputFields, {
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        borderColor: 1 > values.password.length || values.password.length >= 6 ? '#444' : 'red',
                                        borderWidth: errors.password ? 1 : 0,


                                    }]}>
                                        <TextInput
                                            placeholderTextColor={'#777'}
                                            placeholder={'Password'}
                                            autoCapitalize='none'
                                            secureTextEntry={secureTextEntry}
                                            textContentType='password'
                                            autoCorrect={false}
                                            style={styles.inputField}
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('password')}
                                            value={values.password}
                                        />
                                        <TouchableOpacity onPress={() => {
                                            if (secureTextEntry) {
                                                setSecureTextEntry(false)
                                            } else {
                                                setSecureTextEntry(true)
                                            }
                                        }}>
                                            <Image source={{ uri: secureTextEntry ? 'https://img.icons8.com/material-outlined/24/FFFFFF/visible--v1.png' : 'https://img.icons8.com/material-sharp/96/FFFFFF/invisible.png' }}
                                                style={{
                                                    width: 20,
                                                    height: 20,
                                                    right: 10,
                                                }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <Pressable style={styles.button(isValid)} disabled={!isValid} onPress={() => handleform1(values.email, values.password, values.username)}>
                                        <Text className="text-white font-semibold
                text-md
                "
                                        >
                                            Add a Profile picture
                                        </Text>
                                    </Pressable>


                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                                        <View style={{ flex: 1, height: 1, backgroundColor: '#777' }} />
                                        <View>
                                            <Text style={{ width: 50, textAlign: 'center', color: '#777' }}>OR</Text>
                                        </View>
                                        <View style={{ flex: 1, height: 1, backgroundColor: '#777' }} />
                                    </View>


                                    <Pressable style={[styles.button(true), {
                                        flexDirection: 'row',
                                        marginTop: 20
                                    }]}>
                                        <Image
                                            source={{ uri: 'https://img.icons8.com/ios-filled/50/FFFFFF/facebook-new.png' }}
                                            style={{ width: 30, height: 30, marginRight: 4 }}
                                        />
                                        <Text className="text-white font-bold
                text-md 
                "
                                        >
                                            Continue With Facebook
                                        </Text>
                                    </Pressable>
                                </View>

                                <View>
                                    <Divider width={0.4}
                                        orientation='vertical'
                                        style={{
                                            justifyContent: 'center'
                                        }}
                                    />
                                    <View style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginTop: 15,
                                        marginBottom: 20,
                                        flexDirection: 'row'
                                    }}>
                                        <Text style={{ color: 'gray', fontWeight: '400', fontSize: 12 }}>
                                            Already have an account?{'  '}
                                        </Text>
                                        <TouchableOpacity onPress={() => navigation.goBack()}>

                                            <Text className="text-white font-bold text-sm">
                                                Log in
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </>
                        )
                    }
                    }

                </Formik >
            </View >
        </>
    )
}

const styles = StyleSheet.create({
    inputFields: {
        backgroundColor: '#444',
        height: 40,
        borderRadius: 5,
        fontSize: 15,
        fontWeight: '500',
        color: 'white',
        paddingHorizontal: 10,
        marginVertical: 5,

    },
    inputField: {
        flex: 1,
        height: '100%',
    },
    button: (isValid) => ({
        backgroundColor: isValid ? '#0095f6' : '#9ACAF7',
        height: 40,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    }),
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 150
    },
    submitButton: {
        backgroundColor: '#1DA1F2',
        alignItems: "center",
        justifyContent: 'center',
        fontSize: 20,
        borderRadius: 8,
        shadowOpacity: 0.3,
        width: '80%',
        height: 50,
        marginBottom: 50,
        shadowOffset: { width: 4, height: 4 },
    }

})

export default SignUpForm
