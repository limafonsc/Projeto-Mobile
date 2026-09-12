import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/splash';
import Login from '../screens/login';
import Cadastro from '../screens/cadastro';
import home from '../screens/home';
import Filmes from '../screens/filmes';
import cadastroFilme from '../screens/cadastroFilmes';
import DetalhesFilme from '../screens/detalhesFilme';
import EditarFilme from '../screens/editarFilme';
import Favoritos from '../screens/favoritos';

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
      <Stack.Screen name="DetalhesFilme" component={DetalhesFilme} />
      <Stack.Screen name="EditarFilme" component={EditarFilme} />
      <Stack.Screen name="Favoritos" component={Favoritos} />
    </Stack.Navigator>
  );
}