import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Cinco from '../screens/Cinco';
import Dez from '../screens/Dez';
import Dois from '../screens/Dois';
import Nove from '../screens/Nove';
import Oito from '../screens/Oito';
import Onze from '../screens/Onze';
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
        <Stack.Navigator initialRouteName="Onze" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Onze" component={Onze} />
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