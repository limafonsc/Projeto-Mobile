import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela Inicial (Home)</Text>
      <Button 
        title="Ir para Detalhes" 
        onPress={() => navigation.navigate('Detalhes')} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282c34',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 20,
  },
});