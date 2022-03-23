import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./src/routes/index";
import { AuthContext } from "./src/components/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

   const authContext = React.useMemo(() => ({
    signOut: async() => {
      try {
        await AsyncStorage.removeItem('access_token');
        setUserToken(null);
        setIsLoading(false);
      } catch(e) {
        console.log(e);
      }
    },
   }), []);
  
    useEffect(() => {
      setTimeout(async() => {
        setIsLoading(false);
        try {
          await AsyncStorage.getItem('access_token');
        } catch(e) {
          console.log(e);
        }
        // console.log('user token: ', userToken);
      }, 1000);
  }, [userToken]);
  
  if( isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
