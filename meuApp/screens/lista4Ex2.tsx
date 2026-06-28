import React, { useState, useEffect } from "react";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import Constants from "expo-constants";

const ExercicioDois: React.FC = () => {
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
  const flexDirection = mode === "landscape" ? "row" : "column";

  return (
    <SafeAreaView style={[styles.container, { flexDirection }]}>
      <View style={styles.top}>
        <Text>Top</Text>
      </View>
      <View style={styles.middle}>
        <Text>Middle</Text>
      </View>
      <View style={styles.bottom}>
        <Text>Bottom</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  top: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFA07A", 
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

export default ExercicioDois;