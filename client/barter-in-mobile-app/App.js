import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "./src/constants/Colors";

import HomeRouter from "./src/routes/HomeRouter";
import ProfileScreen from "./src/screens/Profile";
import MyItemScreen from "./src/screens/MyItem";
import BarterRoomScreen from "./src/screens/BarterRoom";

const Tab = createBottomTabNavigator();

export default function App() {
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
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "HomeRouter") {
              iconName = focused ? "home-sharp" : "home-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            } else if (route.name === "MyItem") {
              iconName = focused ? "archive-sharp" : "archive-outline";
            } else if (route.name === "BarterRoom") {
              iconName = focused ? "basket-sharp" : "basket-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: COLORS.PRIMARY_LIGHT,
          tabBarInactiveTintColor: COLORS.EXTRA_LIGHT_GRAY,
          tabBarActiveBackgroundColor: COLORS.BASIC_BACKGROUND,
          tabBarInactiveBackgroundColor: COLORS.BASIC_BACKGROUND,
        })}
      >
        <Tab.Screen
          name="HomeRouter"
          component={HomeRouter}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="MyItem" component={MyItemScreen} />
        <Tab.Screen name="BarterRoom" component={BarterRoomScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  ) : (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <AppLoading />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
