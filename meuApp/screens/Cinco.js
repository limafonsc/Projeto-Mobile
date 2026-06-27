import Constants from 'expo-constants';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import logo from '../assets/images/splash-icon.png';

export default function Um() {

    const clique = () => {
        alert('Boa noite!');
    }
  return (
    <View style={styles.container}>
        <View style={styles.blocoDeCima} >
            <View style= {styles.blocoCimaEsquerda} >
                <View style={styles.filhoLime} >
                <TouchableOpacity onPress={clique} style={styles.botaoClique}>
                    <Image source={logo} style={styles.imagemAlvo} />
                </TouchableOpacity>
                </View>
            </View>
            <View style={styles.blocoCimaDireita}>
                <View style={styles.primeiroCimaDireita} >
                  <View style ={styles.filhoTeal} >
                  <TouchableOpacity onPress={clique} style={styles.botaoClique}>
                    <Image source={logo} style={styles.imagemAlvo} />
                </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.segundoCimaDireita} >
                  <View style={styles.filhoSkyBlue} >
                  <TouchableOpacity onPress={clique} style={styles.botaoClique}>
                    <Image source={logo} style={styles.imagemAlvo} />
                </TouchableOpacity>
                  </View>
                </View>
            </View>
            
        </View>
      
        <View style={styles.blocoDeBaixo} >
            <View style={styles.filhoSalmon} >
            <TouchableOpacity onPress={clique} style={styles.botaoClique}>
                    <Image source={logo} style={styles.imagemAlvo} />
                </TouchableOpacity>
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column', 
    paddingTop: Constants.statusBarHeight, 
  },
  imagemAlvo: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: 64,
    height: 64,
  },
  botaoClique: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blocoDeCima: {
    flex: 0.5,
    flexDirection: 'row',
  },
  blocoCimaEsquerda: {
    flex: 0.5,
    flexDirection: 'row',
  },
  filhoLime: {
    flex: 1,
    backgroundColor: 'lime',
  },
  blocoCimaDireita: {
    flex: 0.5,
    flexDirection: 'column',
  },
  primeiroCimaDireita: {
    flex: 0.5,
    flexDirection: 'column',
  },
  filhoTeal: {
    flex: 1,
    backgroundColor: 'teal',
  },
  segundoCimaDireita: {
    flex: 0.5,
  },
  filhoSkyBlue: {
    flex: 1,
    backgroundColor: 'skyblue',
  },
  blocoDeBaixo: {
    flexDirection: 'column',
    flex: 0.5,
  },
  filhoSalmon: {
    flex:1,
    backgroundColor: 'salmon',
  },
});