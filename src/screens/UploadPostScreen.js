import { StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import UploadNewPost from '../components/NewPost/UploadNewPost'
const UploadPostScreen = ({ navigation, selectedImage }) => {
    return (
        <SafeAreaView className="bg-black flex-1">
            <UploadNewPost navigation={navigation} selectedImage={selectedImage} />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({})

export default UploadPostScreen
