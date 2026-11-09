import React, { useCallback, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { Filme, getMovies, updateMovie } from "../../services/api";

const capaPadrao = require('../../../assets/images/duna.jpg');

export default function Favoritos() {
    const navigation = useNavigation<any>();
    const [filmesFavoritos, setFilmesFavoritos] = useState<Filme[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');

    useFocusEffect(useCallback(() => {
        let ativo = true;
        setCarregando(true);
        getMovies({ favorite: true }).then((resultado) => {
            if (ativo) { setFilmesFavoritos(resultado); setErro(''); }
        }).catch((falha: Error) => { if (ativo) setErro(falha.message); })
          .finally(() => { if (ativo) setCarregando(false); });
        return () => { ativo = false; };
    }, []));

    const removerFavorito = async (filme: Filme) => {
        try {
            await updateMovie(filme.id, { favoritado: false });
            setFilmesFavoritos((atuais) => atuais.filter((item) => item.id !== filme.id));
        } catch (falha) {
            setErro(falha instanceof Error ? falha.message : 'Não foi possível atualizar o favorito.');
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#121214' }}>
            <View style={styles.header}>
                <View style={{ width: 24 }} />
                <View style={styles.headerTitleContainer}><Text style={styles.headerTitle}>Favoritos </Text><Ionicons name="heart" size={20} color="#d30046" /></View>
            </View>
            <Text style={styles.txtContador}>{filmesFavoritos.length} filmes favoritos</Text>
            <ScrollView style={styles.containerLista} showsVerticalScrollIndicator={false}>
                {carregando && <ActivityIndicator color="#d30046" style={{ marginTop: 30 }} />}
                {!carregando && Boolean(erro) && <Text style={{ color: '#ff8da8', padding: 20 }}>{erro}</Text>}
                {!carregando && !erro && filmesFavoritos.length === 0 && <Text style={{ color: '#a0a0a8', padding: 20 }}>Você ainda não favoritou nenhum filme.</Text>}
                {filmesFavoritos.map((filme) => (
                    <TouchableOpacity key={filme.id} style={styles.cardFilmeVertical} onPress={() => navigation.navigate('DetalhesFilme', { id: filme.id })}>
                        <Image source={filme.imagem ? { uri: filme.imagem } : capaPadrao} style={styles.capaFilmeVertical} />
                        <View style={styles.infoFilmeVertical}>
                            <Text style={styles.tituloFilmeVertical} numberOfLines={1}>{filme.titulo}</Text>
                            <Text style={styles.detalhesFilmeVertical}>{filme.ano} • {filme.genero}</Text>
                            <View style={styles.notaContainerVertical}><Ionicons name="star" size={14} color="#FFD700" /><Text style={styles.notaFilmeVertical}> {filme.nota}</Text></View>
                        </View>
                        <TouchableOpacity style={styles.btnFavoritoCard} onPress={() => removerFavorito(filme)}><Ionicons name="heart" size={24} color="#d30046" /></TouchableOpacity>
                    </TouchableOpacity>
                ))}
                <View style={{ height: 100 }} />
            </ScrollView>
            <View style={styles.menuInferiorContainer}>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}><Ionicons name="home-outline" size={22} color="#a0a0a8" /><Text style={styles.menuItemTextoInativo}>Home</Text></TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Filmes')}><Ionicons name="film-outline" size={22} color="#a0a0a8" /><Text style={styles.menuItemTextoInativo}>Filmes</Text></TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}><Ionicons name="heart" size={22} color="#d30046" /><Text style={styles.menuItemTextoAtivo}>Favoritos</Text></TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Perfil')}><Ionicons name="person-outline" size={22} color="#a0a0a8" /><Text style={styles.menuItemTextoInativo}>Perfil</Text></TouchableOpacity>
            </View>
        </View>
    );
}
