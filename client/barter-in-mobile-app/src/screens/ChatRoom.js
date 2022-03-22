import React, { useState, useCallback, useEffect, useRef } from "react";
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
  Button,
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
// COBAAA
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
// COBA

socket = io("http://31f6-125-160-237-226.ngrok.io");

const ChatRoomScreen = () => {
  // COBA
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  // ENDCOBA
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [id, setId] = useState();
  const [receiverId, setReceiverId] = useState(8);
  const [displayMessage, setDisplayMessage] = useState([]);
  const [mount, setMount] = useState(0);

  // ENDCOBA
  // COBA
  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
    return token;
  }
  // ENDCOBA
  // UNTUK BUAT AWAL AJAAA!!!!!!
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect( async() => {
    socket.emit("firstConnect");
    socket.on("getMessage", (message) => {
      setMessages(message);
    });
    setUsername(await AsyncStorage.getItem("username"));
    setId(Number(await AsyncStorage.getItem("id")));

  }, []);

  // UNTUK BUAT MESAGE PENAMPUNG!!!!!!
  useEffect(() => {
    function forDisplayMessage() {
      let tampung = [];
      messages.forEach((e) => {
        console.log(e.user)
        // if(e.user) {
          // if (
          //   (e.user._id === id && e.user.receiverId === receiverId) ||
          //   (e.user.receiverId === id && e.user._id === receiverId) ||
          //   (e.user.receiverId === receiverId && e.user._id === _id)
          // ) {
            tampung.push(e);
          // }
        // }
      });
      return tampung;
    }
    setDisplayMessage(forDisplayMessage());
  }, [messages]);

  useEffect(async () => {
    setMount(mount + 1)
    if(mount >= 2) {
      console.log('masokkk')
      setMount(1)
      await sendPushNotification(expoPushToken);
    }
  }, [displayMessage]);

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
          avatar: "https://placeimg.com/140/140/any",
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

async function sendPushNotification(expoPushToken) {
  console.log(expoPushToken);
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
});

export default ChatRoomScreen;
