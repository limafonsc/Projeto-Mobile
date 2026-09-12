import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

export default function DetalhesFilme() {
    const navigation = useNavigation<any>();

    // DADOS FICTÍCIOS FIXOS: Exatamente como na imagem que você enviou
    const filme = {
        titulo: 'Interestelar',
        ano: '2014',
        duracao: '2h 49min',
        nota: '4,8',
        status: 'Assistido',
        genero: 'Ficção Científica, Aventura',
        diretor: 'Christopher Nolan',
        dataAdicionado: '12/05/2024',
        descricao: 'Uma equipe de exploradores viaja através de um buraco de minhoca recém-descoberto para superar os limites das viagens espaciais humanas e conquistar as vastas distâncias interestelares.',
        imagem: 'https://placeholder.com' // Você pode trocar pelo link real da foto depois
    };

    const lidarComExcluir = () => {
        Alert.alert(
            "Excluir Filme",
            "Tem certeza que deseja excluir este filme permanentemente?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Excluir", style: "destructive", onPress: () => navigation.navigate('Filmes') }
            ]
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#121214' }}>
            
            {/* Cabeçalho */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Detalhes do Filme</Text>
                <TouchableOpacity>
                    <Ionicons name="ellipsis-horizontal" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                
                {/* Bloco Superior: Imagem e Dados Principais */}
                <View style={styles.blocoTopo}>
                    <Image source={{ uri: filme.imagem }} style={styles.capaFilme} />
                    
                    <View style={styles.infoPrincipais}>
                        <Text style={styles.txtTituloFilme} numberOfLines={2}>{filme.titulo}</Text>
                        <Text style={styles.txtMetadados}>{filme.ano} • {filme.duracao}</Text>
                        
                        <View style={styles.rowNotaStatus}>
                            <View style={styles.notaContainer}>
                                <Ionicons name="star" size={16} color="#FFD700" />
                                <Text style={styles.txtNota}> {filme.nota}</Text>
                            </View>
                            <View style={styles.badgeStatus}>
                                <Text style={styles.txtStatus}>{filme.status}</Text>
                            </View>
                        </View>

                        <Text style={styles.txtLabelInfo}>Gênero</Text>
                        <Text style={styles.txtValorInfo}>{filme.genero}</Text>

                        <Text style={styles.txtLabelInfo}>Diretor</Text>
                        <Text style={styles.txtValorInfo}>{filme.diretor}</Text>

                        <Text style={styles.txtLabelInfo}>Data adicionada</Text>
                        <Text style={styles.txtValorInfo}>{filme.dataAdicionado}</Text>
                    </View>
                </View>

                {/* Bloco Descrição */}
                <Text style={styles.secaoTitulo}>Descrição</Text>
                <Text style={styles.txtDescricao}>{filme.descricao}</Text>

                {/* Bloco Minha Avaliação */}
                <Text style={styles.secaoTitulo}>Minha avaliação</Text>
                <View style={styles.blocoAvaliacao}>
                    <View style={styles.rowEstrelas}>
                        {[1, 2, 3, 4].map((estrela) => (
                            <Ionicons key={estrela} name="star" size={22} color="#FFD700" style={{ marginRight: 6 }} />
                        ))}
                        <Ionicons name="star-outline" size={22} color="#FFD700" style={{ marginRight: 6 }} />
                    </View>
                    <Text style={styles.txtAvaliacaoNumero}>4,0</Text>
                </View>

                {/* Bloco Trailer */}
                <Text style={styles.secaoTitulo}>Trailer</Text>
                <TouchableOpacity style={styles.btnTrailer}>
                    <View style={styles.rowTrailerEsquerda}>
                        <Ionicons name="logo-youtube" size={24} color="#FF0000" />
                        <Text style={styles.txtTrailer}> Assistir trailer no YouTube</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#a0a0a8" />
                </TouchableOpacity>

                {/* Grade de Botões de Ação */}
                <View style={styles.gradeAcoes}>
                    <TouchableOpacity style={styles.cardAcao}>
                        <Ionicons name="heart" size={22} color="#d30046" />
                        <Text style={styles.txtCardAcao}>Favorito</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.cardAcao}>
                        <Ionicons name="create-outline" size={22} color="#FFBB00" />
                        <Text style={styles.txtCardAcao} onPress={() => navigation.navigate('EditarFilme')}>Editar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.cardAcao} onPress={lidarComExcluir}>
                        <Ionicons name="trash-outline" size={22} color="#E51C44" />
                        <Text style={styles.txtCardAcao}>Excluir</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.cardAcao}>
                        <Ionicons name="share-social-outline" size={22} color="#007AFF" />
                        <Text style={styles.txtCardAcao}>Compartilhar</Text>
                    </TouchableOpacity>
                </View>

                {/* Espaço para não sumir atrás da barra inferior */}
                <View style={{ height: 100 }} />

            </ScrollView>

            {/* Barra de Tarefas Inferior Fixa */}
            <View style={styles.menuInferiorContainer}>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('home')}>
                    <Ionicons name="home-outline" size={22} color="#a0a0a8" />
                    <Text style={styles.menuItemTextoInativo}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Filmes')}>
                    <Ionicons name="film" size={22} color="#d30046" />
                    <Text style={styles.menuItemTextoAtivo}>Filmes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Filmes')}>
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