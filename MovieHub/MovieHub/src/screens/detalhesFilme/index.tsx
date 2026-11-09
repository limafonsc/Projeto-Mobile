import React, { useCallback, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Linking } from "react-native";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { Filme, getMovie, updateMovie, deleteMovie } from "../../services/api";

const capaPadrao = require('../../../assets/images/duna.jpg');

export default function DetalhesFilme() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const id = route.params?.id;
    const [filme, setFilme] = useState<Filme | null>(null);
    const [erro, setErro] = useState('');

    useFocusEffect(useCallback(() => {
        let ativo = true;
        if (id) getMovie(id).then((resultado) => { if (ativo) { setFilme(resultado); setErro(''); } })
            .catch((falha: Error) => { if (ativo) setErro(falha.message); });
        return () => { ativo = false; };
    }, [id]));

    const lidarComExcluir = () => Alert.alert(
        "Excluir Filme",
        "Tem certeza que deseja excluir este filme?",
        [
            { text: "Cancelar", style: "cancel" },
            { text: "Excluir", style: "destructive", onPress: async () => {
                try { await deleteMovie(filme!.id); navigation.navigate('Filmes'); }
                catch (falha) { Alert.alert('Não foi possível excluir', falha instanceof Error ? falha.message : 'Tente novamente.'); }
            } }
        ]
    );

    const alternarFavorito = async () => {
        if (!filme) return;
        try { setFilme(await updateMovie(filme.id, { favoritado: !filme.favoritado })); }
        catch (falha) { Alert.alert('Não foi possível atualizar', falha instanceof Error ? falha.message : 'Tente novamente.'); }
    };

    if (!filme) return (
        <View style={{ flex: 1, backgroundColor: '#121214', justifyContent: 'center', alignItems: 'center' }}>
            {erro ? <Text style={{ color: '#ff8da8', padding: 24, textAlign: 'center' }}>{erro}</Text> : <ActivityIndicator color="#d30046" />}
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 16 }}><Text style={{ color: '#FFF' }}>Voltar</Text></TouchableOpacity>
        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: '#121214' }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color="#FFF" /></TouchableOpacity>
                <Text style={styles.headerTitle}>Detalhes do Filme</Text>
                <TouchableOpacity onPress={lidarComExcluir}><Ionicons name="trash-outline" size={22} color="#E51C44" /></TouchableOpacity>
            </View>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.blocoTopo}>
                    <Image source={filme.imagem ? { uri: filme.imagem } : capaPadrao} style={styles.capaFilme} />
                    <View style={styles.infoPrincipais}>
                        <Text style={styles.txtTituloFilme} numberOfLines={2}>{filme.titulo}</Text>
                        <Text style={styles.txtMetadados}>{filme.ano} • {filme.duracao || 'Duração não informada'}</Text>
                        <View style={styles.rowNotaStatus}>
                            <View style={styles.notaContainer}><Ionicons name="star" size={16} color="#FFD700" /><Text style={styles.txtNota}> {filme.nota}</Text></View>
                            <View style={styles.badgeStatus}><Text style={styles.txtStatus}>{filme.status}</Text></View>
                        </View>
                        <Text style={styles.txtLabelInfo}>Gênero</Text><Text style={styles.txtValorInfo}>{filme.genero}</Text>
                        <Text style={styles.txtLabelInfo}>Diretor</Text><Text style={styles.txtValorInfo}>{filme.diretor || 'Não informado'}</Text>
                        <Text style={styles.txtLabelInfo}>Data adicionada</Text><Text style={styles.txtValorInfo}>{filme.dataAdicionado}</Text>
                    </View>
                </View>
                <Text style={styles.secaoTitulo}>Descrição</Text>
                <Text style={styles.txtDescricao}>{filme.descricao || 'Sem descrição.'}</Text>
                <Text style={styles.secaoTitulo}>Minha avaliação</Text>
                <View style={styles.blocoAvaliacao}>
                    <View style={styles.rowEstrelas}>{[1, 2, 3, 4, 5].map((estrela) => <Ionicons key={estrela} name={estrela <= Math.floor(Number(filme.nota)) ? "star" : "star-outline"} size={22} color="#FFD700" style={{ marginRight: 6 }} />)}</View>
                    <Text style={styles.txtAvaliacaoNumero}>{filme.nota}</Text>
                </View>
                <Text style={styles.secaoTitulo}>Trailer</Text>
                <TouchableOpacity style={styles.btnTrailer} disabled={!filme.trailer_url} onPress={() => filme.trailer_url && Linking.openURL(filme.trailer_url)}>
                    <View style={styles.rowTrailerEsquerda}><Ionicons name="logo-youtube" size={24} color="#FF0000" /><Text style={styles.txtTrailer}> Assistir trailer no YouTube</Text></View>
                    <Ionicons name="chevron-forward" size={20} color="#a0a0a8" />
                </TouchableOpacity>
                <View style={styles.gradeAcoes}>
                    <TouchableOpacity style={styles.cardAcao} onPress={alternarFavorito}><Ionicons name={filme.favoritado ? "heart" : "heart-outline"} size={22} color="#d30046" /><Text style={styles.txtCardAcao}>{filme.favoritado ? 'Remover favorito' : 'Favorito'}</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.cardAcao} onPress={() => navigation.navigate('EditarFilme', { id: filme.id })}><Ionicons name="create-outline" size={22} color="#FFBB00" /><Text style={styles.txtCardAcao}>Editar</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.cardAcao} onPress={lidarComExcluir}><Ionicons name="trash-outline" size={22} color="#E51C44" /><Text style={styles.txtCardAcao}>Excluir</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.cardAcao} onPress={() => navigation.navigate('CompartilharFilme')}><Ionicons name="share-social-outline" size={22} color="#007AFF" /><Text style={styles.txtCardAcao}>Compartilhar</Text></TouchableOpacity>
                </View>
                <View style={{ height: 100 }} />
            </ScrollView>
            <View style={styles.menuInferiorContainer}>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}><Ionicons name="home-outline" size={22} color="#a0a0a8" /><Text style={styles.menuItemTextoInativo}>Home</Text></TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Filmes')}><Ionicons name="film" size={22} color="#d30046" /><Text style={styles.menuItemTextoAtivo}>Filmes</Text></TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Favoritos')}><Ionicons name="heart-outline" size={22} color="#a0a0a8" /><Text style={styles.menuItemTextoInativo}>Favoritos</Text></TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Perfil')}><Ionicons name="person-outline" size={22} color="#a0a0a8" /><Text style={styles.menuItemTextoInativo}>Perfil</Text></TouchableOpacity>
            </View>
        </View>
    );
}
