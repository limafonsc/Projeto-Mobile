import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121214',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
    height: 80,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 8,
  },
  txtSubHeader: {
    color: '#a0a0a8',
    fontSize: 14,
  },
  cardGenero: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#141415',
    borderWidth: 1,
    borderColor: '#1e1e22',
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 60,
    marginBottom: 12,
  },
  blocoEsquerda: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtNomeGenero: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  blocoDireita: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtQuantidade: {
    color: '#a0a0a8',
    fontSize: 13,
    marginRight: 8,
  },
  menuInferiorContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#121214',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
    borderTopWidth: 1,
    borderTopColor: '#242021',
    paddingBottom: 10,
  },
  menuItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemTextoAtivo: {
    color: '#d30046',
    fontSize: 11,
    marginTop: 4,
  },
  menuItemTextoInativo: {
    color: '#a0a0a8',
    fontSize: 11,
    marginTop: 4,
  },
});
