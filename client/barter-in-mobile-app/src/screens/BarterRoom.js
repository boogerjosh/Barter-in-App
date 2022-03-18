import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import FONTS from "../constants/Fonts";
import COLORS from "../constants/Colors";
const { height, width } = Dimensions.get("screen");
const setWidth = (w) => (width / 100) * w;

const BarterRoomScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text>Ini Barter Room Screen</Text>
      </View>
      <View style={styles.containerButton}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => navigation.push("Home", {})}
        >
          <Text style={styles.buttonText}>Confirm Barter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => navigation.push("ChatRoom", {})}
        >
          <Text style={styles.buttonText}>Chat Owner</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  containerButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
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

export default BarterRoomScreen;
