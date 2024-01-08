import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LoginForm from '../components/loginScreen/LoginForm'
const IG_LOGO = 'https://www.shawspaving.co.uk/wp-content/uploads/2019/01/instagram-font-logo-white-png-350x133.png'

const LoginScreen = ({ navigation }) => {
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
            <LoginForm navigation={navigation} />
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 155,
        paddingHorizontal: 12
    },
    logoContainer: {
        marginTop: 60,
        alignItems: 'center'
    }
})