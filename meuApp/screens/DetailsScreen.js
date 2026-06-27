import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function DetailsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Detalhes</Text>
      <Button 
        title="Voltar para Home" 
        onPress={() => navigation.goBack()} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1e22',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 20,
  },
});