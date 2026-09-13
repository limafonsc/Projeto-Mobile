import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { filmesCadastrados } from "../dados";

export default function Filmes() {
    const navigation = useNavigation<any>();
    const [pesquisa, setPesquisa] = useState('');
    const [filtroAtivo, setFiltroAtivo] = useState('Todos');

    const filtros = ['Todos', 'Assistidos', 'Quero assistir', 'Assistindo'];

    const listaFiltrada = filmesCadastrados.filter(filme => {
        const matchesPesquisa = filme.titulo.toLowerCase().includes(pesquisa.toLowerCase());
        if (filtroAtivo === 'Todos') return matchesPesquisa;
        return matchesPesquisa && filme.status === filtroAtivo;
    });

    return (
        <View style={{ flex: 1, backgroundColor: '#121214' }}>
            <View style={styles.header}>
                <View style={{ width: 28 }} />
                <Text style={styles.headerTitle}>Filmes</Text>
                <TouchableOpacity>
                    <Ionicons name="funnel-outline" size={22} color="#FFF" />
                </TouchableOpacity>
            </View>

                <TouchableOpacity 
                    style={styles.buscaContainer} 
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('Pesquisa')}
                >
                    <Ionicons name="search" size={20} color="#a0a0a8" style={styles.buscaIcone} />
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={{ color: '#a0a0a8', fontSize: 16 }}>Pesquisar filmes</Text>
                    </View>
                    <TouchableOpacity style={styles.btnMais} onPress={() => navigation.navigate('cadastroFilme')}>
                        <Ionicons name="add" size={24} color="#FFF" />
                    </TouchableOpacity>
                </TouchableOpacity>


            <ScrollView style={styles.containerLista} showsVerticalScrollIndicator={false}>
                {listaFiltrada.map((filme) => (
                    <TouchableOpacity key={filme.id} style={styles.cardFilmeVertical}
                        onPress={() => navigation.navigate('DetalhesFilme', { id: filme.id })}>
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
                    </TouchableOpacity>
                ))}

                <View style={{ height: 100 }} />
            </ScrollView>

            <View style={styles.menuInferiorContainer}>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
                    <Ionicons name="home-outline" size={22} color="#a0a0a8" />
                    <Text style={styles.menuItemTextoInativo}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Ionicons name="film" size={22} color="#d30046" />
                    <Text style={styles.menuItemTextoAtivo}>Filmes</Text>
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
