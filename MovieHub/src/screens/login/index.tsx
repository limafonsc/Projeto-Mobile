import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "expo-router";
import { styles } from "./styles";

export default function login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [carregando, setCarregando] = useState(false);

    const navigation = useNavigation<any> ();

    const lidarComLogin = () => {
        setCarregando(true);
        setTimeout(() => {
            setCarregando(false);
            console.log('Tentando logar com', email);
            navigation.replace('Home');
        }, 2000);
    };
    return (
        <View style={styles.body}>
            <Image
                source={require('../../../assets/images/background.jpg')}
                style={styles.background}
            />
            <View style={styles.backgroundDark}/>
            
            <View style={styles.title}>
                <Image
                    source={require('../../../assets/images/logoMovieHub.webp')}
                    style={styles.image}
                />
                    <Text style={styles.textMovie}>Movie</Text>
                    <Text style={styles.textHub}>Hub</Text>  
                </View>
                <View style={styles.descricao}>
                    <Text style={styles.textDescricao}>Faça login para continuar</Text>
                </View>
            <View style={styles.container}>
                <TextInput
                style={styles.input}
                placeholder="E-mail"
                placeholderTextColor="#777"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!carregando}
                />
                <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#777"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry={true}
                editable={!carregando}
                />
                
                {carregando ? (
                    <View style = {styles.loading}>
                        <ActivityIndicator
                        size='large'
                        color='#d30046'/>
                    </View>
                ):(
                    <TouchableOpacity
                    style={styles.button}
                    onPress={lidarComLogin}>
                        <Text style={styles.textButton}>Entrar</Text>
                    </TouchableOpacity>
                )}
                   <TouchableOpacity
                   onPress={() => navigation.navigate('Cadastro')}
                   disabled={carregando}
                   >
                    <Text style={styles.linkCadastro}>Não tem uma conta?<Text style={styles.linkCriarConta}>Criar conta</Text>
                    </Text>
                   </TouchableOpacity>  
            </View>
        </View>
    );
}