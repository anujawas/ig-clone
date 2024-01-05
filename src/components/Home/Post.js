import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import { POST_FOOTER_ICONS } from '../../../assets/data/PostFooterIcons';

import { Divider } from 'react-native-elements'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Post = ({ post }) => {
    return (
        <View style={styles.container}>
            <Divider width={1} orientation='vertical' />
            <PostHeader post={post} />
            <PostImage post={post} />
            <PostFooter post={post} />
        </View>
    )
}


const PostHeader = ({ post }) => {
    return (
        <View className="flex-row justify-between m-3 items-center">
            <View className="flex-row justify-between items-center">
                <Image source={{ uri: post.profile_picture }}
                    style={styles.userImage} />
                <Text className="text-white ml-2 font-[500]">{post.user}</Text>
            </View>
            <TouchableOpacity>
                <MaterialCommunityIcons name="dots-vertical" size={24} color="white" />
            </TouchableOpacity>
        </View>
    )
}

const PostImage = ({ post }) => {
    return (
        <View className="w-full h-[450]">
            <Image
                source={{ uri: post.imageUrl }}
                style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
            />
        </View>
    )
}


const PostFooter = ({ post }) => {
    return (
        <View>
            <Icon imgUrl={POST_FOOTER_ICONS[0].imageUrl} imgStyle={styles.footerIcon} />
        </View>
    )
}

const Icon = ({ imgUrl, imgStyle }) => {
    return (
        <TouchableOpacity>
            <Image source={{ uri: imgUrl }} style={imgStyle} />
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
    container: {
        marginBottom: 30
    },
    userImage: {
        width: 35,
        height: 35,
        borderRadius: 50,
        borderWidth: 1.6,
        borderColor: "#ff8501"
    },
    footerIcon: {
        width: 30,
        height: 30,
        marginRight: 10
    }
})

export default Post