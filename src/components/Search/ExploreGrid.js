import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ExploreGrid = () => {
    return (
        <View style={styles.container}>
            <Text className="text-white">ExploreGrid</Text>
        </View>
    )
}

export default ExploreGrid

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
