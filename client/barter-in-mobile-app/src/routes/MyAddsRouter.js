// import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyAddsScreen from "../screens/MyAdds";
import DetailScreen from "../screens/Detail";

import React, { useState, useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import Login from "../screens/Login";
// import { useNavigation } from "@react-navigation/native";
// import ProfileScreen from "../screens/Profile";
// import ProfileRouter from "./ProfileRouter";
const Stack = createNativeStackNavigator();

const MyAddsRouter = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyAdds"
        component={MyAddsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default MyAddsRouter;
