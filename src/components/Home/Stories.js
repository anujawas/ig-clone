import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity } from 'react-native';

import { Users } from '../../../assets/data/Users';

import { AntDesign } from '@expo/vector-icons';
import { useAuth } from '../../../AuthContext';

const Stories = () => {
    const { currentUser } = useAuth()
    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <TouchableOpacity style={{ alignItems: 'center', marginLeft: 2 }}>
                    <Image
                        source={{ uri: currentUser ? currentUser.profilePic : 'https://placehold.co/600x400/png' }}
                        style={[styles.storyImage, { borderWidth: 0 }]}
                    />
                    <AntDesign style={styles.plusLogo} name="pluscircle" size={24} color="blue"
                    />

                    <Text style={styles.username}>
                        Your Story
                    </Text>
                </TouchableOpacity>
                {Users.map((story, index) => (
                    <TouchableOpacity key={index} style={{ alignItems: 'center', marginLeft: 2 }}>
                        <Image
                            source={{ uri: `${story.image}` }}
                            style={styles.storyImage}

                        />
                        <Text style={styles.username}>
                            {story.username.length > 11 ? story.username.slice(0, 10).toLowerCase() + '...' : story.username.toLowerCase()}
                        </Text>
                    </TouchableOpacity>
                ))}

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 13
    },
    storyImage: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginLeft: 15,
        borderWidth: 3,
        borderColor: "#ff8501"
    },
    username: {
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    plusLogo: {
        position: 'absolute',
        bottom: 25,
        right: 1,
        backgroundColor: 'white',
        borderRadius: 50,
    }
})

export default Stories;
