import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { filmesCadastrados } from "../dados";

export default function Perfil() {
    const navigation = useNavigation<any>();

    const totalFilmes = filmesCadastrados.length;
    const favoritos = filmesCadastrados.filter(f => f.favoritado).length;
    const assistidos = filmesCadastrados.filter(f => f.status === 'Assistido').length;
    const queroAssistir = filmesCadastrados.filter(f => f.status === 'Quero assistir').length;

    const opcoesMenu = [
        { id: "1", titulo: "Editar perfil", icone: "person-outline", rota: "" },
        { id: "2", titulo: "Alterar foto", icone: "camera-outline", rota: "" },
        { id: "3", titulo: "Alterar senha", icone: "lock-closed-outline", rota: "" },
        { id: "4", titulo: "Preferências", icone: "options-outline", rota: "Configuracoes" },
        { id: "5", titulo: "Sincronizar dados", icone: "sync-outline", rota: "" },
    ];

    return (
        <View style={{ flex: 1, backgroundColor: '#121214' }}>
            <View style={styles.header}>
                <View style={{ width: 24 }} />
                <Text style={styles.headerTitle}>Meu Perfil</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Configuracoes')}>
                    <Ionicons name="settings-outline" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.blocoUsuario}>
                    <View style={styles.containerAvatar}>
                        <Image source={require('../../../assets/images/profileicon.png')} style={styles.avatar} />
                        <TouchableOpacity style={styles.btnCameraAvatar}>
                            <Ionicons name="camera" size={16} color="#FFF" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.txtNome}>André</Text>
                    <Text style={styles.txtEmail}>andre@email.com</Text>
                    <View style={styles.rowMembro}>
                        <Ionicons name="calendar-outline" size={14} color="#a0a0a8" style={{ marginRight: 6 }} />
                        <Text style={styles.txtMembro}>Membro desde 01/01/2026</Text>
                    </View>
                </View>

                <View style={styles.gridEstatisticas}>
                    <View style={styles.cardEstatistica}>
                        <Ionicons name="film-outline" size={20} color="#ffffff" />
                        <Text style={styles.txtLabelEstatistica}>Total de filmes</Text>
                        <Text style={styles.txtValorEstatistica}>{totalFilmes}</Text>
                    </View>
                    <View style={styles.cardEstatistica}>
                        <Ionicons name="heart-outline" size={20} color="#ffffff" />
                        <Text style={styles.txtLabelEstatistica}>Favoritos</Text>
                        <Text style={styles.txtValorEstatistica}>{favoritos}</Text>
                    </View>
                    <View style={styles.cardEstatistica}>
                        <Ionicons name="checkmark-circle-outline" size={20} color="#ffffff" />
                        <Text style={styles.txtLabelEstatistica}>Assistidos</Text>
                        <Text style={styles.txtValorEstatistica}>{assistidos}</Text>
                    </View>
                    <View style={styles.cardEstatistica}>
                        <Ionicons name="bookmark-outline" size={20} color="#ffffff" />
                        <Text style={styles.txtLabelEstatistica}>Quero assistir</Text>
                        <Text style={styles.txtValorEstatistica}>{queroAssistir}</Text>
                    </View>
                </View>

                <View style={styles.listaOpcoes}>
                    {opcoesMenu.map((opcao) => (
                        <TouchableOpacity 
                            key={opcao.id} 
                            style={styles.btnOpcao}
                            onPress={() => opcao.rota && navigation.navigate(opcao.rota)}
                        >
                            <View style={styles.rowOpcaoEsquerda}>
                                <Ionicons name={opcao.icone as any} size={22} color="#a0a0a8" style={{ marginRight: 16 }} />
                                <Text style={styles.txtTituloOpcao}>{opcao.titulo}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={18} color="#323238" />
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.btnSair}>
                    <Ionicons name="log-out-outline" size={20} color="#E51C44" style={{ marginRight: 10 }} />
                    <Text style={styles.txtBtnSair}>Sair da conta</Text>
                </TouchableOpacity>

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
                    <Ionicons name="person" size={22} color="#d30046" />
                    <Text style={styles.menuItemTextoAtivo}>Perfil</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
