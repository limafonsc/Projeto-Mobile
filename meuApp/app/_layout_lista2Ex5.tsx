import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import { CepProvider } from '../contexts/cepContext';
import ViaCep from '../screens/lista2Ex5ViaCep';
import ConsultasCep from '../screens/lista2Ex5ConsultasCep';

import Cinco from '../screens/Cinco';
import Dez from '../screens/Dez';
import Dois from '../screens/Dois';
import Nove from '../screens/Nove';
import Oito from '../screens/Oito';
import Quatro from '../screens/Quatro';
import Seis from '../screens/Seis';
import Sete from '../screens/Sete';
import Tres from '../screens/Tres';
import Um from '../screens/Um';

const Drawer = createDrawerNavigator();

export default function RootLayout() {
  return (
    <NavigationIndependentTree>
      <CepProvider>
        <NavigationContainer>
          <Drawer.Navigator 
            initialRouteName="Exercicio 1"
            screenOptions={({ route }) => ({
              drawerActiveTintColor: '#007AFF',
              drawerStyle: { backgroundColor: '#ffffff', width: 240 },
              drawerIcon: ({ color, size }) => {
                let iconName = 'cube';

                if (route.name === 'Exercicio 1') iconName = 'apps';
                else if (route.name === 'Exercicio 2') iconName = 'list';
                else if (route.name === 'Exercicio 3') iconName = 'grid';
                else if (route.name === 'Exercicio 4') iconName = 'trending-up';
                else if (route.name === 'Exercicio 5') iconName = 'document-text';
                else if (route.name === 'Exercicio 6') iconName = 'calculator';
                else if (route.name === 'Exercicio 7') iconName = 'options';
                else if (route.name === 'Exercicio 8') iconName = 'images';
                else if (route.name === 'Exercicio 9') iconName = 'key';
                else if (route.name === 'Exercicio 10') iconName = 'settings';
                else if (route.name === 'ViaCep') iconName = 'search';
                else if (route.name === 'ConsultasCep') iconName = 'time';

                return <Ionicons name={iconName as any} size={size} color={color} />;
              },
            })}
          >
            <Drawer.Screen name="Exercicio 1" component={Um} options={{ title: 'Exercício 1' }} />
            <Drawer.Screen name="Exercicio 2" component={Dois} options={{ title: 'Exercício 2' }} />
            <Drawer.Screen name="Exercicio 3" component={Tres} options={{ title: 'Exercício 3' }} />
            <Drawer.Screen name="Exercicio 4" component={Quatro} options={{ title: 'Exercício 4' }} />
            <Drawer.Screen name="Exercicio 5" component={Cinco} options={{ title: 'Exercício 5' }} />
            <Drawer.Screen name="Exercicio 6" component={Seis} options={{ title: 'Exercício 6' }} />
            <Drawer.Screen name="Exercicio 7" component={Sete} options={{ title: 'Exercício 7' }} />
            <Drawer.Screen name="Exercicio 8" component={Oito} options={{ title: 'Exercício 8' }} />
            <Drawer.Screen name="Exercicio 9" component={Nove} options={{ title: 'Exercício 9' }} />
            <Drawer.Screen name="Exercicio 10" component={Dez} options={{ title: 'Exercício 10' }} />
            
            <Drawer.Screen name="ViaCep" component={ViaCep} options={{ title: 'ViaCEP' }} />
            <Drawer.Screen name="ConsultasCep" component={ConsultasCep} options={{ title: 'Consultas de CEP' }} />
            
          </Drawer.Navigator>
        </NavigationContainer>
      </CepProvider>
    </NavigationIndependentTree>
  );
}