import React, { useState, useEffect } from "react";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import Constants from "expo-constants";

const ExercicioQuatro: React.FC = () => {
  const [mode, setMode] = useState<string>("");

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

  const currentStyles = mode === "landscape" ? stylesLandscape : stylesPortrait;

  return (
    <SafeAreaView style={currentStyles.container}>
      <View style={currentStyles.header}>
        <Text style={stylesComum.headerText}>Exercício 4</Text>
      </View>

      <View style={currentStyles.contentContainer}>
        <View style={currentStyles.middle}>
          <Text style={stylesComum.text}>Middle</Text>
        </View>
        <View style={currentStyles.bottom}>
          <Text style={stylesComum.text}>Bottom</Text>
        </View>
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
  text: {
    fontSize: 16,
    color: "#000000",
  },
});

const stylesPortrait = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#FFA07A",
  },
  header: {
    height: 60,
    backgroundColor: "#FFF8DC", 
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    flexDirection: "column", 
  },
  middle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F08080",
  },
  bottom: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6347",
  },
});
const stylesLandscape = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column", 
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#FFF8DC",
  },
  header: {
    height: 50,
    backgroundColor: "#FFF8DC", 
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row", 
  },
  middle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E6E6FA",
  },
  bottom: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D8BFD8",
  },
});

export default ExercicioQuatro;