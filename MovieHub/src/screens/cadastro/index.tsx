import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './styles';

export default function Cadastro() {
  const navigation = useNavigation<any>();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [verSenha, setVerSenha] = useState(false);
  const [verConfirmarSenha, setVerConfirmarSenha] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);

  const selecionarImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar suas fotos!');
      return;
    }

    let resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1,1],
      quality: 1,
    });

    if (!resultado.canceled) {
      setAvatar(resultado.assets[0].uri);
    }
  };

  const lidarComCadastro = async () => {
    if (!nome.trim() || !email.trim() || !senha.trim() || !confirmarSenha.trim()) {
      Alert.alert('Erro no cadastro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (senha.length < 6) {
      Alert.alert('Erro na senha', 'A senha deve conter pelo menos 6 caracteres.');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro na validação', 'As senhas digitadas não são iguais.');
      return;
    }
    
    try {
      Alert.alert(
        'Sucesso!',
        'Sua conta foi criada com sucesso.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login')
          }
        ]
      );
    } catch (erro) {
      Alert.alert('Erro no servidor', 'Ocorreu um erro inesperado. Tente novamente mais tarde.');
    }
  };

  return (
    <View style={styles.body}>
      <Image source={require('../../../assets/images/background.jpg')} style={styles.background} />
      <View style={styles.backgroundDark} />
      
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          
          <View style={styles.headerCadastroContainer}>
            <Text style={styles.headerCadastroTitle}>Criar <Text style={styles.textConta}>Conta</Text></Text>
            <Text style={styles.headerCadastroSubtitle}>Preencha os dados abaixo</Text>
            
            <TouchableOpacity style={styles.avatarButton} activeOpacity={0.7} onPress={selecionarImagem}>
              <View style={styles.avatarCircle}>
                {avatar ? (
                  <Image source={{ uri: avatar }} style={{ width: '100%', height: '100%', borderRadius: 999 }} />
                ) : (
                  <Ionicons name="camera-outline" size={32} color="#a0a0a8" />
                )}

                <View style={styles.avatarBadgeCircle}>
                  <Ionicons name="camera" size={14} color="#000000" />
                </View>
              </View>
            </TouchableOpacity>
            
            <Text style={styles.avatarLabelText}>
              {avatar ? "Alterar foto" : "Adicionar foto (opcional)"}
            </Text>
          </View>

          <Text style={styles.inputLabel}>Nome completo</Text>
          <View style={styles.inputRowContainer}>
            <Ionicons name="person-outline" size={20} color="#a0a0a8" style={styles.inputIcon} />
            <TextInput style={styles.input} placeholder="Digite seu nome" placeholderTextColor="#52515A" value={nome} onChangeText={setNome} />
          </View>

          <Text style={styles.inputLabel}>E-mail</Text>
          <View style={styles.inputRowContainer}>
            <MaterialIcons name="mail-outline" size={20} color="#a0a0a8" style={styles.inputIcon} />
            <TextInput style={styles.input} placeholder="seu@email.com" placeholderTextColor="#52515A" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
          </View>

          <Text style={styles.inputLabel}>Senha</Text>
          <View style={styles.inputRowContainer}>
            <MaterialIcons name="lock-outline" size={20} color="#a0a0a8" style={styles.inputIcon} />
            <TextInput style={styles.input} placeholder="Mínimo 6 caracteres" placeholderTextColor="#52515A" secureTextEntry={!verSenha} value={senha} onChangeText={setSenha} />
            <TouchableOpacity onPress={() => setVerSenha(!verSenha)}>
              <Ionicons name={verSenha ? "eye-outline" : "eye-off-outline"} size={20} color="#a0a0a8" />
            </TouchableOpacity>
          </View>

          <Text style={styles.inputLabel}>Confirmar senha</Text>
          <View style={styles.inputRowContainer}>
            <MaterialIcons name="lock-outline" size={20} color="#a0a0a8" style={styles.inputIcon} />
            <TextInput style={styles.input} placeholder="Digite novamente sua senha" placeholderTextColor="#52515A" secureTextEntry={!verConfirmarSenha} value={confirmarSenha} onChangeText={setConfirmarSenha} />
            <TouchableOpacity onPress={() => setVerConfirmarSenha(!verConfirmarSenha)}>
              <Ionicons name={verConfirmarSenha ? "eye-outline" : "eye-off-outline"} size={20} color="#a0a0a8" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={lidarComCadastro}>
            <Text style={styles.textButton}>Cadastrar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkCadastro}> Já tem uma conta? <Text style={styles.linkCriarConta}>Fazer login</Text> </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
}