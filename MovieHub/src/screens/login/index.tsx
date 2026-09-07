import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [manterConectado, setManterConectado] = useState(false); 

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
                <Text style={styles.inputLabel}>E-mail</Text>
                <View style={styles.inputRowContainer}>
                    <Ionicons name="mail-outline" size={20} color="#777" style={styles.inputIcon} />
                    <TextInput
                    style={styles.input}
                    placeholder="seu@email.com"
                    placeholderTextColor="#777"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={!carregando}
                    />
                </View>

                <Text style={styles.inputLabel}>Senha</Text>
                <View style={styles.inputRowContainer}>
                    <Ionicons name="lock-closed-outline" size={20} color="#777" style={styles.inputIcon} />
                    <TextInput
                    style={styles.input}
                    placeholder="Digite sua senha"
                    placeholderTextColor="#777"
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry={!mostrarSenha}
                    editable={!carregando}
                    />
                    <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
                        <Ionicons name={mostrarSenha ? "eye-off-outline" : "eye-outline"} size={20} color="#777" />
                    </TouchableOpacity>
                </View>

                <View style={styles.optionsContainer}>
                    <TouchableOpacity 
                        style={styles.checkboxContainer} 
                        onPress={() => setManterConectado(!manterConectado)}
                    >
                        <View style={[styles.checkbox, manterConectado && styles.checkboxChecked]}>
                            {manterConectado && <Ionicons name="checkmark" size={12} color="#fff" />}
                        </View>
                        <Text style={styles.textOptions}>Manter conectado</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => console.log('Recuperar senha')}>
                        <Text style={styles.textEsqueciSenha}>Esqueci minha senha</Text>
                    </TouchableOpacity>
                </View>
                
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

                <View style={styles.divisorContainer}>
                    <View style={styles.divisorLine} />
                    <Text style={styles.textDivisor}>ou continue com</Text>
                    <View style={styles.divisorLine} />
                </View>

                <View style={styles.socialContainer}>
                    <TouchableOpacity style={styles.socialButton} onPress={() => console.log('Google')}>
                        <Ionicons name="logo-google" size={18} color="#ffffff" style={{ marginRight: 8 }} />
                        <Text style={styles.textSocialButton}>Google</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.socialButton} onPress={() => console.log('Apple')}>
                        <Ionicons name="logo-apple" size={18} color="#ffffff" style={{ marginRight: 8 }} />
                        <Text style={styles.textSocialButton}>Apple</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                onPress={() => navigation.navigate('Cadastro')}
                disabled={carregando}
                >
                    <Text style={styles.linkCadastro}>Não tem uma conta? <Text style={styles.linkCriarConta}>Criar conta</Text>
                    </Text>
                </TouchableOpacity>  
            </View>
        </View>
    );
}