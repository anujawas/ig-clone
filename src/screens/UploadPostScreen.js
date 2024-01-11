import { StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import UploadNewPost from '../components/NewPost/UploadNewPost'
import Loader from '../components/global/Loader'
import { useLoading } from '../../LoadingContext'
const UploadPostScreen = ({ navigation, selectedImage }) => {
    const { loading } = useLoading()
    return (
        <SafeAreaView className="bg-black flex-1">
            <UploadNewPost navigation={navigation} selectedImage={selectedImage} />
            <Loader visible={loading} />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({})

export default UploadPostScreen
