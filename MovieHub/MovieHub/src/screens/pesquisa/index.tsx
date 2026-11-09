import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { filmesCadastrados } from "../dados";

export default function Pesquisa() {
    const navigation = useNavigation<any>();
    const [pesquisa, setPesquisa] = useState('');
    const [buscasRecentes, setBuscasRecentes] = useState([
        'Interestelar', 'Matrix', 'Christopher Nolan', 'Vingadores', 'Ficção Científica'
    ]);

    const resultadosFiltrados = filmesCadastrados.filter(filme => {
        const termo = pesquisa.toLowerCase();
        return (
            filme.titulo.toLowerCase().includes(termo) ||
            filme.genero.toLowerCase().includes(termo) ||
            filme.diretor.toLowerCase().includes(termo)
        );
    });

    const removerBuscaRecente = (buscaParaRemover: string) => {
        setBuscasRecentes(buscasRecentes.filter(item => item !== buscaParaRemover));
    };

    const limparTodasBuscas = () => {
        setBuscasRecentes([]);
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#121214' }}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Pesquisar</Text>
                </View>

                <View style={styles.buscaContainer}>
                    <Ionicons name="search" size={20} color="#a0a0a8" style={styles.buscaIcone} />
                    <TextInput 
                        style={styles.inputBusca}
                        placeholder="Pesquisar filmes, gêneros ou diretores..."
                        placeholderTextColor="#a0a0a8"
                        value={pesquisa}
                        onChangeText={setPesquisa}
                    />
                    <TouchableOpacity style={styles.btnFiltro} onPress={() => navigation.navigate('Filtros')}>
                        <Ionicons name="funnel-outline" size={20} color="#d30046" />
                    </TouchableOpacity>
                </View>

                {pesquisa === '' && buscasRecentes.length > 0 && (
                    <View style={{ marginBottom: 24 }}>
                        <Text style={styles.secaoTitulo}>Buscas recentes</Text>
                        <View style={styles.tagsContainer}>
                            {buscasRecentes.map((item, index) => (
                                <View key={index} style={styles.tagItem}>
                                    <TouchableOpacity onPress={() => setPesquisa(item)}>
                                        <Text style={styles.tagTexto}>{item}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => removerBuscaRecente(item)}>
                                        <Ionicons name="close" size={14} color="#a0a0a8" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                            <TouchableOpacity style={styles.btnLimparTudo} onPress={limparTodasBuscas}>
                                <Text style={styles.txtLimparTudo}>Limpar tudo</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {pesquisa !== '' && (
                    <View style={{ marginBottom: 16 }}>
                        <Text style={[styles.secaoTitulo, { color: '#ffffff' }]}>
                            Resultados para <Text style={{ color: '#d30046' }}>"{pesquisa}"</Text> ({resultadosFiltrados.length})
                        </Text>
                    </View>
                )}

                <View style={{ marginTop: 8 }}>
                    {resultadosFiltrados.map((filme) => (
                        <TouchableOpacity 
                            key={filme.id} 
                            style={styles.cardFilmePesquisa}
                            onPress={() => navigation.navigate('DetalhesFilme', { id: filme.id })}
                        >
                            <Image source={{ uri: filme.imagem }} style={styles.capaFilmePesquisa} />
                            
                            <View style={styles.infoFilmePesquisa}>
                                <Text style={styles.tituloFilmePesquisa} numberOfLines={1}>{filme.titulo}</Text>
                                <Text style={styles.detalhesFilmePesquisa}>{filme.ano} • {filme.genero}</Text>
                                <View style={styles.notaContainer}>
                                    <Ionicons name="star" size={14} color="#FFD700" />
                                    <Text style={styles.notaFilme}> {filme.nota}</Text>
                                </View>
                            </View>

                            <Ionicons name="chevron-forward" size={20} color="#a0a0a8" />
                        </TouchableOpacity>
                    ))}
                </View>

                {resultadosFiltrados.length === 0 && (
                    <View style={styles.containerSemResultados}>
                        <Ionicons name="alert-circle-outline" size={48} color="#a0a0a8" />
                        <Text style={styles.txtSemResultados}>Nenhum filme encontrado para a sua pesquisa.</Text>
                    </View>
                )}

                <View style={styles.blocoDica}>
                    <Ionicons name="search" size={22} color="#d30046" style={styles.dicaIcone} />
                    <View style={styles.dicaConteudo}>
                        <Text style={styles.dicaTitulo}>Dica</Text>
                        <Text style={styles.dicaTexto}>Utilize termos como nome de diretores, anos de lançamento ou gêneros específicos para refinar sua pesquisa rapidamente.</Text>
                    </View>
                </View>

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
