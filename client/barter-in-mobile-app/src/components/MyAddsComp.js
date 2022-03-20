import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import FONTS from "../constants/Fonts";
import COLORS from "../constants/Colors";
const SPACING = 20;
const ITEM_SIZE = 30;

const MyAddsComp = ({ item }) => {
  // console.log("🚀 ~ file: MyAddsComp.js ~ line 18 ~ MyAddsComp ~ item", item);
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.push("Detail", {
          id: item.id,
        })
      }
    >
      <View style={styles.container}>
        <View style={styles.itemWrapper}>
          <Image
            source={{ uri: item?.Images[0].imageUrl }}
            style={{
              width: 70,
              height: 70,
              borderRadius: 10,
              marginRight: 10,
              borderColor: COLORS.LIGHT_GRAY,
              borderWidth: 1,
            }}
          />
          <View>
            <Text style={styles.itemTitle} numberOfLines={3}>
              {item?.title}
            </Text>
            <Text style={styles.itemSubTitle}>Brand: {item?.brand}</Text>
            <Text style={styles.itemSubTitle}>
              Since : {item?.yearOfPurchase} | Category: {item?.category}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    // width: ITEM_SIZE,
    // height: ITEM_SIZE,
    borderRadius: 70,
    marginRight: 10,
  },
  itemWrapper: {
    flexDirection: "row",
    padding: SPACING,
    marginBottom: SPACING,
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    // borderColor: COLORS.
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  itemTitle: {
    color: COLORS.LIGHT_GRAY,
    fontFamily: FONTS.BOLD,
    fontSize: 22,
    paddingVertical: 2,
    // width: 140,
  },
  itemSubTitle: {
    fontSize: 18,
    fontFamily: FONTS.MEDIUM,
    color: COLORS.LIGHT_GRAY,
  },
  itemSubtitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  // rowAndCenter: {
  //   flexDirection: "row",
  //   alignItems: "center",
  // },
});

export default MyAddsComp;
