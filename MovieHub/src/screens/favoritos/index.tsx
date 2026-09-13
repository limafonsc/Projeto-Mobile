import React, { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { filmesCadastrados } from "../dados";

export default function Favoritos() {
    const navigation = useNavigation<any>();
    const [pesquisa, setPesquisa] = useState('');

    const filmesFavoritos = filmesCadastrados.filter(f => f.favoritado && f.titulo.toLowerCase().includes(pesquisa.toLowerCase()));

    return (
        <View style={{ flex: 1, backgroundColor: '#121214' }}>
            <View style={styles.header}>
                <View style={{ width: 24 }} />
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>Favoritos </Text>
                    <Ionicons name="heart" size={20} color="#d30046" />
                </View>
                <TouchableOpacity>
                    <Ionicons name="search" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>

            <Text style={styles.txtContador}>{filmesFavoritos.length} filmes favoritos</Text>

            <ScrollView style={styles.containerLista} showsVerticalScrollIndicator={false}>
                {filmesFavoritos.map((filme) => (
                    <TouchableOpacity 
                        key={filme.id} 
                        style={styles.cardFilmeVertical} 
                        onPress={() => navigation.navigate('DetalhesFilme', { id: filme.id })}
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

                        <TouchableOpacity style={styles.btnFavoritoCard}>
                            <Ionicons name="heart" size={24} color="#d30046" />
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
