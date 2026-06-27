import { Picker } from '@react-native-picker/picker';
import { useState } from "react";
import { StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Dez() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [resultado, setResultado] = useState('');
    const [cargo, setCargo]= useState('manager');
    const [logado, setLogado]=useState(false);

    return (
    <View style = {styles.container}>
    <View style = {styles.moldura}>
    <Text style={styles.titulo}>CADASTRO</Text>
        <Text style={styles.label}>E-mail</Text>
        <TextInput style={styles.input} onChangeText={setEmail} autoCapitalize="none" autoComplete="email" autoCorrect = {false} keyboardType='email-address'></TextInput>

        <Text style={styles.label}>Senha</Text>
        <TextInput style={styles.input} onChangeText={setSenha} secureTextEntry={true} maxLength={8}></TextInput>
        <Text style={styles.label}>Confirmação da senha</Text>
        <TextInput style={styles.input} onChangeText={setConfirmarSenha} secureTextEntry={true} maxLength={8}></TextInput>
        
        <View style={styles.pickerContainer}>
            <Picker
                selectedValue={cargo}
                onValueChange={(itemValue) => setCargo(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Administrador" value="admin" />
                <Picker.Item label="Gestor" value="manager" />
                <Picker.Item label="Usuário" value="user" />
            </Picker>
        </View>

        <View style={styles.switchContainer}>
            <Text style={styles.labelSwitch}>Manter-se conectado</Text>
            <Switch
                trackColor={{ false: "#e77878", true: "#94df83" }}
                thumbColor={logado ? "#47eb22" : "#ed1111"}
                onValueChange={setLogado}
                value={logado}
            />
        </View>

        <View style={styles.botoes} >
        <TouchableOpacity style={styles.botao} onPress={() => setResultado(`${email} - ${senha} - ${confirmarSenha} - ${cargo} - ${logado ? 'sim' : 'não'}`)}>
                <Text style={styles.textoBotao}>Logar</Text>
        </TouchableOpacity>

        
        <TouchableOpacity style={styles.botao}>
                <Text style={styles.textoBotao}>Cadastrar</Text>
        </TouchableOpacity>
        </View>
        <Text style={styles.titulo}>{resultado}</Text>
    </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#222',
    padding: 20,
    paddingTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
    },
    moldura: {
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 10,
        padding: 20,
        maxWidth: 270,
        width: '100%',
    },
    titulo: {
        color: '#def847',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    label: {
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    height: 40,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 20,
    height: 40,
    justifyContent: 'center', 
    },
    picker: {
        height: 40,
        color: '#000', 
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    labelSwitch: {
        color: '#fff',
    },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  botao: {
    backgroundColor: '#ffb300',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 5,
  },
  textoBotao: {
    color: '#000000',
    fontWeight: 'bold',
  },
});