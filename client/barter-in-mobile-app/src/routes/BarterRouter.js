import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home";
import MyItemScreen from "../screens/MyItem";
import BarterRoomScreen from "../screens/BarterRoom";
import ProfileScreen from "../screens/Profile";
import DetailScreen from "../screens/Detail";
import ListItemHomeScreen from "../screens/ListItemHome";
import ChatRoomScreen from "../screens/ChatRoom";

const Stack = createNativeStackNavigator();

const BarterRouter = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BarterRoom" component={BarterRoomScreen} />
      <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default BarterRouter;
