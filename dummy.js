{
  /* <View style={{ marginTop: 10 }}>
          {categories.map((chunk, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                {chunk.map((category) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => navigation.push("ListItemHome")}
                    >
                      <View
                        key={category.id}
                        style={{
                          width: width / 3 - 30,
                          marginHorizontal: 10,
                          justifyContent: "center",
                          marginBottom: 20,
                        }}
                      >
                        <View
                          style={{
                            position: "absolute",
                            top: 0,
                            backgroundColor: COLORS.PRIMARY_LIGHT,
                            borderRadius: 10,
                            width: width / 3 - 30,
                            height: width / 3 - 60,
                          }}
                        />
                        <View>
                          <Image
                            source={category.image}
                            style={{
                              width: width / 3 - 30,
                              height: width / 3 - 30,
                            }}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontFamily: FONTS.BOLD,
                            }}
                          >
                            {category.title}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })}
        </View> */
}

// import React, { useState, useCallback, useEffect } from "react";
// import { GiftedChat, Bubble, Send } from "react-native-gifted-chat";
// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   Dimensions,
//   TextInput,
//   Image,
//   TouchableWithoutFeedback,
//   KeyboardAvoidingView,
//   Platform,
//   SafeAreaView,
// } from "react-native";
// import { io } from "socket.io-client";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import FontAwesome from "react-native-vector-icons/FontAwesome";
// import { useNavigation } from "@react-navigation/native";
// import FONTS from "../constants/Fonts";
// import COLORS from "../constants/Colors";
// const { height, width } = Dimensions.get("screen");
// const setWidth = (w) => (width / 100) * w;
// import AsyncStorage from "@react-native-async-storage/async-storage";

// socket = io("http://ac5f-139-193-79-181.ngrok.io");
// socket.on("connect", () => {
//   console.log(socket.id); // x8WIv7-mJelg7on_ALbx
// });
// a;
// const ChatRoomScreen = () => {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     setMessages([
//       {
//         _id: 1,
//         text: "Hello developer",
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: "React Native",
//           avatar: "https://placeimg.com/140/140/any",
//         },
//       },
//     ]);
//   }, []);

//   const onSend = useCallback((messages = []) => {
//     setMessages((previousMessages) =>
//       GiftedChat.append(previousMessages, messages)
//     );
//   }, []);

//   const renderBubble = (props) => {
//     return (
//       <Bubble
//         {...props}
//         wrapperStyle={{
//           right: {
//             backgroundColor: COLORS.PRIMARY,
//           },
//         }}
//         textStyle={{
//           right: {
//             color: "#fff",
//           },
//         }}
//       />
//     );
//   };

//   const renderSend = (props) => {
//     return (
//       <Send {...props}>
//         <View>
//           <MaterialCommunityIcons
//             name="send-circle"
//             size={32}
//             style={{ marginBottom: 5, marginRight: 5 }}
//             color="black"
//           />
//         </View>
//       </Send>
//     );
//   };

//   const scrollToBottomComponent = () => {
//     return <FontAwesome name="angle-double-down" size={22} color="#333" />;
//   };

//   // const navigation = useNavigation();
//   // const [message, setMessage] = useState("");
//   // const [messageData, setMessageData] = useState("");
//   // const [senderId, setSenderId] = useState("");
//   // const [username, setUsername] = useState("");
//   // const [receiverId, setReceiverId] = useState("2");

//   // useEffect(async () => {
//   //   setUsername(await AsyncStorage.getItem("username"));
//   //   setSenderId(await AsyncStorage.getItem("id"));
//   // }, [username, senderId]);

//   // useEffect(() => {
//   //   socket.on("getMessage", (message) => {
//   //     setMessageData(message);
//   //   });
//   // }, []);

//   // function submitChatMessage(text, eventCount, target) {
//   //   socket.emit("chatMessage", { message, senderId, receiverId, username });
//   //   setMessageData(messageData);
//   //   setMessage("");
//   // }

//   return (
//     <SafeAreaView style={styles.viewContainer}>
//       <GiftedChat
//         loadEarlier={true}
//         messages={messages}
//         onSend={(messages) => onSend(messages)}
//         user={{
//           _id: 1,
//         }}
//         renderBubble={renderBubble}
//         alwaysShowSend
//         renderSend={renderSend}
//         scrollToBottom
//         scrollToBottomComponent={scrollToBottomComponent}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   viewContainer: {
//     flex: 1,
//   },
// });

// export default ChatRoomScreen;

// // import React, { useEffect, useState } from "react";
// // import {
// //   StyleSheet,
// //   Text,
// //   View,
// //   ScrollView,
// //   FlatList,
// //   TouchableOpacity,
// //   Dimensions,
// //   TextInput,
// //   Image,
// // } from "react-native";
// // import { io } from "socket.io-client";
// // socket = io("https://ac5f-139-193-79-181.ngrok.io");
// // import { StatusBar } from "expo-status-bar";
// // import { useNavigation } from "@react-navigation/native";
// // import FONTS from "../constants/Fonts";
// // import COLORS from "../constants/Colors";
// // const { height, width } = Dimensions.get("screen");
// // const setWidth = (w) => (width / 100) * w;
// // const messageArray = [];
// // import AsyncStorage from "@react-native-async-storage/async-storage";
// // socket.on("connect", () => {
// //   console.log(socket.id); // x8WIv7-mJelg7on_ALbx
// // });

// // const ChatRoomScreen = () => {
// //   const navigation = useNavigation();
// //   const [message, setMessage] = useState("");
// //   const [messageData, setMessageData] = useState("");
// //   const [senderId, setSenderId] = useState("");
// //   const [username, setUsername] = useState("");
// //   const [receiverId, setReceiverId] = useState("2");

// //   useEffect(async () => {
// //     setUsername(await AsyncStorage.getItem("username"));
// //     setSenderId(await AsyncStorage.getItem("id"));
// //   }, [username, senderId]);

// //   useEffect(() => {
// //     socket.on("getMessage", (message) => {
// //       setMessageData(message);
// //     });
// //   }, [messageData]);

// //   function submitChatMessage(text, eventCount, target) {
// //     socket.emit("chatMessage", { message, senderId, receiverId, username });
// //     setMessageData(messageData);
// //     setMessage("");
// //   }

// //   return (
// //     <ScrollView contentContainerStyle={styles.container}>
// //       <View style={styles.receiverView}>
// //         <Image
// //           style={styles.receiverImage}
// //           source={{
// //             uri: "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1578620671/wwa6sd5wyp1wxjrder5i.png",
// //           }}
// //         />
// //         <Text>RECEIVER NAME</Text>
// //       </View>
// //       <ScrollView style={styles.scrollView}>
// //         {messageData
// //           ? messageData.map((e, i) =>
// //               e.senderId === senderId ? (
// //                 <Text style={styles.messageTextSender} key={i}>
// //                   {e.username}: {e.message}
// //                 </Text>
// //               ) : e.receiverId === senderId && receiverId === e.senderId ? (
// //                 <Text style={styles.messageText} key={i}>
// //                   {e.receiverId}:{e.message}
// //                 </Text>
// //               ) : null
// //             )
// //           : null}
// //       </ScrollView>
// //       <TextInput
// //         keyboardShouldPersistTaps="always"
// //         value={message}
// //         style={styles.textInputStyle}
// //         onSubmitEditing={() => {
// //           submitChatMessage();
// //         }}
// //         blurOnSubmit={false}
// //         onChangeText={(e) => {
// //           setMessage(e);
// //         }}
// //         placeholder="Message"
// //       />
// //     </ScrollView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#fff",
// //     alignItems: "center",
// //     justifyContent: "center",
// //   },
// //   button: {
// //     justifyContent: "center",
// //     alignItems: "center",
// //     borderRadius: 5,
// //     backgroundColor: COLORS.PRIMARY,
// //     paddingVertical: 8,
// //     elevation: 3,
// //     marginVertical: 2,
// //     width: setWidth(25),
// //   },
// //   buttonText: {
// //     fontSize: 13,
// //     color: COLORS.DARK_GREY,
// //     fontFamily: FONTS.BOLD,
// //   },
// //   textInputStyle: {
// //     padding: 10,
// //     width: Dimensions.get("window").width,
// //     height: 40,
// //     borderWidth: 2,
// //     borderRadius: 20,
// //     backgroundColor: "red",
// //   },
// //   scrollView: {
// //     width: Dimensions.get("window").width,
// //   },
// //   receiverImage: {
// //     width: 50,
// //     height: 50,
// //     borderRadius: 1000,
// //   },
// //   receiverView: {
// //     width: Dimensions.get("window").width,
// //     flexDirection: "row",
// //     alignItems: "center",
// //     borderWidth: 2,
// //     padding: 10,
// //   },
// //   messageText: {
// //     backgroundColor: "green",
// //     alignSelf: "flex-start",
// //     paddingVertical: 5,
// //     paddingHorizontal: 10,
// //     marginLeft: 10,
// //     margin: 2,
// //     borderRadius: 10,
// //   },
// //   messageTextSender: {
// //     backgroundColor: "#92a8d1",
// //     alignSelf: "flex-end",
// //     paddingVertical: 5,
// //     paddingHorizontal: 10,
// //     marginRight: 10,
// //     margin: 2,
// //     borderRadius: 10,
// //   },
// // });

// // export default ChatRoomScreen;
