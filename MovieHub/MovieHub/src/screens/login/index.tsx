import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { loginUser } from "../../services/api";

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [manterConectado, setManterConectado] = useState(false); 

    const navigation = useNavigation<any> ();

        const lidarComLogin = async () => {
        if (!email || !senha) {
            Alert.alert("Campos obrigatórios", "Por favor, preencha o e-mail e a senha para continuar.");
            return;
        }
        setCarregando(true);
        try {
            await loginUser({ email: email.trim(), senha });
            navigation.replace('Home');
        } catch (erro) {
            Alert.alert("Não foi possível entrar", erro instanceof Error ? erro.message : "Confira seus dados e tente novamente.");
        } finally {
            setCarregando(false);
        }
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
