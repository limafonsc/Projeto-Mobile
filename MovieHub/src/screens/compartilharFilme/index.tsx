import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { filmesCadastrados } from "../dados";

export default function CompartilharFilme() {
    const navigation = useNavigation<any>();

    const filme = (filmesCadastrados[2] as any);

    const redesSociais = [
        { id: "1", nome: "WhatsApp", icone: "logo-whatsapp", cor: "#25D366" },
        { id: "2", nome: "Instagram", icone: "logo-instagram", cor: "#E1306C" },
        { id: "3", nome: "Facebook", icone: "logo-facebook", cor: "#1877F2" },
        { id: "4", nome: "Telegram", icone: "paper-plane", cor: "#0088cc" },
        { id: "5", nome: "E-mail", icone: "mail-outline", cor: "#d30046" },
        { id: "6", nome: "Copiar link", icone: "link-outline", cor: "#a0a0a8" },
        { id: "7", nome: "Mensagens", icone: "chatbubble-outline", cor: "#4CD964" },
        { id: "8", nome: "Mais opções", icone: "ellipsis-horizontal", cor: "#323238" },
    ];

    return (
        <View style={{ flex: 1, backgroundColor: '#121214' }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Compartilhar Filme</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.cardInfoFilme}>
                    <Image source={{ uri: filme.imagem }} style={styles.capaFilme} />
                    <View style={styles.blocoTextoFilme}>
                        <Text style={styles.txtTituloFilme} numberOfLines={1}>{filme.titulo}</Text>
                        <Text style={styles.txtMetadados}>{filme.ano} • {filme.genero}</Text>
                        
                        <View style={styles.rowNotaStatus}>
                            <View style={styles.notaContainer}>
                                <Ionicons name="star" size={14} color="#FFD700" />
                                <Text style={styles.txtNota}> {filme.nota}/5</Text>
                            </View>
                            <View style={styles.badgeStatus}>
                                <Text style={styles.txtStatus}>{filme.status}</Text>
                            </View>
                        </View>

                        <Text style={styles.txtDescricaoFilme} numberOfLines={3}>{filme.descricao}</Text>
                    </View>
                </View>

                <Text style={styles.secaoTitulo}>Compartilhar via</Text>

                <View style={styles.gradeRedes}>
                    {redesSociais.map((rede) => (
                        <TouchableOpacity key={rede.id} style={styles.btnRede}>
                            <View style={[styles.circuloIcone, { backgroundColor: '#141415', borderColor: '#1e1e22', borderWidth: 1 }]}>
                                <Ionicons name={rede.icone as any} size={26} color={rede.cor} />
                            </View>
                            <Text style={styles.txtNomeRede}>{rede.nome}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

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
