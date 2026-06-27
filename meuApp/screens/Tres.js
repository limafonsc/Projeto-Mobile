import Constants from 'expo-constants';
import { StyleSheet, View, } from 'react-native';

export default function Tres() {
  return (
    <View style={styles.container}>
        <View style={styles.blocoDeCima} >
            <View style= {styles.blocoCimaEsquerda} >
                <View style={styles.filhoLime} />
            </View>
            <View style={styles.blocoCimaDireita}>
                <View style ={styles.filhoTeal} />
                <View style={styles.filhoSkyBlue} />
            </View>
            
        </View>
      
        <View style={styles.blocoDeBaixo} >
            <View style={styles.filhoSalmon} />
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
  filhoTeal: {
    flex: 0.5,
    backgroundColor: 'teal',
  },
  filhoSkyBlue: {
    flex: 0.5,
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