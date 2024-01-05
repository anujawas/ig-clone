import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Home/Header'
import Stories from '../components/Home/Stories'
import Post from '../components/Home/Post'


import { POSTS } from '../../assets/data/Posts'

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <Stories />
            <ScrollView>
                {POSTS.map((post, index) => (<Post post={post} key={index} />))}
            </ScrollView>
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
