import { Button, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import * as Yup from 'yup'

import { Formik } from 'formik'
import { Divider } from 'react-native-elements'



const UploadPostScheme = Yup.object().shape({
    caption: Yup.string().max(2200, 'Caption has a maximum characters limit.')
})

const PostUploader = ({ navigation, selectedImage }) => {
    return (
        <Formik
            initialValues={{ caption: '' }}
            onSubmit={(values) => {
                console.log(values)
                console.log("You have successfully uploaded a post");
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
                    <Pressable style={styles.submitButton} onPress={handleSubmit}>
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