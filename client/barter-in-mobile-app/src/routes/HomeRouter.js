import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home";
import MyAddsScreen from "../screens/MyAdds";
import BarterRoomScreen from "../screens/BarterRoom";
import ProfileScreen from "../screens/Profile";
import DetailScreen from "../screens/Detail";
import ListItemHomeScreen from "../screens/ListItemHome";
import Login from "../screens/Login";
import COLORS from "../constants/Colors";

const Stack = createNativeStackNavigator();

const HomeRouter = () => {
  // if (route.state && route.state.routeNames[route.state.index] === 'Login') {
  //   navigation.setOptions({tabBarVisible: false})
  // } else {
  //   navigation.setOptions({tabBarVisible: true})
  // }
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyItem" component={MyItemScreen} />
      <Stack.Screen
        name="HomeRouter"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MyAdds"
        component={MyAddsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="BarterRoom" component={BarterRoomScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          headerBackTitleVisible: false,
          title: "",
          headerTintColor: COLORS.PRIMARY,
        }}
      />
      <Stack.Screen
        name="ListItemHome"
        component={ListItemHomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeRouter;
