import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { useLoading } from '../../../LoadingContext';

const Loader = ({ visible }) => {
    const { loadingText } = useLoading()
    return (
        <Modal isVisible={visible} backdropOpacity={0.5} animationIn="fadeIn" animationOut="fadeOut">
            <View style={styles.container}>
                <ActivityIndicator size={'large'} color={'white'} />
                <Text style={styles.loadingText}>{loadingText}</Text>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        color: 'white',
    },
});

export default Loader;
