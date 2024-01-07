import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AddNewPost from '../components/NewPost/AddNewPost'
const NewPostScreen = ({ navigation }) => {
    return (
        <SafeAreaView className="bg-black flex-1">
            <AddNewPost navigation={navigation} />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({})

export default NewPostScreen
