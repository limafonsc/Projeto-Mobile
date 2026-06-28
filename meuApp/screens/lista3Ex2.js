import React from 'react';
import { StyleSheet, View, Button, Linking } from 'react-native';

export default function Exercicio2() {
  const abrirDiscador = () => {
    const numero = 'tel:123456789'; 
    
    Linking.openURL(numero).catch((err) => 
      console.error("Não foi possível abrir o discador", err)
    );
  };

  return (
    <View style={styles.container}>
      <Button 
        title="Abrir Discador de Telefone" 
        onPress={abrirDiscador} 
        color="green"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});