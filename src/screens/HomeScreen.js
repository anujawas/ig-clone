import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Home/Header'
import Stories from '../components/Home/Stories'
import Post from '../components/Home/Post'


import BottomTabs from '../components/Home/BottomTabs'
import { db, firebase } from '../../firebase'
import { useAuth } from '../../AuthContext'
import useActiveTab from '../hooks/FooterState'

const HomeScreen = ({ navigation }) => {
    const { setCurrentUser } = useAuth()

    const getUsername = () => {
        const user = firebase.auth().currentUser;
        const unsubscribe = db.collection('users').where('owner_uid', '==', user.uid).limit(1).onSnapshot(
            snapshot => snapshot.docs.map(doc => {
                setCurrentUser({
                    username: doc.data().username,
                    profilePic: doc.data().profilePic
                })
            })
        )

        return unsubscribe;
    }
    const { activeTab } = useActiveTab('Home')
    useEffect(() => {
        getUsername()
    }, [])
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        if (firebase.auth().currentUser !== null) {

            db.collectionGroup('posts').onSnapshot(snapshot => {
                setPosts(snapshot.docs.sort((a, b) => Number(b.data().created_at) - Number(a.data().created_at)).map(doc => doc.data()));
            })
        }

    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} />
            <Stories />
            <ScrollView>
                {posts.map((post, index) => (<Post post={post} key={index} />))}
            </ScrollView>
            <BottomTabs navigation={navigation} activeTab={activeTab} />
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
