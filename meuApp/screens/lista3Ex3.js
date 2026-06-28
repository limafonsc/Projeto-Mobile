import React from 'react';
import { StyleSheet, View, Button, Linking } from 'react-native';

export default function Exercicio3() {
  return (
    <View style={styles.container}>
      <Button 
        title="Abrir Instagram ETEC" 
        onPress={() => Linking.openURL('https://www.instagram.com/etec_sjc195')} 
        color="#00a216" 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
});