import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'

const Header = () => {
    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 justify-center items-center">
                <Text>
                    Header
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default Header