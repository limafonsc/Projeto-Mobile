import React, { useEffect } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from 'expo-router';
import { styles } from "./styles";

export default function Splash() {

    const navigation = useNavigation<any> ();

    useEffect(() => {
        const timer=setTimeout(() => {
            navigation.navigate("./login/index");
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.body}>
            <Image
                source={require('../../../assets/images/background.jpg')}
                style={styles.background}
            />
            <View style={styles.backgroundDark}/>
            <View style={styles.container}>
                <Image
                    source={require('../../../assets/images/logoMovieHub.webp')}
                    style={styles.image}
                />
                <View style={styles.title}>
                    <Text style={styles.textMovie}>Movie</Text>
                    <Text style={styles.textHub}>Hub</Text>  
                </View>
                <View style={styles.descricao}>
                    <Text style={styles.textDescricao}>Gerenciador de Filmes</Text>
                </View>
                
                <ActivityIndicator
                size='small'
                color='#d30046'
                style={styles.loading}/>
            </View>
        </View>
    );
}