import 'react-native-gesture-handler'; 
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

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
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Exercicio 1">
          
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
          
        </Drawer.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}