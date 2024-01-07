import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const LoginForm = () => {
    return (
        <View >
            <View style={styles.inputFields}>
                <TextInput
                    placeholderTextColor={'#777'}
                    placeholder={'Phone number, username, or email'}
                    autoCapitalize='none'
                    keyboardType='email-address'
                    textContentType='emailAddress'
                    autoFocus={true}
                    style={styles.inputField}


                />
            </View>
            <View style={styles.inputFields}>
                <TextInput
                    placeholderTextColor={'#777'}
                    placeholder={'Password'}
                    autoCapitalize='none'
                    secureTextEntry={true}
                    textContentType='password'
                    autoCorrect={false}
                    style={styles.inputField}
                />
            </View>

            <Pressable style={styles.button}>
                <Text className="text-white font-semibold
                text-md
                "
                >
                    Log In
                </Text>
            </Pressable>


            <View style={{
                alignItems: 'center',
                marginTop: 10
            }}>
                <Text style={{ color: 'gray', fontWeight: '400', fontSize: 14 }}>
                    Forgot your login details?{' '}
                    <Text className="text-white font-bold">
                        Get help logging in.
                    </Text>
                </Text>
            </View>


            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: '#777' }} />
                <View>
                    <Text style={{ width: 50, textAlign: 'center', color: '#777' }}>OR</Text>
                </View>
                <View style={{ flex: 1, height: 1, backgroundColor: '#777' }} />
            </View>
        </View>
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
    button: {
        backgroundColor: '#0095f6',
        height: 40,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10
    }

})

export default LoginForm