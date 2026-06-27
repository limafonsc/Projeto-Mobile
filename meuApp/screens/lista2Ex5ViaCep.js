import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useCep } from '../hooks/useCep';

export default function ViaCep() {
  const [inputCep, setInputCep] = useState('');
  const { cepData, buscarCep, loading, erro } = useCep();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>CEP</Text>
      <TextInput
        style={styles.input}
        value={inputCep}
        onChangeText={setInputCep}
        keyboardType="numeric"
        maxLength={8}
        placeholder="12328070"
        placeholderTextColor="#666"
      />

      <TouchableOpacity style={styles.button} onPress={() => buscarCep(inputCep)}>
        {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.buttonText}>Obter</Text>}
      </TouchableOpacity>

      {cepData && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Logradouro: {cepData.logradouro}</Text>
          <Text style={styles.resultText}>Localidade: {cepData.localidade}</Text>
          <Text style={styles.resultText}>UF: {cepData.uf}</Text>
        </View>
      )}

      {erro && <Text style={styles.errorText}>CEP inválido</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
container: { 
    flex: 1,
    backgroundColor: '#2c2c2c',
    padding: 20,
    justifyContent: 'center'
},
label: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5
},
input: { 
    backgroundColor: '#fff', 
    padding: 12, 
    borderRadius: 4, 
    color: '#000', 
    fontSize: 16, 
    marginBottom: 15 
},
button: { 
    backgroundColor: '#f6ae05', 
    padding: 15, 
    borderRadius: 4, 
    alignItems: 'center', 
    marginBottom: 20 },
buttonText: { 
    color: '#000', 
    fontWeight: 'bold', 
    fontSize: 16 
},
resultContainer: { 
    marginTop: 10
},
resultText: { 
    color: '#fff', 
    fontSize: 15, 
    marginBottom: 5 
},
errorText: { 
    color: '#f6ae05', 
    fontSize: 15, 
    marginTop: 10, 
    fontWeight: 'bold' 
}
});