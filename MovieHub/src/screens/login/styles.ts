import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#121214',
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    backgroundDark: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#0b0b0bea',
    },
    container: {
        alignItems: 'center',
        backgroundColor: '#000',
    },
    input: {
        backgroundColor: '#202024',
    },
    button: {
        backgroundColor: '#202024',
    },
    textButton: {
        backgroundColor: '#202024',
    },
    linkCadastro: {
        backgroundColor: '#202024',
    },
    linkCriarConta: {
        backgroundColor: '#202024',
    },
    image: {
        width: 190,
        resizeMode: 'contain',
        marginBottom: -60,
        marginTop: -100,
    },
    title: {
        flexDirection: 'row',
        marginBottom: 2,
    },
    textMovie: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    textHub: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#d30046',
    },
    descricao: {
        flexDirection: 'column',
        marginBottom: 24,
    },
    textDescricao: {
        fontSize: 15,
        color: 'rgb(177, 177, 177)',
    },
    loading: {
        marginTop: 10,
    },
})