import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/index.jsx'; // Importa as rotas que você criou

export default function App() {
  return (
    <NavigationContainer>
      {/* Deixa a barra de status do celular visível e bonita */}
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Carrega o seu navegador de telas */}
      <Routes />
    </NavigationContainer>
  );
}