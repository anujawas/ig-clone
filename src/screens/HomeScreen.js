import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Home/Header'

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Header />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1
    }
})

export default HomeScreen
