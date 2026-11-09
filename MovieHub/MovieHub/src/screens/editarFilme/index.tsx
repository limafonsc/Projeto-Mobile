import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker"; 
import { styles } from "./styles";
import { Filme, getMovie, updateMovie, deleteMovie, uploadCover } from "../../services/api";

export default function EditarFilme() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { id } = route.params || { id: '3' };

    const [titulo, setTitulo] = useState('');
    const [genero, setGenero] = useState('');
    const [ano, setAno] = useState('');
    const [duracao, setDuracao] = useState('');
    const [diretor, setDiretor] = useState('');
    const [descricao, setDescricao] = useState('');
    const [status, setStatus] = useState('');
    const [trailer, setTrailer] = useState('');
    const [nota, setNota] = useState(0);
    const [imagemCapa, setImagemCapa] = useState<any>(null);
    const [imagemBase64, setImagemBase64] = useState<string | null>(null);
    const [mimeImagem, setMimeImagem] = useState('image/jpeg');

    useEffect(() => {
        getMovie(String(id)).then((filme: Filme) => {
            setTitulo(filme.titulo);
            setGenero(filme.genero);
            setAno(filme.ano);
            setDuracao(filme.duracao.replace(/[^0-9]/g, ''));
            setDiretor(filme.diretor);
            setDescricao(filme.descricao);
            setStatus(filme.status);
            setTrailer(filme.trailer_url || '');
            setNota(Number(filme.nota));
            setImagemCapa(filme.imagem ? { uri: filme.imagem } : require('../../../assets/images/duna.jpg'));
        }).catch((erro: Error) => Alert.alert('Erro ao carregar filme', erro.message));
    }, [id]);
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
            setImagemCapa({ uri: resultado.assets[0].uri });
            setImagemBase64(resultado.assets[0].base64 || null);
            setMimeImagem(resultado.assets[0].mimeType || 'image/jpeg');
        }
    };

    const abrirCamera = async () => {
        const permissao = await ImagePicker.requestCameraPermissionsAsync();
        if (!permissao.granted) {
            Alert.alert("Permissão necessária", "Precisamos de acesso à câmera para tirar a foto.");
            return;
        }

        const resultado = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect:[3,4],
            quality: 0.8,
            base64: true,
        });

        if (!resultado.canceled) {
            setImagemCapa({ uri: resultado.assets[0].uri });
            setImagemBase64(resultado.assets[0].base64 || null);
            setMimeImagem(resultado.assets[0].mimeType || 'image/jpeg');
        }
    };

    const lidarComSalvarAlteracoes = async () => {
        if (!titulo.trim() || !genero.trim() || !ano || !status.trim()) {
            Alert.alert("Erro", "Por favor, preencha os campos obrigatórios (*).");
            return;
        }
        try {
            const capa = imagemBase64 ? await uploadCover(imagemBase64, mimeImagem) : null;
            await updateMovie(String(id), {
                titulo: titulo.trim(), genero: genero.trim(), ano: Number(ano),
                duracao: duracao ? Number(duracao) : null, diretor: diretor.trim() || null,
                descricao: descricao.trim() || null, nota, status: status.trim(),
                trailer_url: trailer.trim() || null,
                ...(capa ? { imagem_url: capa.image_url } : {}),
            });
            navigation.goBack();
        } catch (erro) {
            Alert.alert("Não foi possível salvar", erro instanceof Error ? erro.message : "Tente novamente.");
        }
    };

    const lidarComExcluir = () => {
        Alert.alert(
            "Excluir Filme",
            "Tem certeza que deseja excluir este filme?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Excluir", style: "destructive", onPress: async () => {
                    try {
                        await deleteMovie(String(id));
                        navigation.navigate('Filmes');
                    } catch (erro) {
                        Alert.alert('Não foi possível excluir', erro instanceof Error ? erro.message : 'Tente novamente.');
                    }
                } }
            ]
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#121214' }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Editar Filme</Text>
                <TouchableOpacity onPress={lidarComExcluir}>
                    <Ionicons name="trash-outline" size={24} color="#E51C44" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <Text style={styles.inputLabel}>Imagem do filme</Text>
                <View style={styles.blocoImagemEdicao}>
                    <Image source={imagemCapa || require("../../../assets/images/duna.jpg")} style={styles.previewCapa} />
                    <View style={styles.botoesImagemColuna}>
                        <TouchableOpacity style={styles.btnUploadOpcao} onPress={abrirGaleria}>
                            <Ionicons name="image-outline" size={16} color="#d30046" />
                            <Text style={styles.txtUploadOpcao}> Alterar da Galeria</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnUploadOpcao} onPress={abrirCamera}>
                            <Ionicons name="camera-outline" size={16} color="#d30046" />
                            <Text style={styles.txtUploadOpcao}> Tirar Foto</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={styles.inputLabel}>Título <Text style={{ color: '#d30046' }}>*</Text></Text>
                <View style={styles.inputRowContainer}>
                    <TextInput 
                        style={styles.input} 
                        value={titulo}
                        onChangeText={setTitulo}
                    />
                </View>

                <Text style={styles.inputLabel}>Gênero <Text style={{ color: '#d30046' }}>*</Text></Text>
                <View style={styles.inputRowContainer}>
                    <TextInput 
                        style={styles.input} 
                        value={genero}
                        onChangeText={setGenero}
                    />
                    <Ionicons name="chevron-down" size={18} color="#a0a0a8" />
                </View>

                <View style={styles.rowDupla}>
                    <View style={{ flex: 1, marginRight: 8 }}>
                        <Text style={styles.inputLabel}>Ano <Text style={{ color: '#d30046' }}>*</Text></Text>
                        <View style={styles.inputRowContainer}>
                            <TextInput 
                                style={styles.input} 
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
                        value={diretor}
                        onChangeText={setDiretor}
                    />
                </View>

                <Text style={styles.inputLabel}>Descrição <Text style={{ color: '#d30046' }}>*</Text></Text>
                <View style={[styles.inputRowContainer, { height: 100, alignItems: 'flex-start', paddingTop: 12 }]}>
                    <TextInput 
                        style={styles.input} 
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
                                        size={18} 
                                        color="#FFD700" 
                                        style={{ marginRight: 2 }}
                                    />
                                </TouchableOpacity>
                            ))}
                            <Text style={styles.txtNotaTexto}> {nota.toFixed(1).replace('.', ',')}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, marginLeft: 8 }}>
                        <Text style={styles.inputLabel}>Status <Text style={{ color: '#d30046' }}>*</Text></Text>
                        <View style={styles.inputRowContainer}>
                            <TextInput 
                                style={styles.input} 
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
                        value={trailer}
                        onChangeText={setTrailer}
                    />
                </View>

                <TouchableOpacity style={styles.buttonSalvar} onPress={lidarComSalvarAlteracoes}>
                    <Text style={styles.textButtonSalvar}>Salvar Alterações</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonCancelar} onPress={() => navigation.goBack()}>
                    <Text style={styles.textButtonCancelar}>Cancelar</Text>
                </TouchableOpacity>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}



