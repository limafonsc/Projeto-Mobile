import React, { useCallback, useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { Filme, getMovies, updateMovie } from "../../services/api";

const capaPadrao = require('../../../assets/images/duna.jpg');

export default function Filmes() {
    const navigation = useNavigation<any>();
    const [pesquisa, setPesquisa] = useState('');
    const [filtroAtivo, setFiltroAtivo] = useState('Todos');
    const [filmes, setFilmes] = useState<Filme[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');
    const filtros = ['Todos', 'Assistido', 'Quero assistir', 'Assistindo'];

    const carregarFilmes = useCallback(() => {
        let ativo = true;
        setCarregando(true);
        getMovies().then((resultado) => {
            if (ativo) { setFilmes(resultado); setErro(''); }
        }).catch((falha: Error) => {
            if (ativo) setErro(falha.message);
        }).finally(() => { if (ativo) setCarregando(false); });
        return () => { ativo = false; };
    }, []);

    useFocusEffect(carregarFilmes);

    const listaFiltrada = filmes.filter((filme) => {
        const correspondeBusca = filme.titulo.toLowerCase().includes(pesquisa.toLowerCase());
        return correspondeBusca && (filtroAtivo === 'Todos' || filme.status.toLowerCase() === filtroAtivo.toLowerCase());
    });

    const alternarFavorito = async (filme: Filme) => {
        try {
            const atualizado = await updateMovie(filme.id, { favoritado: !filme.favoritado });
            setFilmes((atuais) => atuais.map((item) => item.id === atualizado.id ? atualizado : item));
        } catch (falha) {
            setErro(falha instanceof Error ? falha.message : 'Não foi possível atualizar o favorito.');
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#121214' }}>
            <View style={styles.header}>
                <View style={{ width: 28 }} />
                <Text style={styles.headerTitle}>Filmes</Text>
            </View>

            <View style={styles.buscaContainer}>
                <Ionicons name="search" size={20} color="#a0a0a8" style={styles.buscaIcone} />
                <TextInput style={{ flex: 1, color: '#FFF', fontSize: 16 }} placeholder="Pesquisar filmes" placeholderTextColor="#a0a0a8" value={pesquisa} onChangeText={setPesquisa} />
                <TouchableOpacity style={styles.btnMais} onPress={() => navigation.navigate('cadastroFilme')}>
                    <Ionicons name="add" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ maxHeight: 52, flexGrow: 0, paddingHorizontal: 16 }}>
                {filtros.map((filtro) => (
                    <TouchableOpacity key={filtro} onPress={() => setFiltroAtivo(filtro)} style={{ paddingHorizontal: 14, paddingVertical: 10, marginRight: 8, borderRadius: 18, backgroundColor: filtroAtivo === filtro ? '#d30046' : '#242428' }}>
                        <Text style={{ color: '#FFF', fontSize: 13 }}>{filtro}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <ScrollView style={styles.containerLista} showsVerticalScrollIndicator={false}>
                {carregando && <ActivityIndicator color="#d30046" style={{ marginTop: 30 }} />}
                {!carregando && Boolean(erro) && <Text style={{ color: '#ff8da8', padding: 20 }}>{erro}</Text>}
                {!carregando && !erro && listaFiltrada.length === 0 && <Text style={{ color: '#a0a0a8', padding: 20 }}>Nenhum filme cadastrado ainda.</Text>}
                {listaFiltrada.map((filme) => (
                    <TouchableOpacity key={filme.id} style={styles.cardFilmeVertical} onPress={() => navigation.navigate('DetalhesFilme', { id: filme.id })}>
                        <Image source={filme.imagem ? { uri: filme.imagem } : capaPadrao} style={styles.capaFilmeVertical} />
                        <View style={styles.infoFilmeVertical}>
                            <Text style={styles.tituloFilmeVertical} numberOfLines={1}>{filme.titulo}</Text>
                            <Text style={styles.detalhesFilmeVertical}>{filme.ano} • {filme.genero}</Text>
                            <View style={styles.notaContainerVertical}>
                                <Ionicons name="star" size={14} color="#FFD700" />
                                <Text style={styles.notaFilmeVertical}> {filme.nota}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.btnFavoritoCard} onPress={() => alternarFavorito(filme)}>
                            <Ionicons name={filme.favoritado ? "heart" : "heart-outline"} size={24} color={filme.favoritado ? "#d30046" : "#a0a0a8"} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))}
                <View style={{ height: 100 }} />
            </ScrollView>

            <View style={styles.menuInferiorContainer}>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}><Ionicons name="home-outline" size={22} color="#a0a0a8" /><Text style={styles.menuItemTextoInativo}>Home</Text></TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}><Ionicons name="film" size={22} color="#d30046" /><Text style={styles.menuItemTextoAtivo}>Filmes</Text></TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Favoritos')}><Ionicons name="heart-outline" size={22} color="#a0a0a8" /><Text style={styles.menuItemTextoInativo}>Favoritos</Text></TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Perfil')}><Ionicons name="person-outline" size={22} color="#a0a0a8" /><Text style={styles.menuItemTextoInativo}>Perfil</Text></TouchableOpacity>
            </View>
        </View>
    );
}

