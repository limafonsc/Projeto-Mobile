import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

export default function Configuracoes() {
    const navigation = useNavigation<any>();

    const [lembretes, setLembretes] = useState(true);
    const [novidades, setNovidades] = useState(true);
    const [sincronizar, setSincronizar] = useState(true);
    const [atualizarAoAbrir, setAtualizarAoAbrir] = useState(true);

    return (
        <View style={{ flex: 1, backgroundColor: '#121214' }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Configurações</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <Text style={styles.tituloCategoria}>Aparência</Text>
                
                <View style={styles.itemConfiguracao}>
                    <View style={styles.rowItemEsquerda}>
                        <Ionicons name="moon-outline" size={22} color="#a0a0a8" style={{ marginRight: 16 }} />
                        <Text style={styles.txtTituloConfig}>Tema</Text>
                    </View>
                    <View style={styles.rowItemDireita}>
                        <Text style={styles.txtValorConfig}>Escuro</Text>
                        <Ionicons name="chevron-forward" size={18} color="#323238" />
                    </View>
                </View>

                <View style={styles.itemConfiguracao}>
                    <View style={styles.rowItemEsquerda}>
                        <Ionicons name="color-palette-outline" size={22} color="#a0a0a8" style={{ marginRight: 16 }} />
                        <Text style={styles.txtTituloConfig}>Cor de destaque</Text>
                    </View>
                    <View style={styles.circuloCorDestaque} />
                </View>

                <Text style={styles.tituloCategoria}>Notificações</Text>

                <View style={styles.itemConfiguracao}>
                    <View style={styles.rowItemEsquerda}>
                        <Ionicons name="notifications-outline" size={22} color="#a0a0a8" style={{ marginRight: 16 }} />
                        <Text style={styles.txtTituloConfig}>Lembretes de filmes</Text>
                    </View>
                    <Switch 
                        trackColor={{ false: '#323238', true: '#d30046' }}
                        thumbColor={lembretes ? '#ffffff' : '#a0a0a8'}
                        value={lembretes}
                        onValueChange={setLembretes}
                    />
                </View>

                <View style={styles.itemConfiguracao}>
                    <View style={styles.rowItemEsquerda}>
                        <Ionicons name="star-outline" size={22} color="#a0a0a8" style={{ marginRight: 16 }} />
                        <Text style={styles.txtTituloConfig}>Novidades e lançamentos</Text>
                    </View>
                    <Switch 
                        trackColor={{ false: '#323238', true: '#d30046' }}
                        thumbColor={novidades ? '#ffffff' : '#a0a0a8'}
                        value={novidades}
                        onValueChange={setNovidades}
                    />
                </View>

                <Text style={styles.tituloCategoria}>Sincronização</Text>

                <View style={styles.itemConfiguracao}>
                    <View style={styles.rowItemEsquerda}>
                        <Ionicons name="cloud-upload-outline" size={22} color="#a0a0a8" style={{ marginRight: 16 }} />
                        <Text style={styles.txtTituloConfig}>Sincronizar com a nuvem</Text>
                    </View>
                    <Switch 
                        trackColor={{ false: '#323238', true: '#d30046' }}
                        thumbColor={sincronizar ? '#ffffff' : '#a0a0a8'}
                        value={sincronizar}
                        onValueChange={setSincronizar}
                    />
                </View>

                <View style={styles.itemConfiguracao}>
                    <View style={styles.rowItemEsquerda}>
                        <Ionicons name="refresh-outline" size={22} color="#a0a0a8" style={{ marginRight: 16 }} />
                        <Text style={styles.txtTituloConfig}>Atualizar ao abrir o app</Text>
                    </View>
                    <Switch 
                        trackColor={{ false: '#323238', true: '#d30046' }}
                        thumbColor={atualizarAoAbrir ? '#ffffff' : '#a0a0a8'}
                        value={atualizarAoAbrir}
                        onValueChange={setAtualizarAoAbrir}
                    />
                </View>

                <Text style={styles.tituloCategoria}>Outros</Text>

                <View style={styles.itemConfiguracao}>
                    <View style={styles.rowItemEsquerda}>
                        <Ionicons name="globe-outline" size={22} color="#a0a0a8" style={{ marginRight: 16 }} />
                        <Text style={styles.txtTituloConfig}>Idioma</Text>
                    </View>
                    <View style={styles.rowItemDireita}>
                        <Text style={styles.txtValorConfig}>Português</Text>
                        <Ionicons name="chevron-forward" size={18} color="#323238" />
                    </View>
                </View>

                <View style={styles.itemConfiguracao}>
                    <View style={styles.rowItemEsquerda}>
                        <Ionicons name="trash-outline" size={22} color="#a0a0a8" style={{ marginRight: 16 }} />
                        <Text style={styles.txtTituloConfig}>Limpar cache</Text>
                    </View>
                    <View style={styles.rowItemDireita}>
                        <Text style={styles.txtValorConfig}>12,4 MB</Text>
                        <Ionicons name="chevron-forward" size={18} color="#323238" />
                    </View>
                </View>

                <View style={[styles.itemConfiguracao, { marginBottom: 40 }]}>
                    <View style={styles.rowItemEsquerda}>
                        <Ionicons name="information-circle-outline" size={22} color="#a0a0a8" style={{ marginRight: 16 }} />
                        <Text style={styles.txtTituloConfig}>Sobre o MovieHub</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color="#323238" />
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
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Perfil')}>
                    <Ionicons name="person" size={22} color="#d30046" />
                    <Text style={styles.menuItemTextoAtivo}>Perfil</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
