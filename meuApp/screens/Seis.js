import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Seis() {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [resultado, setResultado] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} onChangeText={setNome} />

      <Text style={styles.label}>Idade</Text>
      <TextInput style={styles.input} onChangeText={setIdade} keyboardType="numeric" />

      <TouchableOpacity style={styles.botao} onPress={() => setResultado(`${nome} - ${idade}`)}>
        <Text style={styles.textoBotao}>SALVAR</Text>
      </TouchableOpacity>

      <Text style={styles.label}>{resultado}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    padding: 20,
    paddingTop: 60,
  },
  label: {
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    height: 40,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  botao: {
    backgroundColor: '#2196F3',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 2,
  },
  textoBotao: {
    color: '#fff',
  },
});