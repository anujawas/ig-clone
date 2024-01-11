import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import UploadScreen from './NewPostUpload'

const Header = ({ navigation }) => {
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
            >

                <Image
                    source={{ uri: 'https://img.icons8.com/metro/26/FFFFFF/back.png' }}
                    style={{ width: 25, height: 25 }}
                />
            </TouchableOpacity>
            <Text style={styles.headerText}>New Post</Text>
            <Text></Text>
        </View>
    )
}

const AddNewPost = ({ navigation, setSelectedImage }) => {
    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <UploadScreen navigation={navigation} setSelectedImage={setSelectedImage} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700',
    },
})

export default AddNewPost
