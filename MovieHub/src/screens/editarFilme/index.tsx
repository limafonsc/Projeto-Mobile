import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { filmesCadastrados } from "../dados";

export default function EditarFilme() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { id } = route.params || { id: '3' };

    const filmeBase = filmesCadastrados.find(f => f.id === id) || filmesCadastrados[0];

    const [titulo, setTitulo] = useState(filmeBase.titulo);
    const [genero, setGenero] = useState(filmeBase.genero);
    const [ano, setAno] = useState(filmeBase.ano);
    const [duracao, setDuracao] = useState(filmeBase.duracao.replace(/[^0-9]/g, ''));
    const [diretor, setDiretor] = useState(filmeBase.diretor);
    const [descricao, setDescricao] = useState(filmeBase.descricao);
    const [status, setStatus] = useState(filmeBase.status);
    const [trailer, setTrailer] = useState('https://youtube.com');
    const [nota, setNota] = useState(Math.floor(parseFloat(filmeBase.nota.replace(',', '.'))));

    const lidarComSalvarAlteracoes = () => {
        if (!titulo || !genero || !ano || !status) {
            Alert.alert("Erro", "Por favor, preencha os campos obrigatórios (*).");
            return;
        }

        Alert.alert("Sucesso", "Alterações salvas com sucesso!");
        navigation.goBack();
    };

    const lidarComExcluir = () => {
        Alert.alert(
            "Excluir Filme",
            "Tem certeza que deseja excluir este filme permanentemente?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Excluir", style: "destructive", onPress: () => navigation.navigate('Filmes') }
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
                    <Image source={{ uri: filmeBase.imagem }} style={styles.previewCapa} />
                    <View style={styles.botoesImagemColuna}>
                        <TouchableOpacity style={styles.btnUploadOpcao}>
                            <Ionicons name="image-outline" size={16} color="#d30046" />
                            <Text style={styles.txtUploadOpcao}> Alterar da Galeria</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnUploadOpcao}>
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
