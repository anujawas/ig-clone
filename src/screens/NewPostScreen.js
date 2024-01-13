import { StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AddNewPost from '../components/NewPost/AddNewPost'
const NewPostScreen = ({ navigation, selectedImage, setSelectedImage }) => {
    return (
        <SafeAreaView className="bg-black flex-1">
            <AddNewPost navigation={navigation} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({})

export default NewPostScreen
