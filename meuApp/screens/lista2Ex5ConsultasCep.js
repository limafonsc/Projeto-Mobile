import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useCep } from '../hooks/useCep';

export default function ConsultasCep() {
  const { historico } = useCep();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {historico.length === 0 ? (
          <Text style={styles.noData}>Nenhum CEP consultado ainda.</Text>
        ) : (
          historico.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <Text style={styles.itemText}>Logradouro: {item.logradouro}</Text>
              <Text style={styles.itemText}>Localidade: {item.localidade}</Text>
              <Text style={styles.itemText}>UF: {item.uf}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2c2c2c' },
  scroll: { padding: 20 },
  noData: { color: '#fff', textAlign: 'center', marginTop: 20 },
  itemContainer: { borderBottomWidth: 1, borderBottomColor: '#444', paddingVertical: 15 },
  itemText: { color: '#fff', fontSize: 14, marginBottom: 2 }
});