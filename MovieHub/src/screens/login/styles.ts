import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

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
    backgroundColor: 'rgba(0, 0, 0, 0.69)', 
  },
  title: {
    flexDirection: 'row',
    marginBottom: 2,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 6,
  },
  textMovie: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: -25,
  },
  textHub: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#d30046',
    marginBottom: -25,
  },
  descricao: {
    marginBottom: 30,
  },
  textDescricao: {
    fontSize: 16,
    color: '#a0a0a8',
    fontWeight: '500',
  },
  container: {
    width: width * 0.85, 
    padding: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.79)', 
    borderWidth: 1,
    borderColor: '#242021',
  },
  button: {
    backgroundColor: '#d30046', 
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 20,
    shadowColor: '#d3007f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  textButton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkCadastro: {
    color: '#a0a0a8',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  linkCriarConta: {
    color: '#d30046',
    fontWeight: 'bold',
  },
  loading: {
    marginVertical: 20,
    alignItems: 'center',
  },

  inputLabel: {
    fontSize: 14,
    color: '#ffffff',
    alignSelf: 'flex-start',
    marginBottom: 6,
    fontWeight: '500',
  },
  inputRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#202024',
    borderWidth: 1,
    borderColor: '#323238', 
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 52,
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    height: '100%',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: -4,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#52515A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  checkboxChecked: {
    backgroundColor: '#d30046',
    borderColor: '#d30046',
  },
  textOptions: {
    color: '#a0a0a8',
    fontSize: 13,
  },
  textEsqueciSenha: {
    color: '#d30046', 
    fontSize: 13,
    fontWeight: '500',
  },
  divisorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  divisorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#323238',
  },
  textDivisor: {
    color: '#a0a0a8',
    paddingHorizontal: 12,
    fontSize: 14,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  socialButton: {
    width: '47%',
    flexDirection: 'row',
    backgroundColor: '#202024',
    borderWidth: 1,
    borderColor: '#323238',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textSocialButton: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '500',
  },
});