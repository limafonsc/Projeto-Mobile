import Constants from 'expo-constants';
import { StyleSheet, View, } from 'react-native';

export default function Um() {
  return (
    <View style={styles.container}>
        <View style={styles.blocoDeCima} >
                <View style={styles.filhoCrimson} />
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
  filhoCrimson: {
    flex: 1,
    backgroundColor: 'crimson',
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