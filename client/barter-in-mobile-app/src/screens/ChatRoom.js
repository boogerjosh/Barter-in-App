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
  Image
} from "react-native";
import { io } from "socket.io-client";
socket = io("http://33d6-125-160-235-225.ngrok.io");
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import FONTS from "../constants/Fonts";
import COLORS from "../constants/Colors";
const { height, width } = Dimensions.get("screen");
const setWidth = (w) => (width / 100) * w;
const messageArray = [];
import AsyncStorage from "@react-native-async-storage/async-storage"

const ChatRoomScreen = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState("");
  const [messageData, setMessageData] = useState("");
  const [senderId, setSenderId] = useState('')
  const [username, setUsername] = useState('')
  const [receiverId, setReceiverId] = useState('1000')

  useEffect(async () => {
    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });
    setUsername(await AsyncStorage.getItem('username'))
    setSenderId(await AsyncStorage.getItem('id'))
  }, []);

  useEffect(() => {
    socket.on("chatMessage", (message) => {
      setMessageData(message);
    });
  }, [messageData]);

  function submitChatMessage(text, eventCount, target) {
    socket.emit("chatMessage", {message, senderId, receiverId, username});
    setMessageData(messageData);
    setMessage("");
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>

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
          ? messageData.map((e, i) => <Text style={styles.messageText} key={i}>{e.message}</Text>)
          : null}
          <Text style={styles.messageTextSender}>From Right</Text>
      </ScrollView>
      <TextInput
        keyboardShouldPersistTaps="always"
        value={message}
        style={styles.textInputStyle}
        onSubmitEditing={() => {
          submitChatMessage();
        }}
        blurOnSubmit={false}
        onChangeText={(e) => {
          setMessage(e);
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
  messageText: {
    backgroundColor: 'green',
    alignSelf:'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
    margin: 2,
    borderRadius: 10
  },
  messageTextSender: {
    backgroundColor: '#92a8d1',
    alignSelf:'flex-end',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    margin: 2,
    borderRadius: 10
  }
});

export default ChatRoomScreen;
