import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/splash';
import Login from '../screens/login';
import Cadastro from '../screens/cadastro';
import home from '../screens/home';
import Filmes from '../screens/filmes';
import cadastroFilme from '../screens/cadastroFilmes';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="home" component={home} />
      <Stack.Screen name="Filmes" component={Filmes} />
      <Stack.Screen name="cadastroFilme" component={cadastroFilme} />
    </Stack.Navigator>
  );
}