import { Image, Pressable, StyleSheet, Text, TextInput, View, Platform, ToastAndroid, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'

import { Formik } from 'formik'
import { Divider } from 'react-native-elements'

import { db, firebase } from '../../../firebase'
import { useLoading } from '../../../LoadingContext'
import useUploadMedia from '../../hooks/useUploadMedia'
import { useAuth } from '../../../AuthContext'

const UploadPostScheme = Yup.object().shape({
    caption: Yup.string().max(2200, 'Caption has a maximum characters limit.')
})

const PostUploader = ({ navigation, selectedImage }) => {
    const { currentUser } = useAuth()
    const { uploadMedia } = useUploadMedia();
    const uploadPost = async (imageUrl, caption) => {
        const unsubscribe = await db.collection('users')
            .doc(currentUser.username)
            .collection('posts')
            .add({
                imageUrl: imageUrl,
                user: currentUser.username,
                likes: 0,
                owner_uid: firebase.auth().currentUser.uid,
                created_at: firebase.firestore.FieldValue.serverTimestamp(),
                likes_by_users: [],
                caption: caption,
                profilePic: currentUser.profilePic,
                comments: []
            })
    }

    const { setLoading } = useLoading()
    const handleSubmit = async (selectedImage, caption) => {

        setLoading(true);
        const img = await uploadMedia(selectedImage);
        console.log(img);
        await uploadPost(img, caption);
        setLoading(false)
        ToastAndroid.showWithGravityAndOffset(
            "Post uploaded successfully.",
            ToastAndroid.SHORT,
            ToastAndroid.TOP,
            0, 200
        )
    }

    return (
        <Formik
            initialValues={{ caption: '' }}
            onSubmit={async (values) => {
                await handleSubmit(selectedImage, values.caption)
                navigation.navigate('Home')
            }}
            validationSchema={UploadPostScheme}
            validateOnMount={true}
        >

            {({ handleBlur, handleChange, handleSubmit, values }) => <>
                <View className="items-center flex-1 justify-between">
                    <View className="flex-1 items-center justify-around w-full bottom-4" style={{ marginHorizontal: 10 }}>
                        <Image source={{ uri: `${selectedImage}` }}
                            style={{ width: 300, height: 300, resizeMode: 'contain' }} />

                        <View className=" w-full h-[20%]">
                            <Divider width={0.2}
                                orientation='vertical' className="mb-2" />
                            <TextInput
                                placeholder='Write a caption'
                                placeholderTextColor={'gray'}
                                multiline={true}
                                style={{
                                    color: 'white',
                                    fontSize: 20,
                                    paddingHorizontal: 5,
                                    borderColor: 'red',
                                    backgroundColor: '#1c1c1e',
                                    width: '100%',
                                    height: '50%'

                                }}
                                onChangeText={handleChange('caption')}
                                onBlur={handleBlur('caption')}
                                value={values.caption}
                            />
                        </View>
                    </View>
                    <Pressable style={styles.submitButton} onPress={handleSubmit} disabled={selectedImage === null ? true : false}>
                        <Text className="text-white font-semibold
                text-md
                "
                        >
                            Share
                        </Text>
                    </Pressable>
                </View>
            </>}
        </Formik >


    )
}

export default PostUploader

const styles = StyleSheet.create({
    submitButton: {
        backgroundColor: '#1DA1F2',
        alignItems: "center",
        justifyContent: 'center',
        fontSize: 20,
        borderRadius: 8,
        shadowOpacity: 0.3,
        width: '80%',
        height: 50,
        bottom: 20,
        shadowOffset: { width: 4, height: 4 },
    }
})