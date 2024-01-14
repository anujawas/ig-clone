import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchBar from '../components/Search/SearchBar'
import BottomTabs from '../components/Home/BottomTabs'
import useActiveTab from '../hooks/useFooterState'


const SearchScreen = ({ navigation }) => {
    const { activeTab } = useActiveTab('Search')
    return (
        <SafeAreaView style={styles.container}>
            <SearchBar />
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