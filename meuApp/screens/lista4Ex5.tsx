import React, { useState, useEffect } from "react";
import { 
  StyleSheet, 
  Text, 
  SafeAreaView, 
  View, 
  TextInput, 
  FlatList 
} from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import Constants from "expo-constants";

const ExercicioCinco: React.FC = () => {
  const [mode, setMode] = useState<string>("");
  
  const [textoInput, setTextoInput] = useState<string>("");
  const [listaNomes, setListaNomes] = useState<string[]>([]);

  useEffect(() => {
    readOrientation();

    const subscription = ScreenOrientation.addOrientationChangeListener(
      ({ orientationInfo }) => {
        if (
          orientationInfo.orientation === ScreenOrientation.Orientation.PORTRAIT_UP ||
          orientationInfo.orientation === ScreenOrientation.Orientation.PORTRAIT_DOWN
        ) {
          setMode("portrait");
        } else if (
          orientationInfo.orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
          orientationInfo.orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT
        ) {
          setMode("landscape");
        }
      }
    );

    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  const readOrientation = async () => {
    const orientation = await ScreenOrientation.getOrientationAsync();

    if (
      orientation === ScreenOrientation.Orientation.PORTRAIT_UP ||
      orientation === ScreenOrientation.Orientation.PORTRAIT_DOWN
    ) {
      setMode("portrait");
    } else if (
      orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
      orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT
    ) {
      setMode("landscape");
    }
  };

  const adicionarNome = () => {
    if (textoInput.trim() !== "") {
      setListaNomes([...listaNomes, textoInput]);
      setTextoInput(""); 
    }
  };

  const currentStyles = mode === "landscape" ? stylesLandscape : stylesPortrait;

  return (
    <SafeAreaView style={currentStyles.container}>
      <View style={currentStyles.header}>
        <Text style={stylesComum.headerText}>Exercício 5</Text>
      </View>

      <View style={currentStyles.topSection}>
        <Text style={stylesComum.label}>Nome completo</Text>
        <TextInput
          style={stylesComum.input}
          value={textoInput}
          onChangeText={setTextoInput}
          returnKeyType="done" 
          onSubmitEditing={adicionarNome} 
          placeholder="Digite um nome..."
        />
      </View>

      <View style={currentStyles.listSection}>
        <FlatList
          data={listaNomes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={stylesComum.itemLista}>
              <Text style={stylesComum.itemTexto}>{item}</Text>
            </View>
          )}
          style={{ width: "100%" }} 
        />
      </View>
    </SafeAreaView>
  );
};

const stylesComum = StyleSheet.create({
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 45,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },
  itemLista: {
    width: "100%",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  itemTexto: {
    fontSize: 16,
    color: "#333333",
    paddingLeft: 10,
  },
});

const stylesPortrait = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#FFFFFF",
  },
  header: {
    height: 55,
    backgroundColor: "#FFA07A", 
    justifyContent: "center",
    alignItems: "center",
  },
  topSection: {
    padding: 20,
    backgroundColor: "#FFA07A",
    alignItems: "center",
  },
  listSection: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
  },
});

const stylesLandscape = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#FFFFFF",
  },
  header: {
    height: 45,
    backgroundColor: "#F0E68C",
    justifyContent: "center",
    alignItems: "center",
  },
  topSection: {
    padding: 15,
    backgroundColor: "#F0E68C",
    alignItems: "center",
  },
  listSection: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },
});

export default ExercicioCinco;