import React, { useState } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from './src/screens/HomeScreen';
import NewPostScreen from './src/screens/NewPostScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import UploadPostScreen from './src/screens/UploadPostScreen';
const Stack = createStackNavigator();

const screenOptions = {
    headerShown: false
}

export const SignedInStack = () => {
    const [selectedImage, setSelectedImage] = useState(null)
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home' screenOptions={screenOptions}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="NewPost">
                    {props => <NewPostScreen {...props} setSelectedImage={setSelectedImage} />}
                </Stack.Screen>
                <Stack.Screen name="Upload">
                    {props => <UploadPostScreen {...props} selectedImage={selectedImage} />}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export const SignedOutStack = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' screenOptions={screenOptions}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
    </NavigationContainer>
)


