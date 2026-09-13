import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker"; 
import { styles } from "./styles";

export default function CadastroFilme() {
    const navigation = useNavigation<any>();

    const [titulo, setTitulo] = useState('');
    const [genero, setGenero] = useState('');
    const [ano, setAno] = useState('');
    const [duracao, setDuracao] = useState('');
    const [diretor, setDiretor] = useState('');
    const [descricao, setDescricao] = useState('');
    const [status, setStatus] = useState('');
    const [trailer, setTrailer] = useState('');
    const [nota, setNota] = useState(0);
    
    const [imagemCapa, setImagemCapa] = useState<string | null>(null);

    const abrirGaleria = async () => {
        const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissao.granted) {
            Alert.alert("Permissão necessária", "Precisamos de acesso à galeria para escolher a capa.");
            return;
        }

        const resultado = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect:[3,4],
            quality: 1,
        });

        if (!resultado.canceled) {
            setImagemCapa(resultado.assets[0].uri);
        }
    };

    const abrirCamera = async () => {
        const permissao = await ImagePicker.requestCameraPermissionsAsync();
        if (!permissao.granted) {
            Alert.alert("Permissão necessária", "Precisamos de acesso à câmera para tirar a foto da capa.");
            return;
        }

        const resultado = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [3,4],
            quality: 1,
        });

        if (!resultado.canceled) {
            setImagemCapa(resultado.assets[0].uri);
        }
    };

    const lidarComSalvar = () => {
        if (!titulo || !genero || !ano || !status) {
            Alert.alert("Campos obrigatórios", "Por favor, preencha todos os campos marcados com (*).");
            return;
        }

        Alert.alert("Sucesso", "Filme cadastrado com sucesso!");
        
        setTitulo('');
        setGenero('');
        setAno('');
        setDuracao('');
        setDiretor('');
        setDescricao('');
        setNota(0);
        setStatus('');
        setTrailer('');

        navigation.navigate('Filmes');
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#121214' }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Novo Filme</Text>
                <View style={{ width: 24 }} /> 
            </View>

            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.uploadContainer}>
                    {imagemCapa ? (
                        <TouchableOpacity onPress={abrirGaleria} style={{ width: '100%', alignItems: 'center' }}>
                            <Image 
                                source={{ uri: imagemCapa }} 
                                style={{ width: 120, height: 160, borderRadius: 8, marginBottom: 8 }} 
                            />
                            <Text style={[styles.textUploadDescricao, { color: '#d30046' }]}>
                                Toque na imagem para alterar
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <>
                            <Ionicons name="film-outline" size={32} color="#a0a0a8" style={{ marginBottom: 8 }} />
                            <Text style={styles.textUploadDescricao}>Adicionar capa do filme</Text>
                      
                            <View style={styles.uploadBotoesRow}>
                                <TouchableOpacity style={styles.btnUploadOpcao} onPress={abrirGaleria}>
                                    <Ionicons name="image-outline" size={16} color="#d30046" />
                                    <Text style={styles.txtUploadOpcao}> Galeria</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.btnUploadOpcao} onPress={abrirCamera}>
                                    <Ionicons name="camera-outline" size={16} color="#d30046" />
                                    <Text style={styles.txtUploadOpcao}> Câmera</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </View>

                <Text style={styles.inputLabel}>Título <Text style={{ color: '#d30046' }}>*</Text></Text>
                <View style={styles.inputRowContainer}>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Digite o título do filme" 
                        placeholderTextColor="#a0a0a8"
                        value={titulo}
                        onChangeText={setTitulo}
                    />
                </View>

                <Text style={styles.inputLabel}>Gênero <Text style={{ color: '#d30046' }}>*</Text></Text>
                <View style={styles.inputRowContainer}>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Digite o gênero" 
                        placeholderTextColor="#a0a0a8"
                        value={genero}
                        onChangeText={setGenero}
                    />
                </View>

                <View style={styles.rowDupla}>
                    <View style={{ flex: 1, marginRight: 8 }}>
                        <Text style={styles.inputLabel}>Ano <Text style={{ color: '#d30046' }}>*</Text></Text>
                        <View style={styles.inputRowContainer}>
                            <TextInput 
                                style={styles.input} 
                                placeholder="Ex.: 2024" 
                                placeholderTextColor="#a0a0a8"
                                keyboardType="numeric"
                                value={ano}
                                onChangeText={setAno}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 1, marginLeft: 8 }}>
                        <Text style={styles.inputLabel}>Duração (min)</Text>
                        <View style={styles.inputRowContainer}>
                            <TextInput 
                                style={styles.input} 
                                placeholder="Ex.: 142" 
                                placeholderTextColor="#a0a0a8"
                                keyboardType="numeric"
                                value={duracao}
                                onChangeText={setDuracao}
                            />
                        </View>
                    </View>
                </View>

                <Text style={styles.inputLabel}>Diretor</Text>
                <View style={styles.inputRowContainer}>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Digite o nome do diretor" 
                        placeholderTextColor="#a0a0a8"
                        value={diretor}
                        onChangeText={setDiretor}
                    />
                </View>

                <Text style={styles.inputLabel}>Descrição</Text>
                <View style={[styles.inputRowContainer, { height: 100, alignItems: 'flex-start', paddingTop: 12 }]}>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Fale sobre o filme..." 
                        placeholderTextColor="#a0a0a8"
                        multiline={true}
                        numberOfLines={4}
                        value={descricao}
                        onChangeText={setDescricao}
                    />
                </View>

                <View style={styles.rowDupla}>
                    <View style={{ flex: 1, marginRight: 8 }}>
                        <Text style={styles.inputLabel}>Nota (0 a 5)</Text>
                        <View style={styles.estrelasRow}>
                            {[1, 2, 3, 4, 5].map((estrela) => (
                                <TouchableOpacity key={estrela} onPress={() => setNota(estrela)}>
                                    <Ionicons 
                                        name={estrela <= nota ? "star" : "star-outline"} 
                                        size={20} 
                                        color="#FFD700" 
                                        style={{ marginRight: 4 }}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                    <View style={{ flex: 1, marginLeft: 8 }}>
                        <Text style={styles.inputLabel}>Status <Text style={{ color: '#d30046' }}>*</Text></Text>
                        <View style={styles.inputRowContainer}>
                            <TextInput 
                                style={styles.input} 
                                placeholder="Digite o status" 
                                placeholderTextColor="#a0a0a8"
                                value={status}
                                onChangeText={setStatus}
                            />
                        </View>
                    </View>
                </View>

                <Text style={styles.inputLabel}>Trailer (YouTube)</Text>
                <View style={styles.inputRowContainer}>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Cole o link do trailer (opcional)" 
                        placeholderTextColor="#a0a0a8"
                        value={trailer}
                        onChangeText={setTrailer}
                    />
                </View>

                <TouchableOpacity style={styles.buttonSalvar} onPress={lidarComSalvar}>
                    <Text style={styles.textButtonSalvar}>Salvar Filme</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonCancelar} onPress={() => navigation.goBack()}>
                    <Text style={styles.textButtonCancelar}>Cancelar</Text>
                </TouchableOpacity>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}
