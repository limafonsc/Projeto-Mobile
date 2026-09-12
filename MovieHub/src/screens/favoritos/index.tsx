import React, { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

export default function Favoritos() {
    const navigation = useNavigation<any>();
    const [pesquisa, setPesquisa] = useState('');

    // Dados fictícios fixos dos seus filmes favoritos para o teste visual
    const filmesFavoritos = [
        { id: '1', titulo: 'O Poderoso Chefão', ano: '1972', genero: 'Drama', nota: '5.0', imagem: 'https://placeholder.com' },
        { id: '2', titulo: 'Interestelar', ano: '2014', genero: 'Ficção Científica', nota: '4.8', imagem: 'https://placeholder.com' },
        { id: '3', titulo: 'Pulp Fiction', ano: '1994', genero: 'Policial, Drama', nota: '4.7', imagem: 'https://placeholder.com' },
        { id: '4', titulo: 'Batman: O Cavaleiro das Trevas', ano: '2008', genero: 'Ação, Crime', nota: '4.9', imagem: 'https://placeholder.com' },
        { id: '5', titulo: 'Um Sonho de Liberdade', ano: '1994', genero: 'Drama', nota: '4.8', imagem: 'https://placeholder.com' },
    ];

    return (
        <View style={{ flex: 1, backgroundColor: '#121214' }}>
            
            {/* Cabeçalho */}
            <View style={styles.header}>
                <View style={{ width: 24 }} /> {/* Espaçador esquerdo */}
                
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>Favoritos </Text>
                    <Ionicons name="heart" size={20} color="#d30046" />
                </View>

                <TouchableOpacity>
                    <Ionicons name="search" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>

            {/* Contador de itens */}
            <Text style={styles.txtContador}>{filmesFavoritos.length} filmes favoritos</Text>

            {/* Lista Vertical de Favoritos */}
            <ScrollView style={styles.containerLista} showsVerticalScrollIndicator={false}>
                {filmesFavoritos.map((filme) => (
                    <TouchableOpacity 
                        key={filme.id} 
                        style={styles.cardFilmeVertical} 
                        onPress={() => navigation.navigate('DetalhesFilme')}
                    >
                        <Image source={{ uri: filme.imagem }} style={styles.capaFilmeVertical} />
                        
                        <View style={styles.infoFilmeVertical}>
                            <Text style={styles.tituloFilmeVertical} numberOfLines={1}>{filme.titulo}</Text>
                            <Text style={styles.detalhesFilmeVertical}>{filme.ano} • {filme.genero}</Text>
                            <View style={styles.notaContainerVertical}>
                                <Ionicons name="star" size={14} color="#FFD700" />
                                <Text style={styles.notaFilmeVertical}> {filme.nota}</Text>
                            </View>
                        </View>

                        {/* Coração preenchido indicando que está favoritado */}
                        <TouchableOpacity style={styles.btnFavoritoCard}>
                            <Ionicons name="heart" size={24} color="#d30046" />
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))}

                {/* Espaço para não sumir atrás da barra inferior */}
                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Barra de Tarefas Inferior Fixa */}
            <View style={styles.menuInferiorContainer}>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
                    <Ionicons name="home-outline" size={22} color="#a0a0a8" />
                    <Text style={styles.menuItemTextoInativo}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Filmes')}>
                    <Ionicons name="film-outline" size={22} color="#a0a0a8" />
                    <Text style={styles.menuItemTextoInativo}>Filmes</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Ionicons name="heart" size={22} color="#d30046" />
                    <Text style={styles.menuItemTextoAtivo}>Favoritos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Ionicons name="person-outline" size={22} color="#a0a0a8" />
                    <Text style={styles.menuItemTextoInativo}>Perfil</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}