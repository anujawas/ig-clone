import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Home/Header'
import Stories from '../components/Home/Stories'
import Post from '../components/Home/Post'


import { POSTS } from '../../assets/data/Posts'
import BottomTabs from '../components/Home/BottomTabs'

const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} />
            <Stories />
            <ScrollView>
                {POSTS.map((post, index) => (<Post post={post} key={index} />))}
            </ScrollView>
            <BottomTabs />
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
