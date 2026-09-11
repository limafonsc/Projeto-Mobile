import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

export default function Filmes() {
    const navigation = useNavigation<any>();
    const [pesquisa, setPesquisa] = useState('');
    const [filtroAtivo, setFiltroAtivo] = useState('Todos');

    // Categorias/Filtros superiores
    const filtros = ['Todos', 'Assistidos', 'Quero assistir', 'Assistindo'];

    // Dados fictícios dos filmes cadastrados
    const listaDeFilmes = [
        { id: '1', titulo: 'Interestelar', ano: '2014', genero: 'Ficção Científica', nota: '4.8', favoritado: true, imagem: 'https://placeholder.com' },
        { id: '2', titulo: 'O Poderoso Chefão', ano: '1972', genero: 'Drama', nota: '5.0', favoritado: true, imagem: 'https://placeholder.com' },
        { id: '3', titulo: 'Duna: Parte Dois', ano: '2024', genero: 'Ficção Científica', nota: '4.5', favoritado: false, imagem: 'https://placeholder.com' },
        { id: '4', titulo: 'Forrest Gump', ano: '1994', genero: 'Drama', nota: '4.7', favoritado: false, imagem: 'https://placeholder.com' },
        { id: '5', titulo: 'Top Gun: Maverick', ano: '2022', genero: 'Ação', nota: '4.6', favoritado: true, imagem: 'https://placeholder.com' },
        { id: '6', titulo: 'Clube da Luta', ano: '1999', genero: 'Drama', nota: '4.3', favoritado: false, imagem: 'https://placeholder.com' },
    ];

    return (
        <View style={{ flex: 1, backgroundColor: '#121214' }}>
            
            {/* Cabeçalho da Tela */}
            <View style={styles.header}>
                <View style={{ width: 28 }} /> {/* Espaçador para alinhar o título */}
                <Text style={styles.headerTitle}>Filmes</Text>
                <TouchableOpacity>
                    <Ionicons name="funnel-outline" size={22} color="#FFF" />
                </TouchableOpacity>
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
                <TouchableOpacity style={styles.btnFiltroOpcoes}>
                    <Ionicons name="options-outline" size={22} color="#a0a0a8" />
                </TouchableOpacity>
            </View>

            {/* Abas de Filtros Horizontais */}
            <View style={{ maxHeight: 40, marginBottom: 16 }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.containerFiltros}>
                    {filtros.map((filtro) => (
                        <TouchableOpacity 
                            key={filtro} 
                            style={styles.btnFiltroItem}
                            onPress={() => setFiltroAtivo(filtro)}
                        >
                            <Text style={filtroAtivo === filtro ? styles.txtFiltroAtivo : styles.txtFiltroInativo}>
                                {filtro}
                            </Text>
                            {filtroAtivo === filtro && <View style={styles.linhaIndicadoraAtiva} />}
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Lista Vertical de Filmes */}
            <ScrollView style={styles.containerLista} showsVerticalScrollIndicator={false}>
                {listaDeFilmes.map((filme) => (
                    <View key={filme.id} style={styles.cardFilmeVertical}>
                        <Image source={{ uri: filme.imagem }} style={styles.capaFilmeVertical} />
                        
                        <View style={styles.infoFilmeVertical}>
                            <Text style={styles.tituloFilmeVertical} numberOfLines={1}>{filme.titulo}</Text>
                            <Text style={styles.detalhesFilmeVertical}>{filme.ano} • {filme.genero}</Text>
                            <View style={styles.notaContainerVertical}>
                                <Ionicons name="star" size={14} color="#FFD700" />
                                <Text style={styles.notaFilmeVertical}> {filme.nota}</Text>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.btnFavoritoCard}>
                            <Ionicons 
                                name={filme.favoritado ? "heart" : "heart-outline"} 
                                size={24} 
                                color={filme.favoritado ? "#d30046" : "#a0a0a8"} 
                            />
                        </TouchableOpacity>
                    </View>
                ))}

                {/* Espaço final para não cortar atrás da barra de tarefas */}
                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Barra de Tarefas Inferior Fixa */}
            <View style={styles.menuInferiorContainer}>
                
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('home')}>
                    <Ionicons name="home-outline" size={22} color="#a0a0a8" />
                    <Text style={styles.menuItemTextoInativo}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Ionicons name="film" size={22} color="#d30046" />
                    <Text style={styles.menuItemTextoAtivo}>Filmes</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('favoritos')}>
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