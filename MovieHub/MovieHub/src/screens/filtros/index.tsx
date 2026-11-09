import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

export default function Filtros() {
    const navigation = useNavigation<any>();

    const [statusAtivo, setStatusAtivo] = useState('Todos');
    const [anoInicio, setAnoInicio] = useState('');
    const [anoFim, setAnoFim] = useState('');
    const [notaMinima, setNotaMinima] = useState(4);
    const [apenasFavoritos, setApenasFavoritos] = useState(false);

    const statuses = ['Todos', 'Quero assistir', 'Assistindo', 'Assistido'];

    return (
        <View style={{ flex: 1, backgroundColor: '#121214' }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Filtros</Text>
                <TouchableOpacity onPress={() => {
                    setStatusAtivo('Todos');
                    setAnoInicio('');
                    setAnoFim('');
                    setNotaMinima(0);
                    setApenasFavoritos(false);
                }}>
                    <Text style={styles.txtLimpar}>Limpar</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                
                <Text style={styles.labelSecao}>Gênero</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Generos')}>
                <View style={styles.dropdownContainer}>
                    <Text style={{ color: '#a0a0a8', fontSize: 16 }}>Todos os gêneros</Text>
                    <Ionicons name="chevron-down" size={18} color="#a0a0a8" />
                </View>
                </TouchableOpacity>
                <Text style={styles.labelSecao}>Status</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginBottom: 24 }}>
                    {statuses.map((status) => (
                        <TouchableOpacity 
                            key={status} 
                            style={[styles.btnStatus, statusAtivo === status && styles.btnStatusAtivo]}
                            onPress={() => setStatusAtivo(status)}
                        >
                            <Text style={[styles.txtStatus, statusAtivo === status && styles.txtStatusAtivo]}>
                                {status}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <Text style={styles.labelSecao}>Ano</Text>
                <View style={styles.rowCampos}>
                    <View style={{ flex: 1, marginRight: 8 }}>
                        <View style={styles.inputRowContainer}>
                            <TextInput 
                                style={styles.input} 
                                placeholder="Ex: 1990" 
                                placeholderTextColor="#a0a0a8"
                                keyboardType="numeric"
                                value={anoInicio}
                                onChangeText={setAnoInicio}
                            />
                            <Ionicons name="calendar-outline" size={18} color="#a0a0a8" />
                        </View>
                    </View>
                    <View style={{ flex: 1, marginLeft: 8 }}>
                        <View style={styles.inputRowContainer}>
                            <TextInput 
                                style={styles.input} 
                                placeholder="Ex: 2026" 
                                placeholderTextColor="#a0a0a8"
                                keyboardType="numeric"
                                value={anoFim}
                                onChangeText={setAnoFim}
                            />
                            <Ionicons name="calendar-outline" size={18} color="#a0a0a8" />
                        </View>
                    </View>
                </View>

                <Text style={styles.labelSecao}>Nota mínima</Text>
                <View style={styles.rowEstrelasContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        {[1, 2, 3, 4, 5].map((estrela) => (
                            <TouchableOpacity key={estrela} onPress={() => setNotaMinima(estrela)}>
                                <Ionicons 
                                    name={estrela <= notaMinima ? "star" : "star-outline"} 
                                    size={24} 
                                    color="#FFD700" 
                                    style={{ marginRight: 6 }}
                                Lark/>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <Text style={{ color: '#d30046', fontWeight: 'bold', fontSize: 14 }}>
                        {notaMinima > 0 ? `${notaMinima},0 ou mais` : 'Qualquer nota'}
                    </Text>
                </View>

                <View style={styles.rowSwitch}>
                    <Text style={[styles.labelSecao, { marginBottom: 0 }]}>Apenas favoritos</Text>
                    <Switch 
                        trackColor={{ false: '#323238', true: '#d30046' }}
                        thumbColor={apenasFavoritos ? '#ffffff' : '#a0a0a8'}
                        value={apenasFavoritos}
                        onValueChange={setApenasFavoritos}
                    />
                </View>

                <Text style={styles.labelSecao}>Ordenar por</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Ordenacao')}>
                <View style={[styles.dropdownContainer, { marginBottom: 32 }]}>
                    <Text style={{ color: '#ffffff', fontSize: 16 }}>Mais recentes</Text>
                    <Ionicons name="chevron-down" size={18} color="#a0a0a8" />
                </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnAplicar} onPress={() => navigation.goBack()}>
                    <Ionicons name="funnel-outline" size={18} color="#FFF" style={{ marginRight: 8 }} />
                    <Text style={styles.txtBtnAplicar}>Aplicar filtros</Text>
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
