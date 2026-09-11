import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

export default function CadastroFilme() {
    const navigation = useNavigation<any>();

    // Estados para guardar o que o usuário digita
    const [titulo, setTitulo] = useState('');
    const [genero, setGenero] = useState('');
    const [ano, setAno] = useState('');
    const [duracao, setDuracao] = useState('');
    const [diretor, setDiretor] = useState('');
    const [descricao, setDescricao] = useState('');
    const [status, setStatus] = useState('');
    const [trailer, setTrailer] = useState('');
    const [nota, setNota] = useState(0); // Nota de 1 a 5 estrelas

    const lidarComSalvar = () => {
        console.log("Filme salvo:", { titulo, genero, ano, duracao, diretor, descricao, nota, status, trailer });
        navigation.goBack(); // Volta para a tela anterior
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#121214' }}>
            
            {/* Cabeçalho */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Novo Filme</Text>
                <View style={{ width: 24 }} /> {/* Espaçador para centralizar o título */}
            </View>

            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                
                {/* Área de Upload da Capa */}
                <View style={styles.uploadContainer}>
                    <Ionicons name="film-outline" size={32} color="#a0a0a8" style={{ marginBottom: 8 }} />
                    <Text style={styles.textUploadDescricao}>Adicionar capa do filme</Text>
                    <View style={styles.uploadBotoesRow}>
                        <TouchableOpacity style={styles.btnUploadOpcao}>
                            <Ionicons name="image-outline" size={16} color="#d30046" />
                            <Text style={styles.txtUploadOpcao}> Galeria</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnUploadOpcao}>
                            <Ionicons name="camera-outline" size={16} color="#d30046" />
                            <Text style={styles.txtUploadOpcao}> Câmera</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Campo: Título */}
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

                {/* Campo: Gênero */}
                <Text style={styles.inputLabel}>Gênero <Text style={{ color: '#d30046' }}>*</Text></Text>
                <View style={styles.inputRowContainer}>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Selecione ou digite o gênero" 
                        placeholderTextColor="#a0a0a8"
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

                {/* Campo: Diretor */}
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

                {/* Campo: Descrição */}
                <Text style={styles.inputLabel}>Descrição</Text>
                <View style={[styles.inputRowContainer, { height: 100, alignItems: 'flex-start', paddingTop: 12 }]}>
                    <TextInput 
                        style={[styles.input]} 
                        placeholder="Fale sobre o filme..." 
                        placeholderTextColor="#a0a0a8"
                        multiline={true}
                        numberOfLines={4}
                        value={descricao}
                        onChangeText={setDescricao}
                    />
                </View>

                {/* Fileira dupla: Nota (Estrelas) e Status */}
                <View style={styles.rowDupla}>
                    <View style={{ flex: 1, marginRight: 8 }}>
                        <Text style={styles.inputLabel}>Nota (0 a 5)</Text>
                        <View style={styles.estrelasRow}>
                            {[1, 2, 3, 4, 5].map((estrela) => (
                                <TouchableOpacity key={estrela} onPress={() => setNota(estrela)}>
                                    <Ionicons 
                                        name={estrela <= nota ? "star" : "star-outline"} 
                                        size={20} 
                                        color={estrela <= nota ? "#FFD700" : "#a0a0a8"} 
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
                                placeholder="Selecione o status" 
                                placeholderTextColor="#a0a0a8"
                                value={status}
                                onChangeText={setStatus}
                            />
                            <Ionicons name="chevron-down" size={18} color="#a0a0a8" />
                        </View>
                    </View>
                </View>

                {/* Campo: Trailer */}
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

                {/* Botões de Ação */}
                <TouchableOpacity style={styles.buttonSalvar} onPress={lidarComSalvar}>
                    <Text style={styles.textButtonSalvar}>Salvar Filme</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonCancelar} onPress={() => navigation.goBack()}>
                    <Text style={styles.textButtonCancelar}>Cancelar</Text>
                </TouchableOpacity>

                {/* Espaço extra no final da rolagem */}
                <View style={{ height: 40 }} />

            </ScrollView>
        </View>
    );
}