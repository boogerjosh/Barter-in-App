import { StyleSheet } from "react-native";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/Colors";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";

import HomeRouter from "./HomeRouter";
import BarterRouter from "./BarterRouter";
import ProfileScreen from "../screens/Profile";
import MyAddsRouter from "./MyAddsRouter";
import PostItemRouter from "./PostItemRouter";
import Splash from "../screens/Splash";
import ProfileRouter from "./ProfileRouter";

import Login from "../screens/Login";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainApp = () => {

  const navigation = useNavigation()
  useEffect(()=> {
    Notifications.addNotificationResponseReceivedListener((response) => {
      navigation.push(response.notification.request.content.data.navigate)
    });
  },[])
  const getTabBarStyle = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    let display =
      routeName === "ChatRoom" || routeName === "Login" ? "none" : "flex";
    return { display };
  };
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "EXPLORE") {
            iconName = focused ? "home-sharp" : "home-outline";
          } else if (route.name === "MY ACCOUNT") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "ADD ADS") {
            iconName = focused
              ? "md-add-circle-sharp"
              : "md-add-circle-outline";
          } else if (route.name === "MY ADS") {
            iconName = focused ? "archive-sharp" : "archive-outline";
          } else if (route.name === "BARTER") {
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
        name="EXPLORE"
        component={HomeRouter}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="MY ADS"
        component={MyAddsRouter}
        options={{ headerShown: false }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();
            navigation.navigate("MY ADS");
            // Do something with the `navigation` object
            // navigation.navigate("MY ACCOUNT");
          },
        })}
      />
      <Tab.Screen
        name="ADD ADS"
        component={PostItemRouter}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="BARTER"
        component={BarterRouter}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="MY ACCOUNT"
        component={ProfileRouter}
        options={
          // { headerShown: false }
          ({ route }) => ({
            tabBarStyle: getTabBarStyle(route),
            headerShown: false,
          })
        }
      />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeRouter"
        component={HomeRouter}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyAddsRouter"
        component={MyAddsRouter}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PostItemRouter"
        component={PostItemRouter}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BarterRouter"
        component={BarterRouter}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export const AuthRouter = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Router;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
