import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

const Spinner = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' color='#272727'/>
        </View>
    )
}

export default Spinner;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 100
    }
});