import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./src/routes/index";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

const App = () => {
  const [fontsLoaded] = useFonts({
    Regular: require("./assets/fonts/Poppins-Regular.ttf"),
    Bold: require("./assets/fonts/Poppins-Bold.ttf"),
    Black: require("./assets/fonts/Poppins-Black.ttf"),
    ExtraBold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    ExtraLight: require("./assets/fonts/Poppins-ExtraLight.ttf"),
    Light: require("./assets/fonts/Poppins-Light.ttf"),
    SemiBold: require("./assets/fonts/Poppins-SemiBold.ttf"),
    Medium: require("./assets/fonts/Poppins-Medium.ttf"),
    Italic: require("./assets/fonts/Poppins-Italic.ttf"),
  });
  return fontsLoaded ? (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  ) : (
    <AppLoading />
  );
};

export default App;

const styles = StyleSheet.create({});
