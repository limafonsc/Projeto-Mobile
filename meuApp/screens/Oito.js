import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Oito() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [resultado, setResultado] = useState('');

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

        <View style={styles.botoes} >
        <TouchableOpacity style={styles.botao} onPress={() => setResultado(`${email} - ${senha} - ${confirmarSenha}`)}>
                <Text style={styles.textoBotao}>Logar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao}>
                <Text style={styles.textoBotao}>Cadastrar</Text>
        </TouchableOpacity>
        </View>
        <Text style={styles.label}>{resultado}</Text>
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
  botoes: {
    flexDirection: 'row',
    marginLeft: 50,
    marginRight: 50,
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
