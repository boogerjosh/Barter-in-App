import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Button,
  ActivityIndicator
} from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native";
import FONTS from "../constants/Fonts";
import COLORS from "../constants/Colors";
import axios from 'axios';
import * as Google from 'expo-google-app-auth';
const { height, width } = Dimensions.get("screen");
const setWidth = (w) => (width / 100) * w;

const HomeScreen = () => {
  const navigation = useNavigation();
  const [googleSubmitting, setGoogleSubmitting] = useState(false)
  const handleGoogleSignIn = () => {
    setGoogleSubmitting(true)
    const config = {
      iosClientId: `844458367499-o26lt12vj3hmr4l995o11q3dosv0meav.apps.googleusercontent.com`,
      androidClientId: `844458367499-c1pqe2nh4on96u7go5oc5r0bum5c05dv.apps.googleusercontent.com`,
      scopes: ['profile', 'email']
    };
    Google
      .logInAsync(config)
      .then((result) => {
        const { type, user } = result;
        if (type === 'success') {
          const { email, name, photoUrl } = user
          // console.log(user)

          axios({
            method: 'post',
            url: 'http://33d6-125-160-235-225.ngrok.io/users/googleLogin',
            data: user
          })
            .then(data => {
              AsyncStorage.setItem('access_token', data.data.access_token)
              AsyncStorage.setItem('id', data.data.id)
              AsyncStorage.setItem('username', data.data.username)
            })
            .catch(err => console.log('GAGAL MASUK SERVER'))

          console.log('Google signin successfull', 'SUCCESS');
          setTimeout(() => navigation.navigate('MyItem', { 
            email, name, photoUrl 
          }), 1000);
        } else {
           console.log('Google signin was canceled');
        }
          setGoogleSubmitting(false);
       })
      .catch((err) => {
        console.log(err);
        console.log('An error occurred. Check your network and try again');
        setGoogleSubmitting(false);
      })
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text>Ini Home Page</Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => navigation.push("ListItemHome")}
        >
          <Text style={styles.buttonText}>List Item</Text>
        </TouchableOpacity>
        {!googleSubmitting && (
          <Button
            google={true}
            style={styles.button}
            onPress={handleGoogleSignIn}
            title="Google Sign In"
            color="#841584"
          />
        )}
        {googleSubmitting && (
          <TouchableOpacity
          google={true}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>We dit it</Text>
        </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: 8,
    elevation: 3,
    marginVertical: 2,
    width: setWidth(25),
  },
  buttonText: {
    fontSize: 13,
    color: COLORS.DARK_GREY,
    fontFamily: FONTS.BOLD,
  },
});

export default HomeScreen;
