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
                <View style={styles.filhoAquamarine} />
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
  },
  filhoAquamarine: {
    flex: 1,
    backgroundColor: 'aquamarine',
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