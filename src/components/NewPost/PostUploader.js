import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import * as Yup from 'yup'

import { Formik } from 'formik'
import { Divider } from 'react-native-elements'

import validUrl from 'valid-url'

const PLACEHOLDER_IMAGE = 'https://placehold.co/600x400/png'

const UploadPostScheme = Yup.object().shape({
    imgUrl: Yup.string().url().required('Post Image Url is required'),
    caption: Yup.string().max(2200, 'Caption has a maximum characters limit.')
})

const PostUploader = ({ navigation }) => {
    const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMAGE)
    return (
        <Formik
            initialValues={{ imgUrl: '', caption: '' }}
            onSubmit={(values) => {
                console.log(values)
                console.log("You have successfully uploaded a post");
                navigation.goBack()
            }}
            validationSchema={UploadPostScheme}
            validateOnMount={true}

        >
            {({ handleBlur, handleChange, handleSubmit, values, errors, isValid }) => <>
                <View className="m-4 justify-between flex-row">
                    <Image source={{ uri: validUrl.isUri(thumbnailUrl) ? thumbnailUrl : PLACEHOLDER_IMAGE }}
                        style={{ width: 100, height: 100 }} />
                    <View className="flex-1 ml-3">
                        <TextInput
                            placeholder='Write a caption'
                            placeholderTextColor={'gray'}
                            multiline={true}
                            style={{
                                color: 'white',
                                fontSize: 20,
                            }}
                            onChangeText={handleChange('caption')}
                            onBlur={handleBlur('caption')}
                            value={values.caption}
                        />
                    </View>
                </View>
                <Divider width={0.2}
                    orientation='vertical' />
                <TextInput

                    onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
                    placeholder='Enter Image Url'
                    placeholderTextColor={'gray'}
                    style={{
                        color: 'white',
                        fontSize: 18,
                    }}
                    onChangeText={handleChange('imgUrl')}
                    onBlur={handleBlur('imgUrl')}
                    value={values.imgUrl}
                />
                {errors.imgUrl &&
                    <Text style={{ color: 'red', fontSize: 10 }}>
                        {errors.imgUrl}
                    </Text>
                }
                <Button title='Share' onPress={handleSubmit} disabled={!isValid} />

            </>}
        </Formik>
    )
}

export default PostUploader

const styles = StyleSheet.create({})