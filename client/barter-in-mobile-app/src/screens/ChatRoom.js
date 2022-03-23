import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat, Bubble, Send } from "react-native-gifted-chat";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { io } from "socket.io-client";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import FONTS from "../constants/Fonts";
import COLORS from "../constants/Colors";
const { height, width } = Dimensions.get("screen");
const setWidth = (w) => (width / 100) * w;
import AsyncStorage from "@react-native-async-storage/async-storage";

// socket = io("https://af93-110-138-93-445.ngrok.io");
// socket.on("connect", () => {
//   // console.log(socket.id, ">>>>>adsa"); // x8WIv7-mJelg7on_ALbx
// });

const ChatRoomScreen = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    console.log(message);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: COLORS.PRIMARY,
          },
        }}
        textStyle={{
          right: {
            color: "#fff",
          },
        }}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            size={32}
            style={{ marginBottom: 5, marginRight: 5 }}
            color="black"
          />
        </View>
      </Send>
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  const navigation = useNavigation();
  const [message, setMessage] = useState("");
  const [messageData, setMessageData] = useState("");
  const [senderId, setSenderId] = useState("");
  const [username, setUsername] = useState("");
  const [receiverId, setReceiverId] = useState("2");

  useEffect(async () => {
    setUsername(await AsyncStorage.getItem("username"));
    setSenderId(await AsyncStorage.getItem("id"));
  }, [username, senderId]);

  useEffect(() => {
    // socket.on("getMessage", (message) => {
    //   setMessageData(message);
    // });
  }, []);

  function submitChatMessage() {
    console.log(message);
    socket.emit("chatMessage", { message, senderId, receiverId, username });
    setMessageData(messageData);
    setMessage("");
  }

  return (
    <SafeAreaView style={styles.viewContainer}>
      <GiftedChat
        loadEarlier={true}
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        // onSubmit={submitChatMessage}
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
});

export default ChatRoomScreen;
