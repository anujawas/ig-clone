import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { SafeAreaView } from 'react-native-safe-area-context'
import SearchBar from '../components/Search/SearchBar'
import BottomTabs from '../components/Home/BottomTabs'
import ExploreGrid from '../components/Search/ExploreGrid'

import useActiveTab from '../hooks/useFooterState'
import { firebase, db } from '../../firebase'


const SearchScreen = ({ navigation }) => {
    const { activeTab } = useActiveTab('Search')
    const [pictures, setPictures] = useState([]);
    useEffect(() => {
        if (firebase.auth().currentUser !== null) {
            db.collectionGroup('posts').onSnapshot(snapshot => {
                setPictures(snapshot.docs.map(doc => doc.data().imageUrl));
            })
        }

    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <SearchBar />
            <ExploreGrid data={pictures} />
            <BottomTabs navigation={navigation} activeTab={activeTab} />
        </SafeAreaView>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#080404'
    }

})