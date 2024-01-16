import { StyleSheet, View, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'

const ExploreGrid = ({ data }) => {

    const renderImageItem = ({ item }) => {
        return (

            <TouchableOpacity style={styles.imageContainer}>
                <Image source={{ uri: item }} style={styles.image} />
            </TouchableOpacity>
        )
    };
    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderImageItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
            />
        </View>
    )
}

export default ExploreGrid

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageContainer: {
        margin: 5,
    },
    image: {
        width: 120,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 5
    },
})
