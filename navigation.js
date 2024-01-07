import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from './src/screens/HomeScreen';
import NewPostScreen from './src/screens/NewPostScreen';
import LoginScreen from './src/screens/LoginScreen';
const Stack = createStackNavigator();

const screenOptions = {
    headerShown: false
}

const SignedInStack = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Home' screenOptions={screenOptions}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="NewPost" component={NewPostScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />

        </Stack.Navigator>
    </NavigationContainer>
)

export default SignedInStack