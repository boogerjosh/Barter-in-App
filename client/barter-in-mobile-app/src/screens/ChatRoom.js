import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Image,
} from "react-native";
import { io } from "socket.io-client";
socket = io("http://192.168.1.5:3000");
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import FONTS from "../constants/Fonts";
import COLORS from "../constants/Colors";
const { height, width } = Dimensions.get("screen");
const setWidth = (w) => (width / 100) * w;
const messageArray = [];

const ChatRoomScreen = () => {
  const navigation = useNavigation();
  const [chatMessage, setChatMessage] = useState("");
  const [messageData, setMessageData] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });
  }, []);

  useEffect(() => {
    socket.on("chatMessage", (message) => {
      setMessageData(message);
    });
  }, [messageData]);

  function submitChatMessage(text, eventCount, target) {
    socket.emit("chatMessage", chatMessage);
    setMessageData(messageData);
    setChatMessage("");
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <View style={styles.container}>
        <StatusBar style="auto" />
        <Text>Ini Barter Room Screen</Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => navigation.push("Home", {})}
        >
          <Text style={styles.buttonText}>Confirm Barter</Text>
        </TouchableOpacity>
      </View> */}
      <View style={styles.receiverView}>
        <Image
          style={styles.receiverImage}
          source={{
            uri: "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1578620671/wwa6sd5wyp1wxjrder5i.png",
          }}
        />
        <Text>RECEIVER NAME</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {messageData
          ? messageData.map((e, i) => <Text key={i}>{e}</Text>)
          : null}
      </ScrollView>
      <TextInput
        keyboardShouldPersistTaps="always"
        value={chatMessage}
        style={styles.textInputStyle}
        onSubmitEditing={() => {
          submitChatMessage();
        }}
        blurOnSubmit={false}
        onChangeText={(e) => {
          setChatMessage(e);
        }}
        placeholder="Message"
      />
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
  textInputStyle: {
    padding: 10,
    width: Dimensions.get("window").width,
    height: 40,
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: "red",
  },
  scrollView: {
    width: Dimensions.get("window").width,
  },
  receiverImage: {
    width: 50,
    height: 50,
    borderRadius: 1000,
  },
  receiverView: {
    width: Dimensions.get("window").width,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    padding: 10,
  },
});

export default ChatRoomScreen;
