import { StyleSheet } from 'react-native';

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
        backgroundColor: 'rgba(0, 0, 0, 0.79)', 
    },
    container: {
        alignItems: 'center',
    },
    image: {
        width: 190,
        height: 290,
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
        fontWeight: 500,
    },
    loading: {
        marginTop: 10,
    },
});