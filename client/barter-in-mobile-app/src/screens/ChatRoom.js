import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat'
import {
  StyleSheet,
  View,
  Dimensions,
  SafeAreaView
} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import FONTS from "../constants/Fonts";
import COLORS from "../constants/Colors";
const { height, width } = Dimensions.get("screen");
const setWidth = (w) => (width / 100) * w;
import AsyncStorage from "@react-native-async-storage/async-storage";

import { io } from "socket.io-client";
socket = io("https://245f-2001-448a-1061-10b7-855e-111e-1bdf-867d.ngrok.io");
socket.on("connect", () => {
});

const ChatRoomScreen = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit('chatMessage', {});
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    console.log(messages)
    socket.emit("chatMessage", messages);
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: COLORS.PRIMARY
          }
        }}
        textStyle={{
          right: {
            color: '#fff'
          }
        }}
      />
    )
  }

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons name="send-circle" size={32} style={{ marginBottom: 5, marginRight: 5}} color='black' />
        </View>
      </Send>
    )
  }

  const scrollToBottomComponent = () => {
    return(
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
  }

  return (
    <SafeAreaView style={styles.viewContainer}>
      <GiftedChat
      loadEarlier={true}
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
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
    flex: 1
  },
});

export default ChatRoomScreen;
