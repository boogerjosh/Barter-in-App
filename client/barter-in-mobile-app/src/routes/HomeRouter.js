import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home";
import MyAddsScreen from "../screens/MyAdds";
import BarterRoomScreen from "../screens/BarterRoom";
import ProfileScreen from "../screens/Profile";
import DetailScreen from "../screens/Detail";
import ListItemHomeScreen from "../screens/ListItemHome";
import Login from "../screens/Login";

const Stack = createNativeStackNavigator();

const HomeRouter = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="MyAdds" component={MyAddsScreen} />
      <Stack.Screen name="BarterRoom" component={BarterRoomScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="ListItemHome" component={ListItemHomeScreen} />
    </Stack.Navigator>
  );
};

export default HomeRouter;
