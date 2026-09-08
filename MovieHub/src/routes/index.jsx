import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/splash';
import Login from '../screens/login';
import Cadastro from '../screens/cadastro';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
    </Stack.Navigator>
  );
}