import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
    marginBottom: 10,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  txtContador: {
    color: '#a0a0a8',
    fontSize: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontWeight: '500',
  },
  containerLista: {
    flex: 1,
    paddingHorizontal: 16,
  },
  cardFilmeVertical: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderWidth: 1,
    borderColor: '#242021',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  capaFilmeVertical: {
    width: 65,
    height: 90,
    borderRadius: 6,
    backgroundColor: '#141415',
  },
  infoFilmeVertical: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },
  tituloFilmeVertical: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  detalhesFilmeVertical: {
    color: '#a0a0a8',
    fontSize: 13,
    marginBottom: 6,
  },
  notaContainerVertical: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notaFilmeVertical: {
    color: '#a0a0a8',
    fontSize: 13,
    fontWeight: '600',
  },
  btnFavoritoCard: {
    padding: 8,
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
    fontWeight: 'bold',
  },
  menuItemTextoInativo: {
    color: '#a0a0a8',
    fontSize: 11,
    marginTop: 4,
  },
});