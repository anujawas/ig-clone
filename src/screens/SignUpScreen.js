import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SignUpForm from '../components/Signup/SignupForm'
import Loader from '../components/global/Loader'
import { useLoading } from '../../LoadingContext'

const SignUpScreen = ({ navigation }) => {
    const { loading } = useLoading()
    return (
        <SafeAreaView style={styles.container}>
            <SignUpForm navigation={navigation} />
            <Loader visible={loading} />
        </SafeAreaView>
    )
}

export default SignUpScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 20,
        paddingHorizontal: 12
    }
})