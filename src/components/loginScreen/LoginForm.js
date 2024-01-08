import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Divider, Image } from 'react-native-elements'


import { Formik } from 'formik'
import * as Yup from 'yup'
import validator from 'email-validator'

const LoginForm = ({ navigation }) => {
    const [secureTextEntry, setSecureTextEntry] = useState(true)

    const loginFormSchema = Yup.object().shape({
        email: Yup.string()
            .required('An email is Required')
            .email('Invalid email address')
            .test('email', 'Email address must be valid', (value) => validator.validate(value)),
        password: Yup.string()
            .required('Required')
            .min(6, 'Password must be at least 6 characters')
    })
    return (
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={(values) => { console.log(values) }}
                validationSchema={loginFormSchema}
                validateOnMount={true}

            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
                    <>
                        <View style={{
                            marginHorizontal: 5,
                            justifyContent: 'flex-start',
                        }}>

                            <View style={[styles.inputFields,
                            {
                                borderColor: values.email.length < 1 || validator.validate(values.email) ? '#444' : 'red',
                                borderWidth: errors.email ? 1 : 0,
                            }]}>
                                <TextInput
                                    placeholderTextColor={'#777'}
                                    placeholder={'Phone number, username, or email'}
                                    autoCapitalize='none'
                                    keyboardType='email-address'
                                    textContentType={'emailAddress' || 'username' || 'telephoneNumber'}
                                    autoFocus={true}
                                    style={styles.inputField}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
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
                            <Pressable style={styles.button(isValid)} onPress={handleSubmit}>
                                <Text className="text-white font-semibold
                text-md
                "
                                >
                                    Log In
                                </Text>
                            </Pressable>


                            <View style={{
                                alignItems: 'center',
                                marginTop: 10,
                                flexDirection: 'row',
                                justifyContent: 'center'
                            }}>

                                <Text style={{ color: 'gray', fontWeight: '400', fontSize: 14 }}>
                                    Forgot your login details?{'  '}
                                </Text>
                                <TouchableOpacity>
                                    <Text className="text-white font-bold">
                                        Get help logging in.
                                    </Text>
                                </TouchableOpacity>
                            </View>


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
                                    Don't have an account?{'  '}
                                </Text>
                                <TouchableOpacity onPress={() => navigation.push('SignUp')}>
                                    <Text className="text-white font-bold">
                                        Sign up.
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>

                )}

            </Formik>
        </View >


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
    })

})

export default LoginForm
