import Constants from 'expo-constants';
import { Image, StyleSheet, View } from 'react-native';
import logo from '../assets/images/splash-icon.png';

export default function Um() {
  return (
    <View style={styles.container}>
        <View style={styles.blocoDeCima} >
            <View style= {styles.blocoCimaEsquerda} >
                <View style={styles.filhoLime} />
                <Image source={logo} style={styles.imagemAlvo} />
            </View>
            <View style={styles.blocoCimaDireita}>
                <View style={styles.primeiroCimaDireita} >
                  <View style ={styles.filhoTeal} />
                  <Image source={logo} style={styles.imagemAlvo} />
                </View>
                <View style={styles.segundoCimaDireita} >
                  <View style={styles.filhoSkyBlue} />
                  <Image source={logo} style={styles.imagemAlvo} />
                </View>
            </View>
            
        </View>
      
        <View style={styles.blocoDeBaixo} >
            <View style={styles.filhoSalmon} />
            <Image source={logo} style={styles.imagemAlvo} />
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
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  blocoDeCima: {
    flex: 0.5,
    flexDirection: 'row',
  },
  blocoCimaEsquerda: {
    flex: 0.5,
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
    flexDirection: 'row',
    flex: 0.5,
  },
  filhoSalmon: {
    flex:1,
    backgroundColor: 'salmon',
  },
});