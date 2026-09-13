import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { filmesCadastrados } from "../dados";

export default function Home() {
    const navigation = useNavigation<any>();
    const [pesquisa, setPesquisa] = useState('');

    const filmesRecentes = filmesCadastrados.slice(0, 3);
    const filmesFavoritos = filmesCadastrados.filter((f: any) => f.favoritado).slice(0, 2);

    return (
        <View style={{ flex: 1, backgroundColor: '#121214' }}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.textMovie}>Movie</Text>
                        <Text style={styles.textHub}>Hub</Text>
                    </View>
                </View>

                <View style={styles.saudacaoContainer}>
                    <Text style={styles.txtOla}>Olá!</Text>
                    <Text style={styles.txtSubtitulo}>Desfrute dos seus filmes favoritos.</Text>
                </View>

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

                <Text style={styles.secaoTitulo}>Resumo</Text>
                <View style={styles.resumoContainer}>
                    <View style={styles.cardResumo}>
                        <Ionicons name="film-outline" size={24} color="#FFF" />
                        <Text style={styles.cardResumoLabel}>Total de filmes</Text>
                        <Text style={styles.cardResumoValor}>{filmesCadastrados.length}</Text>
                    </View>
                    <View style={styles.cardResumo}>
                        <Ionicons name="checkmark-circle-outline" size={24} color="#4CD964" />
                        <Text style={styles.cardResumoLabel}>Assistidos</Text>
                        <Text style={styles.cardResumoValor}>{filmesCadastrados.filter((f: any) => f.status === 'Assistido').length}</Text>
                    </View>
                    <View style={styles.cardResumo}>
                        <Ionicons name="time-outline" size={24} color="#007AFF" />
                        <Text style={styles.cardResumoLabel}>Quero assistir</Text>
                        <Text style={styles.cardResumoValor}>{filmesCadastrados.filter((f: any) => f.status === 'Quero assistir').length}</Text>
                    </View>
                    <View style={styles.cardResumo}>
                        <Ionicons name="heart-outline" size={24} color="#d30046" />
                        <Text style={styles.cardResumoLabel}>Favoritos</Text>
                        <Text style={styles.cardResumoValor}>{filmesCadastrados.filter((f: any) => f.favoritado).length}</Text>
                    </View>
                </View>

                <View style={styles.secaoHeader}>
                    <Text style={styles.secaoTitulo}>Filmes Recentes</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Filmes')}><Text style={styles.txtVerTodos}>Ver todos</Text></TouchableOpacity>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.listaFilmes}>
                    {filmesRecentes.map((filme: any) => (
                        <TouchableOpacity key={filme.id} style={styles.cardFilme}
                        onPress={() => navigation.navigate('DetalhesFilme', { id: filme.id })}>
                            <Image source={filme.imagem} style={styles.capaFilme} />
                            <Text style={styles.tituloFilme} numberOfLines={1}>{filme.titulo}</Text>
                            <Text style={styles.anoFilme}>{filme.ano}</Text>
                            <View style={styles.notaContainer}>
                                <Ionicons name="star" size={12} color="#FFD700" />
                                <Text style={styles.notaFilme}> {filme.nota}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <View style={styles.secaoHeader}>
                    <Text style={styles.secaoTitulo}>Favoritos</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Favoritos')}><Text style={styles.txtVerTodos} >Ver todos</Text></TouchableOpacity>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.listaFilmes}>
                    {filmesFavoritos.map((filme: any) => (
                        <TouchableOpacity key={filme.id} style={styles.cardFilme}
                        onPress={() => navigation.navigate('DetalhesFilme', { id: filme.id })}>
                            <Image source={filme.imagem} style={styles.capaFilme} />
                            <Text style={styles.tituloFilme} numberOfLines={1}>{filme.titulo}</Text>
                            <Text style={styles.anoFilme}>{filme.ano}</Text>
                            <View style={styles.notaContainer}>
                                <Ionicons name="star" size={12} color="#FFD700" />
                                <Text style={styles.notaFilme}> {filme.nota}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <View style={{ height: 100 }} />
            </ScrollView>

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
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Perfil')}>
                    <Ionicons name="person-outline" size={22} color="#a0a0a8" />
                    <Text style={styles.menuItemTextoInativo}>Perfil</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
