import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import FONTS from "../constants/Fonts";
import COLORS from "../constants/Colors";
const { height, width } = Dimensions.get("screen");
const setWidth = (w) => (width / 100) * w;

const ProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        <SafeAreaView style={styles.header}>
          <View style={styles.headerWrapper}>
            <View style={styles.headerDetails}>
              <View>
                <Text style={styles.nameText}>My Account</Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
        <StatusBar style="auto" />
        <View
          style={{
            width: width,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            paddingHorizontal: 15,
            marginBottom: 20,
          }}
        >
          <Image
            source={require("../../assets/person.jpg")}
            style={styles.headerImage}
          />
        </View>
        <View style={{ flexDirection: "column", justifyContent: "center" }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: width * 0.9,
              marginBottom: 10,
              borderBottomWidth: 2,
              marginTop: 20,
              borderColor: COLORS.EXTRA_LIGHT_GRAY,
              marginHorizontal: 15,
            }}
          >
            <Text
              style={{ fontFamily: FONTS.BOLD, fontSize: 18, marginRight: 35 }}
            >
              Nama
            </Text>
            <Text style={{ fontFamily: FONTS.MEDIUM, fontSize: 18 }}>
              Bimomomo
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: width * 0.9,
              marginBottom: 50,
              borderBottomWidth: 2,
              marginTop: 30,
              borderColor: COLORS.EXTRA_LIGHT_GRAY,
              marginHorizontal: 15,
            }}
          >
            <Text
              style={{ fontFamily: FONTS.BOLD, fontSize: 18, marginRight: 35 }}
            >
              Email
            </Text>
            <Text style={{ fontFamily: FONTS.MEDIUM, fontSize: 18 }}>
              Bimomo@mail.com
            </Text>
          </View>
          <View
            style={{
              width: width * 0.92,
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("Home", {})}
            >
              <Text style={styles.buttonText}>LOGOUT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  nameText: {
    fontSize: 20,
    color: COLORS.EXTRA_LIGHT_GRAY,
    fontFamily: FONTS.BOLD,
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
    fontSize: 16,
    fontFamily: FONTS.SEMI_BOLD,
    color: COLORS.EXTRA_LIGHT_GRAY,
  },
  headerImage: {
    height: 135,
    width: 135,
    borderRadius: 100,
    borderWidth: 2,
  },
  header: {
    backgroundColor: COLORS.BASIC_BACKGROUND,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingBottom: 30,
  },
});

export default ProfileScreen;
