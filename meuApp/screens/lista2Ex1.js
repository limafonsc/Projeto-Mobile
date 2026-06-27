import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function Onze() {
    const navigation = useNavigation(); 
    return (
        <View style={styles.container}>
            <View style={styles.moldura}>
                
                <Image 
                    source={require('../assets/images/logoetec.jpg')} 
                    style={styles.logo} 
                />

                <Text style={styles.titulo}>HOME</Text>

                <View style={styles.gradeBotoes}>
                    <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Um')}>
                        <Text style={styles.textoBotao}>Um</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Dois')}>
                        <Text style={styles.textoBotao}>Dois</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Tres')}>
                        <Text style={styles.textoBotao}>Três</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Quatro')}>
                        <Text style={styles.textoBotao}>Quatro</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Cinco')}>
                        <Text style={styles.textoBotao}>Cinco</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Seis')}>
                        <Text style={styles.textoBotao}>Seis</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Sete')}>
                        <Text style={styles.textoBotao}>Sete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Oito')}>
                        <Text style={styles.textoBotao}>Oito</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Nove')}>
                        <Text style={styles.textoBotao}>Nove</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Dez')}>
                        <Text style={styles.textoBotao}>Dez</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#cecece',
        justifyContent: 'center',
        alignItems: 'center',
    },
    moldura: {
        borderWidth: 1,
        borderColor: '#8c8c8c',
        borderRadius: 5,
        padding: 20,
        alignItems: 'center',
        width: 280,
    },
    logo: {
        width: 140,
        height: 140,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 15,
    },
    gradeBotoes: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
    },
    botao: {
        backgroundColor: '#f6ae05',
        width: '47%',
        paddingVertical: 10,
        borderRadius: 4,
        alignItems: 'center',
        marginBottom: 10,
    },
    textoBotao: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 14,
    }
});
