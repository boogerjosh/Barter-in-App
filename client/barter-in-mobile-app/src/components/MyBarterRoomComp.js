import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
const { height, width } = Dimensions.get("screen");
const setWidth = (w) => (width / 100) * w;
import FONTS from "../constants/Fonts";
import COLORS from "../constants/Colors";
const SPACING = 20;
const ITEM_SIZE = 30;

const MuBarterRoomComp = ({ item }) => {
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
          <View style={styles.roomBarterCard}>
            <Text style={styles.user1}>{item?.user1.name} Item</Text>
            <View style={styles.item1}>
              <Image
                source={{ uri: item?.item1.Images[0].imageUrl }}
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
                  {item?.item1.title}
                </Text>
                <Text style={styles.itemSubTitle}>
                  Brand: {item?.item1.brand}
                </Text>
                <Text style={styles.itemSubTitle}>
                  Since : {item?.item1.yearOfPurchase} | Category:{" "}
                  {item?.item1.category}
                </Text>
              </View>
            </View>
            {/* batas */}
            <Text style={styles.user2}>{item?.user2.name} Item</Text>
            <View style={styles.item2}>
              <Image
                source={{ uri: item?.item2.Images[0].imageUrl }}
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
                  {item?.item2.title}
                </Text>
                <Text style={styles.itemSubTitle}>
                  Brand: {item?.item2.brand}
                </Text>
                <Text style={styles.itemSubTitle}>
                  Since : {item?.item2.yearOfPurchase} | Category:{" "}
                  {item?.item2.category}
                </Text>
              </View>
            </View>
            <View style={styles.containerButton}>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={() => navigation.navigate("Home", {})}
              >
                <Text style={styles.buttonText}>CONFIRM</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={() => navigation.push("ChatRoom", {})}
              >
                <Text style={styles.buttonText}>CHAT</Text>
              </TouchableOpacity>
            </View>
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
  roomBarterCard: {
    flexDirection: "column",
  },
  user1: {
    color: COLORS.DARK_GREY,
    fontFamily: FONTS.BOLD,
    fontSize: 22,
    paddingVertical: 2,
  },
  user2: {
    color: COLORS.DARK_GREY,
    fontFamily: FONTS.BOLD,
    fontSize: 22,
    paddingBottom: 2,
  },
  item1: {
    flexDirection: "row",
    padding: 10,
    marginBottom: 10,
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    borderColor: COLORS.LIGHT_GRAY,
    borderWidth: 1,
  },
  item2: {
    flexDirection: "row",
    padding: 10,
    marginBottom: 10,
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    borderColor: COLORS.LIGHT_GRAY,
    borderWidth: 1,
  },
  itemWrapper: {
    flexDirection: "column",
    padding: 10,
    marginBottom: SPACING,
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    borderColor: COLORS.LIGHT_GRAY,
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
  containerButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: 60,
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
    color: COLORS.EXTRA_LIGHT_GRAY,
    fontFamily: FONTS.BOLD,
  },
  // rowAndCenter: {
  //   flexDirection: "row",
  //   alignItems: "center",
  // },
});

export default MuBarterRoomComp;
