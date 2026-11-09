import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

export default function Ordenacao() {
    const navigation = useNavigation<any>();
    const [opcaoSelecionada, setOpcaoSelecionada] = useState('3');

    const opcoesOrdenacao = [
        { id: "1", titulo: "Título A - Z", descricao: "De A a Z", icone: "text-outline" },
        { id: "2", titulo: "Título Z - A", descricao: "De Z a A", icone: "text-outline" },
        { id: "3", titulo: "Mais recentes", descricao: "Os mais recentes primeiro", icone: "calendar-outline" },
        { id: "4", titulo: "Mais antigos", descricao: "Os mais antigos primeiro", icone: "calendar-outline" },
        { id: "5", titulo: "Maior nota", descricao: "Melhores avaliações primeiro", icone: "star-outline" },
        { id: "6", titulo: "Menor nota", descricao: "Menores avaliações primeiro", icone: "star-outline" },
        { id: "7", titulo: "Ano crescente", descricao: "Do mais antigo para o mais novo", icone: "arrow-up-outline" },
        { id: "8", titulo: "Ano decrescente", descricao: "Do mais novo para o mais antigo", icone: "arrow-down-outline" },
    ];

    return (
        <View style={{ flex: 1, backgroundColor: '#121214' }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Ordenar por</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.subHeader}>
                    <Ionicons name="swap-vertical-outline" size={18} color="#a0a0a8" style={{ marginRight: 6 }} />
                    <Text style={styles.txtSubHeader}>Selecione a forma de ordenação</Text>
                </View>

                {opcoesOrdenacao.map((opcao) => (
                    <TouchableOpacity 
                        key={opcao.id} 
                        style={styles.cardOpcao}
                        onPress={() => setOpcaoSelecionada(opcao.id)}
                    >
                        <View style={styles.blocoEsquerda}>
                            <Ionicons name={opcao.icone as any} size={22} color="#d30046" style={{ marginRight: 16 }} />
                            <View>
                                <Text style={styles.txtTituloOpcao}>{opcao.titulo}</Text>
                                <Text style={styles.txtDescricaoOpcao}>{opcao.descricao}</Text>
                            </View>
                        </View>
                        
                        <Ionicons 
                            name={opcaoSelecionada === opcao.id ? "checkmark-circle" : "radio-button-off-outline"} 
                            size={22} 
                            color={opcaoSelecionada === opcao.id ? "#d30046" : "#323238"} 
                        />
                    </TouchableOpacity>
                ))}

                <TouchableOpacity style={styles.btnAplicar} onPress={() => navigation.goBack()}>
                    <Text style={styles.txtBtnAplicar}>Aplicar ordenação</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnCancelar} onPress={() => navigation.goBack()}>
                    <Text style={styles.txtBtnCancelar}>Cancelar</Text>
                </TouchableOpacity>

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
