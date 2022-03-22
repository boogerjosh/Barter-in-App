import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home";
import BarterRoomScreen from "../screens/BarterRoom";
import ChatRoomScreen from "../screens/ChatRoom";
import DetailScreen from "../screens/Detail";

const Stack = createNativeStackNavigator();

const BarterRouter = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BarterRoom"
        component={BarterRoomScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default BarterRouter;
