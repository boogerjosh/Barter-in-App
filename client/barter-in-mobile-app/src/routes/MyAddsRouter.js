import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyAddsScreen from "../screens/MyAdds";

const Stack = createNativeStackNavigator();

const MyAddsRouter = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyAdds" component={MyAddsScreen} />
    </Stack.Navigator>
  );
};

export default MyAddsRouter;
