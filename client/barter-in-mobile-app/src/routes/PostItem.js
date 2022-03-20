import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home";
import ChooseCategoryScreen from "../screens/ChooseCategory";
import InputItemScreen from "../screens/InputItem";

const Stack = createNativeStackNavigator();

const HomeRouter = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ChooseCategory" component={ChooseCategoryScreen} options={{
        headerShown: false
      }} />
      <Stack.Screen name="InputItem" component={InputItemScreen} />
    </Stack.Navigator>
  );
};

export default HomeRouter;
