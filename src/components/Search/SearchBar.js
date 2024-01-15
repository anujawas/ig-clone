import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Import the Feather icon library

const SearchInput = ({ onSearch }) => {
    const [searchText, setSearchText] = useState('');
    const inputRef = useRef(null);
    const handleSearch = () => {
        setBackIcon(false);
    };
    const handleExternalButtonClick = () => {
        if (inputRef.current) {
            inputRef.current.blur();
        }
        setBackIcon(!backIcon)
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.blur();
            }
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    const [backIcon, setBackIcon] = useState(false)
    return (
        <View style={styles.container}>
            {backIcon &&
                <TouchableOpacity style={styles.backButton} onPress={handleExternalButtonClick}>
                    <Feather name={"arrow-left"} size={
                        24
                    } color="white" />
                </TouchableOpacity>}
            <View style={styles.searchContainer}>
                <Feather name="search" size={20} color={backIcon ? 'gray' : 'white'} style={styles.searchIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Search..."
                    onChangeText={(text) => setSearchText(text)}
                    value={searchText}
                    onTouchStart={() => setBackIcon(true)}
                    onSubmitEditing={handleSearch}
                    placeholderTextColor={"gray"}
                    ref={inputRef}

                />
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#282424',
        borderRadius: 10,
        paddingLeft: 10,
        margin: 5
    },
    searchIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        color: 'white',

        height: 40,
    },
    backButton: {
        backgroundColor: '#080404',
        padding: 10,
        marginRight: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SearchInput;
