import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

export default function Generos() {
    const navigation = useNavigation<any>();

    const listaGeneros = [
        { id: "1", nome: "Ação", quantidade: "12 filmes", icone: "flash-outline" },
        { id: "2", nome: "Comédia", quantidade: "8 filmes", icone: "happy-outline" },
        { id: "3", nome: "Drama", quantidade: "14 filmes", icone: "sad-outline" },
        { id: "4", nome: "Ficção Científica", quantidade: "10 filmes", icone: "planet-outline" },
        { id: "5", nome: "Terror", quantidade: "6 filmes", icone: "skull-outline" },
        { id: "6", nome: "Suspense", quantidade: "9 filmes", icone: "eye-outline" },
        { id: "7", nome: "Animação", quantidade: "7 filmes", icone: "film-outline" },
        { id: "8", nome: "Documentário", quantidade: "5 filmes", icone: "videocam-outline" },
        { id: "9", nome: "Romance", quantidade: "6 filmes", icone: "heart-outline" },
    ];

    return (
        <View style={{ flex: 1, backgroundColor: '#121214' }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Gêneros</Text>
                <TouchableOpacity>
                    <Ionicons name="search" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.subHeader}>
                    <Ionicons name="filter-outline" size={18} color="#a0a0a8" style={{ marginRight: 6 }} />
                    <Text style={styles.txtSubHeader}>Selecione um gênero</Text>
                </View>

                {listaGeneros.map((genero) => (
                    <TouchableOpacity 
                        key={genero.id} 
                        style={styles.cardGenero}
                        onPress={() => navigation.navigate('Filtros')}
                    >
                        <View style={styles.blocoEsquerda}>
                            <Ionicons name={genero.icone as any} size={22} color="#d30046" style={{ marginRight: 16 }} />
                            <Text style={styles.txtNomeGenero}>{genero.nome}</Text>
                        </View>
                        
                        <View style={styles.blocoDireita}>
                            <Text style={styles.txtQuantidade}>{genero.quantidade}</Text>
                            <Ionicons name="chevron-forward" size={18} color="#323238" />
                        </View>
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
