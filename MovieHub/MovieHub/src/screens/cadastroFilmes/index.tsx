import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker"; 
import { styles } from "./styles";
import { createMovie, uploadCover } from "../../services/api";

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
    const [imagemBase64, setImagemBase64] = useState<string | null>(null);
    const [mimeImagem, setMimeImagem] = useState('image/jpeg');

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
            quality: 0.8,
            base64: true,
        });

        if (!resultado.canceled) {
            setImagemCapa(resultado.assets[0].uri);
            setImagemBase64(resultado.assets[0].base64 || null);
            setMimeImagem(resultado.assets[0].mimeType || 'image/jpeg');
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
            quality: 0.8,
            base64: true,
        });

        if (!resultado.canceled) {
            setImagemCapa(resultado.assets[0].uri);
            setImagemBase64(resultado.assets[0].base64 || null);
            setMimeImagem(resultado.assets[0].mimeType || 'image/jpeg');
        }
    };

        const lidarComSalvar = async () => {
        if (!titulo.trim() || !genero.trim() || !ano || !status.trim()) {
            Alert.alert("Campos obrigatórios", "Por favor, preencha todos os campos marcados com (*).");
            return;
        }
        try {
            const capa = imagemBase64 ? await uploadCover(imagemBase64, mimeImagem) : null;
            await createMovie({
                titulo: titulo.trim(), genero: genero.trim(), ano: Number(ano),
                duracao: duracao ? Number(duracao) : null, diretor: diretor.trim() || null,
                descricao: descricao.trim() || null, nota, status: status.trim(),
                imagem_url: capa?.image_url || null, trailer_url: trailer.trim() || null,
            });
            Alert.alert("Sucesso", "Filme cadastrado com sucesso!");
            navigation.navigate('Filmes');
        } catch (erro) {
            Alert.alert("Não foi possível salvar", erro instanceof Error ? erro.message : "Tente novamente.");
        }
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


