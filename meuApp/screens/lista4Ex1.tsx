import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Text, SafeAreaView } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";

const lista4Ex1: React.FC = () => {
  const [mode, setMode] = useState("");

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
  const backgroundColor = mode === "landscape" ? "#1E90FF" : "#FFA500";

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <Text style={styles.text}>Tela em modo {mode}</Text>
    </SafeAreaView>
  );
};

export default lista4Ex1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  }
});