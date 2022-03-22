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
import MyItemScreen from "../screens/MyItem";
import MyChatRoom from "../screens/ChatRoom";

const Stack = createNativeStackNavigator();

const HomeRouter = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeRouter"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="MyItem" component={MyItemScreen} />
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
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          headerBackTitleVisible: false,
          title: "",
          headerTintColor: COLORS.PRIMARY,
        }}
      />
      <Stack.Screen name="ChatRoom" component={MyChatRoom} />
      <Stack.Screen
        name="BarterRoom"
        component={BarterRoomScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
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
