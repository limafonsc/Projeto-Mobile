import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Cinco from '../screens/Cinco';
import Dez from '../screens/Dez';
import Dois from '../screens/Dois';
import Nove from '../screens/Nove';
import Oito from '../screens/Oito';
import lista2Ex1 from '../screens/lista2Ex1';
import Quatro from '../screens/Quatro';
import Seis from '../screens/Seis';
import Sete from '../screens/Sete';
import Tres from '../screens/Tres';
import Um from '../screens/Um';

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="lista2Ex1" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="lista2Ex1" component={lista2Ex1} />
          <Stack.Screen name="Um" component={Um} />
          <Stack.Screen name="Dois" component={Dois} />
          <Stack.Screen name="Tres" component={Tres} />
          <Stack.Screen name="Quatro" component={Quatro} />
          <Stack.Screen name="Cinco" component={Cinco} />
          <Stack.Screen name="Seis" component={Seis} />
          <Stack.Screen name="Sete" component={Sete} />
          <Stack.Screen name="Oito" component={Oito} />
          <Stack.Screen name="Nove" component={Nove} />
          <Stack.Screen name="Dez" component={Dez} />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}