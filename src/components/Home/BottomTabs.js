import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Divider } from 'react-native-elements'
import { firebase, db } from "../../../firebase"



export const BottomTabsIcons = [{
    "name": "Home",
    "active": "https://img.icons8.com/material-rounded/24/FFFFFF/home.png",
    "inactive": "https://img.icons8.com/windows/32/FFFFFF/home.png"
}, {
    "name": "Search",
    "active": "https://img.icons8.com/ios-filled/50/FFFFFF/search--v1.png",
    "inactive": "https://img.icons8.com/ios/50/FFFFFF/search--v1.png"
}, {
    "name": "Reels",
    "active": "https://img.icons8.com/ios-filled/50/FFFFFF/instagram-reel.png",

    "inactive": "https://img.icons8.com/ios/50/FFFFFF/instagram-reel.png"
}, {
    "name": "Shop",
    "active": "https://img.icons8.com/fluency-systems-filled/48/FFFFFF/shopping-bag-full.png",
    "inactive": "https://img.icons8.com/fluency-systems-regular/48/FFFFFF/shopping-bag-full.png"
}, {
    "name": "Profile",
    "active": "https://firebasestorage.googleapis.com/v0/b/rn-ig-clone-e753f.appspot.com/o/postImage%2Fe2cb1db4-eb68-4271-90b4-ff50b8b3ec6d.jpeg?alt=media&token=7ce2b7e6-9ced-4061-9cfd-c85088db0fc2",
    "inactive": "https://firebasestorage.googleapis.com/v0/b/rn-ig-clone-e753f.appspot.com/o/postImage%2Fe2cb1db4-eb68-4271-90b4-ff50b8b3ec6d.jpeg?alt=media&token=7ce2b7e6-9ced-4061-9cfd-c85088db0fc2"
}]

const BottomTabs = () => {
    const [activeTab, setActiveTab] = useState("Home");

    const Icon = ({ icon }) => (
        <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
            <Image
                source={{ uri: activeTab === icon.name ? icon.active : icon.inactive }}
                style={[styles.icon, icon.name === "Profile" ? styles.profilePicture() : null,
                activeTab === "Profile" && icon.name === activeTab ? styles.profilePicture(activeTab) : null
                ]}
            />
        </TouchableOpacity>
    )

    return (
        <View style={styles.wrapper}>
            <Divider width={1} orientation="vertical" />
            <View style={styles.container}>
                {BottomTabsIcons.map((icon, index) => (
                    <Icon key={index} icon={icon} />
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        zIndex: 999,
        backgroundColor: 'black'
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    icon: {
        width: 30,
        height: 30,
        marginLeft: 10,
        resizeMode: 'contain',
    },
    profilePicture: (activeTab = '') => ({
        borderRadius: 50,
        borderWidth: activeTab === "Profile" ? 2 : 0,
        borderColor: '#fff',
    })
})

export default BottomTabs