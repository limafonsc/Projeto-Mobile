import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

export default function EditarFilme() {
    const navigation = useNavigation<any>();

    // Estados preenchidos com os dados fictícios para simular a edição
    const [titulo, setTitulo] = useState('Interestelar');
    const [genero, setGenero] = useState('Ficção Científica, Aventura');
    const [ano, setAno] = useState('2014');
    const [duracao, setDuracao] = useState('169');
    const [diretor, setDiretor] = useState('Christopher Nolan');
    const [descricao, setDescricao] = useState('Uma equipe de exploradores viaja através de um buraco de minhoca recém-descoberto para superar os limites das viagens espaciais humanas e conquistar as vastas distâncias interestelares.');
    const [status, setStatus] = useState('Assistido');
    const [trailer, setTrailer] = useState('https://youtube.com');
    const [nota, setNota] = useState(4);

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
            
            {/* Cabeçalho com botão voltar e botão de excluir */}
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
                
                {/* Seção da Imagem do Filme (Estilo do Slide) */}
                <Text style={styles.inputLabel}>Imagem do filme</Text>
                <View style={styles.blocoImagemEdicao}>
                    <Image source={{ uri: 'https://placeholder.com' }} style={styles.previewCapa} />
                    
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

                {/* Campo: Título */}
                <Text style={styles.inputLabel}>Título <Text style={{ color: '#d30046' }}>*</Text></Text>
                <View style={styles.inputRowContainer}>
                    <TextInput 
                        style={styles.input} 
                        value={titulo}
                        onChangeText={setTitulo}
                    />
                </View>

                {/* Campo: Gênero */}
                <Text style={styles.inputLabel}>Gênero <Text style={{ color: '#d30046' }}>*</Text></Text>
                <View style={styles.inputRowContainer}>
                    <TextInput 
                        style={styles.input} 
                        value={genero}
                        onChangeText={setGenero}
                    />
                    <Ionicons name="chevron-down" size={18} color="#a0a0a8" />
                </View>

                {/* Fileira dupla: Ano e Duração */}
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

                {/* Campo: Diretor */}
                <Text style={styles.inputLabel}>Diretor</Text>
                <View style={styles.inputRowContainer}>
                    <TextInput 
                        style={styles.input} 
                        value={diretor}
                        onChangeText={setDiretor}
                    />
                </View>

                {/* Campo: Descrição */}
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

                {/* Fileira dupla: Nota e Status */}
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
                            <Text style={styles.txtNotaTexto}> 4,0</Text>
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

                {/* Campo: Trailer */}
                <Text style={styles.inputLabel}>Trailer (YouTube)</Text>
                <View style={styles.inputRowContainer}>
                    <TextInput 
                        style={styles.input} 
                        value={trailer}
                        onChangeText={setTrailer}
                    />
                </View>

                {/* Botões de Ação */}
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