import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import { firebase } from "../../../firebase"


const Header = ({ navigation }) => {
    const handleHomeClick = async () => (
        Alert.alert('Home Options', "You have Pressed Home Button.\nWhat would you like do", [
            {
                text: 'Go to Home',
                onPress: () => {
                    navigation.replace("Home")
                }
            },
            {
                text: 'Log out',
                onPress: async () => {
                    try {
                        await firebase.auth().signOut().then(
                            (res) = (
                                ToastAndroid.showWithGravityAndOffset(
                                    "Successfully logged out.",
                                    ToastAndroid.LONG,
                                    ToastAndroid.TOP,
                                    0, 200)
                            )
                        )
                    } catch {
                        console.log("Error in signing out the user.")
                    }
                }
            },
        ])
    )

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleHomeClick}>
                <Image style={styles.logo} source={require('../../../assets/images/ig-transaparent-white.png')} />
            </TouchableOpacity>

            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => navigation.push('NewPost')}>
                    <Image style={styles.icon} source={require('../../../assets/images/icons8-add-new-50.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={styles.icon} source={require('../../../assets/images/icons8-heart-50.png')} />
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={styles.unreadBadge}>
                        <Text style={styles.unreadBadgeText}>
                            11
                        </Text>
                    </View>
                    <Image style={styles.icon} source={require('../../../assets/images/icons8-messenger-50.png')} />
                </TouchableOpacity>


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20
    },
    logo: {
        width: 100,
        height: 50,
        resizeMode: 'contain'
    },
    iconContainer: {
        flexDirection: 'row'

    },
    icon: {
        width: 30,
        height: 30,
        marginLeft: 10,
        resizeMode: 'contain',
    },
    unreadBadge: {
        backgroundColor: '#ff3250',
        position: 'absolute',
        left: 20,
        bottom: 18,
        width: 25,
        height: 18,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100
    },
    unreadBadgeText: {
        color: 'white',
        fontWeight: '600'
    }
})


export default Header