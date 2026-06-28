import React from 'react';
import { StyleSheet, View, Button, Linking } from 'react-native';

export default function lista3Ex1() {
  const abrirYoutube = () => {
    const url = 'https://www.youtube.com/watch?v=Igl8n_MwtQ4';
    Linking.openURL(url).catch((err) => 
      console.error('Erro ao tentar abrir a URL:', err)
    );
  };

  return (
    <View style={styles.container}>
      <Button 
        title="Abrir Vídeo no YouTube" 
        onPress={abrirYoutube} 
        color="#FF0000"
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