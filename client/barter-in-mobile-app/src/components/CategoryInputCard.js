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
import categories from "../../data/categories";
import FONTS from "../constants/Fonts";
import COLORS from "../constants/Colors";

const CategoryInputCard = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.push("Detail")}
    >
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageContainer}
          imageStyle={{
            borderRadius: 12,
            backgroundColor: item.backgroundColor,
            flexDirection: "row",
            alignItems: "flex-end",
          }}
          // source={item.image}
        >
          <Image
            source={item.image}
            style={{
              width: 40,
              height: 40,
            }}
          />
          {/* <View>
            <View style={styles.highlightItem}>
              <View style={styles.chipsContainer}>
                <Text style={styles.chips}>{item.chips}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.highlightTitle}>{item.title}</Text>
            </View>
          </View> */}

          <Text style={styles.itemTitle} numberOfLines={3}>
            {item.title}
          </Text>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    backgroundColor: COLORS.EXTRA_LIGHT_GRAY,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 160,
    height: 160,
    borderRadius: 8,
    elevation: 3,
    marginTop: 20,
    marginBottom: 10,
    // marginVertical: 20,
    marginHorizontal: 14,
    // marginLeft: 15,
  },
  itemTitle: {
    color: COLORS.DARK_GREY,
    fontFamily: FONTS.BOLD,
    fontSize: 20,
    paddingVertical: 2,
    width: 140,
    textAlign: "center",
  },
  itemSubTitle: {
    fontSize: 14,
    fontFamily: FONTS.MEDIUM,
    color: COLORS.LIGHT_GRAY,
  },
  itemSubtitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowAndCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CategoryInputCard;
