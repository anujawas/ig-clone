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
            <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                <PostFooter post={post} />
                <Likes post={post} />
                <Caption post={post} />
                <CommentSection post={post} />
                <Comments post={post} />
            </View>
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
        <View className="flex-row justify-between">
            <View style={styles.leftFooterIconContainer}>
                <Icon imgUrl={POST_FOOTER_ICONS[0].imageUrl} imgStyle={styles.footerIcon} />
                <Icon imgUrl={POST_FOOTER_ICONS[1].imageUrl} imgStyle={styles.footerIcon} />
                <Icon imgUrl={POST_FOOTER_ICONS[2].imageUrl} imgStyle={styles.footerIcon} />
            </View>

            <View className="flex-1 items-end w-32">
                <Icon imgUrl={POST_FOOTER_ICONS[3].imageUrl} imgStyle={styles.footerIcon} />
            </View>
        </View>
    )
}

const Icon = ({ imgUrl, imgStyle }) => {
    return (
        <TouchableOpacity>
            <Image source={{ uri: imgUrl }} style={[imgStyle]} />
        </TouchableOpacity>
    )
}

const Likes = ({ post }) => {
    return (
        <View className="flex-row items-center mt-2">
            <Text className="text-white font-600">{post.likes.toLocaleString('en')} likes</Text>
        </View>
    )
}


const Caption = ({ post }) => {
    return (
        <View className="mt-2">
            <Text className="text-white">
                <Text className="font-bold mr-2">{post.user}
                </Text>
                <Text >
                    {'  '}{post.caption}
                </Text>
            </Text>
        </View>
    )
}

const CommentSection = ({ post }) => {
    return (
        <View className="mt-2">
            {post.comments.length !== 0 && <Text style={{ color: 'gray' }}>
                <Text>
                    View {post.comments.length > 1 ? `all ${post.comments.length} comments` : "1 comment"}
                </Text>
            </Text>}
        </View>
    )
}

const Comments = ({ post }) => {
    return (
        <View className="mt-2">
            {post.comments.length !== 0 && post.comments.map((comment, index) => (
                <View className="flex-row items-center mt-1" key={index}>
                    <Text className="text-white font-600">{comment.username}</Text>
                    <Text className="text-white ml-2">{comment.comment}</Text>
                </View>
            ))}
        </View>
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
        height: 30
    },
    leftFooterIconContainer: {
        flexDirection: 'row',
        width: '32%',
        justifyContent: 'space-between',
    }
})

export default Post