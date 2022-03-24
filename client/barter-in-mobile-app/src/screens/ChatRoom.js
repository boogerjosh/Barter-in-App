
import React, { useState, useCallback, useEffect, useRef } from "react";
import { GiftedChat, Bubble, Send } from "react-native-gifted-chat";

import {
  StyleSheet,
  View,
  Dimensions,

  Platform,
  SafeAreaView,
} from "react-native";
import { io } from "socket.io-client";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import COLORS from "../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),

});


socket = io("https://51a8-2001-448a-1061-10b7-19a9-7805-9f3a-2aef.ngrok.io");
const ChatRoomScreen = (routes) => {
  // COBA
  const notificationListener = useRef();
  // ENDCOBA
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [id, setId] = useState();
  const [photoUrl, setPhotoUrl] = useState();
  const [receiverId, setReceiverId] = useState(10000);
  const [displayMessage, setDisplayMessage] = useState([]);

  useEffect(async () => {
    console.log(routes.route.params.itemUserId, '<<<<<<<<<<<<<<<<<<<<<')
    socket.emit("firstConnect");
    socket.on("getMessage", (message) => {
      setMessages(message);
    });
    setUsername(await AsyncStorage.getItem("username"));
    setId(Number(await AsyncStorage.getItem("id")));
    setReceiverId(Number(routes.route.params.itemUserId));
    setPhotoUrl(await AsyncStorage.getItem("photoUrl"));
  }, []);

  useEffect(() => {
    function forDisplayMessage() {
      let tampung = [];
      messages.forEach((e) => {
        if (
          (e.user._id === id && e.user.receiverId === receiverId) ||
          (e.user.receiverId === id && e.user._id === receiverId)
        ) {
          tampung.push(e);
        }
      });
      return tampung;
    }
    setDisplayMessage(forDisplayMessage());
  }, [messages]);

  const onSend = useCallback(async (messages = []) => {
    socket.emit("chatMessage", messages[0]);
    setMessages((previousMessages) => {
      return GiftedChat.append(previousMessages, messages);
    });
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

  return (
    <SafeAreaView style={styles.viewContainer}>
      <GiftedChat
        loadEarlier={true}
        messages={displayMessage}
        onSend={(messages) => {
          onSend(messages);
        }}
        user={{
          _id: id,
          name: username,
          avatar: photoUrl,
          receiverId: receiverId,
        }}
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
