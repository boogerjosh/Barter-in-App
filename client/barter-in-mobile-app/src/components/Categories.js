import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../constants/Colors";
import FONTS from "../constants/Fonts";
const { height, width } = Dimensions.get("screen");

const setWidth = (w) => (width / 100) * w;
const Categories = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.push("ListItemHome")}
    >
      <View
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
            source={item.image}
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
            {item.title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  // buat push
};

export default Categories;
