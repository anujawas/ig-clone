import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SignUpForm from '../components/Signup/SignupForm'
const IG_LOGO = 'https://www.shawspaving.co.uk/wp-content/uploads/2019/01/instagram-font-logo-white-png-350x133.png'

const SignUpScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
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
            <SignUpForm navigation={navigation} />
        </SafeAreaView>
    )
}

export default SignUpScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 100,
        paddingHorizontal: 12
    },
    logoContainer: {
        marginTop: 60,
        alignItems: 'center'
    }
})