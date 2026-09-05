import React from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { styles } from "./styles";

export default function Splash() {
    return (
        <View style={styles.body}>
            <View style={styles.container}>
                <Image
                source={require(''../../../assets/images/camera.png')}
                    style={styles.image}
                />
                <View style={styles.title}>
                    <Text style={styles.textMovie}>Movie</Text>
                    <Text style={styles.textHub}>Hub</Text>
                </View>
            </View>
        </View>
    );
}