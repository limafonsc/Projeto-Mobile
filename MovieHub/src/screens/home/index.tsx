import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

export default function Home() {
    const navigation = useNavigation<any>();
    const [pesquisa, setPesquisa] = useState('');

    // Dados fictícios para os filmes recentes
    const filmesRecentes = [
        { id: '1', titulo: 'Duna: Parte Dois', ano: '2024', nota: '4.5', imagem: 'https://placeholder.com' },
        { id: '2', titulo: 'Oppenheimer', ano: '2023', nota: '5.0', imagem: 'https://placeholder.com' },
        { id: '3', titulo: 'Interstellar', ano: '2014', nota: '4.8', imagem: 'https://placeholder.com' },
    ];

    // Dados fictícios para os filmes favoritos
    const filmesFavoritos = [
        { id: '4', titulo: 'O Poderoso Chefão', ano: '1972', nota: '5.0', imagem: 'https://placeholder.com' },
        { id: '5', titulo: 'Forrest Gump', ano: '1994', nota: '4.7', imagem: 'https://placeholder.com' },
    ];

    return (
        <View style={{ flex: 1, backgroundColor: '#121214' }}>
            
            {/* Conteúdo Rolável da Página */}
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                
                {/* Cabeçalho */}
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Ionicons name="menu" size={28} color="#FFF" />
                    </TouchableOpacity>
                    
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.textMovie}>Movie</Text>
                        <Text style={styles.textHub}>Hub</Text>
                    </View>

                    <TouchableOpacity>
                        <Ionicons name="notifications-outline" size={24} color="#FFF" />
                    </TouchableOpacity>
                </View>

                {/* Saudação */}
                <View style={styles.saudacaoContainer}>
                    <Text style={styles.txtOla}>Olá!</Text>
                    <Text style={styles.txtSubtitulo}>Desfrute dos seus filmes favoritos.</Text>
                </View>

                {/* Barra de Pesquisa */}
                <View style={styles.buscaContainer}>
                    <Ionicons name="search" size={20} color="#a0a0a8" style={styles.buscaIcone} />
                    <TextInput 
                        style={styles.inputBusca}
                        placeholder="Pesquisar filmes"
                        placeholderTextColor="#a0a0a8"
                        value={pesquisa}
                        onChangeText={setPesquisa}
                    />
                    <TouchableOpacity style={styles.btnMais} onPress={() => navigation.navigate('cadastroFilme')}>
                        <Ionicons name="add" size={24} color="#FFF" />
                    </TouchableOpacity>
                </View>

                {/* Seção de Resumo / Estatísticas */}
                <Text style={styles.secaoTitulo}>Resumo</Text>
                <View style={styles.resumoContainer}>
                    <View style={styles.cardResumo}>
                        <Ionicons name="film-outline" size={24} color="#FFF" />
                        <Text style={styles.cardResumoLabel}>Total de filmes</Text>
                        <Text style={styles.cardResumoValor}>25</Text>
                    </View>
                    <View style={styles.cardResumo}>
                        <Ionicons name="checkmark-circle-outline" size={24} color="#4CD964" />
                        <Text style={styles.cardResumoLabel}>Assistidos</Text>
                        <Text style={styles.cardResumoValor}>18</Text>
                    </View>
                    <View style={styles.cardResumo}>
                        <Ionicons name="time-outline" size={24} color="#007AFF" />
                        <Text style={styles.cardResumoLabel}>Quero assistir</Text>
                        <Text style={styles.cardResumoValor}>7</Text>
                    </View>
                    <View style={styles.cardResumo}>
                        <Ionicons name="heart-outline" size={24} color="#d30046" />
                        <Text style={styles.cardResumoLabel}>Favoritos</Text>
                        <Text style={styles.cardResumoValor}>5</Text>
                    </View>
                </View>

                {/* Filmes Recentes */}
                <View style={styles.secaoHeader}>
                    <Text style={styles.secaoTitulo}>Filmes Recentes</Text>
                    <TouchableOpacity><Text style={styles.txtVerTodos}>Ver todos</Text></TouchableOpacity>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.listaFilmes}>
                    {filmesRecentes.map((filme) => (
                        <TouchableOpacity key={filme.id} style={styles.cardFilme}
                        onPress={() => navigation.navigate('DetalhesFilme')}>
                            <Image source={{ uri: filme.imagem }} style={styles.capaFilme} />
                            <Text style={styles.tituloFilme} numberOfLines={1}>{filme.titulo}</Text>
                            <Text style={styles.anoFilme}>{filme.ano}</Text>
                            <View style={styles.notaContainer}>
                                <Ionicons name="star" size={12} color="#FFD700" />
                                <Text style={styles.notaFilme}> {filme.nota}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Favoritos */}
                <View style={styles.secaoHeader}>
                    <Text style={styles.secaoTitulo}>Favoritos</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Favoritos')}><Text style={styles.txtVerTodos} >Ver todos</Text></TouchableOpacity>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.listaFilmes}>
                    {filmesFavoritos.map((filme) => (
                        <TouchableOpacity key={filme.id} style={styles.cardFilme}
                        onPress={() => navigation.navigate('DetalhesFilme')}>
                            <Image source={{ uri: filme.imagem }} style={styles.capaFilme} />
                            <Text style={styles.tituloFilme} numberOfLines={1}>{filme.titulo}</Text>
                            <Text style={styles.anoFilme}>{filme.ano}</Text>
                            <View style={styles.notaContainer}>
                                <Ionicons name="star" size={12} color="#FFD700" />
                                <Text style={styles.notaFilme}> {filme.nota}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Espaço extra inferior para o conteúdo não sumir atrás do menu */}
                <View style={{ height: 100 }} />

            </ScrollView>

            {/* Barra de Tarefas Inferior Fixa */}
            <View style={styles.menuInferiorContainer}>
                
                <TouchableOpacity style={styles.menuItem}>
                    <Ionicons name="home" size={22} color="#d30046" />
                    <Text style={styles.menuItemTextoAtivo}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Filmes')}>
                    <Ionicons name="film-outline" size={22} color="#a0a0a8" />
                    <Text style={styles.menuItemTextoInativo}>Filmes</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Favoritos')}>
                    <Ionicons name="heart-outline" size={22} color="#a0a0a8" />
                    <Text style={styles.menuItemTextoInativo}>Favoritos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Ionicons name="person-outline" size={22} color="#a0a0a8" />
                    <Text style={styles.menuItemTextoInativo}>Perfil</Text>
                </TouchableOpacity>

            </View>

        </View>
    );
}