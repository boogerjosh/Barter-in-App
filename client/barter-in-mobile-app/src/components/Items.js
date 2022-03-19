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

const Items = ({ item }) => {
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
        <ImageBackground
          style={styles.imageContainer}
          imageStyle={{ borderRadius: 12 }}
          source={{ uri: item.Images.imageUrl }}
        >
          {/* <View style={{ ...styles.container }}>
          <Image
            source={{ uri: movie.imgUrl }}
            style={{
              ...styles.container,
              width: 230 * size,
              height: 340 * size,
              borderRadius: 12,
            }}
          />
        </View> */}
        </ImageBackground>
        <View>
          <Text style={styles.itemTitle} numberOfLines={3}>
            {item.title}
          </Text>
          <View style={styles.itemSubtitleContainer}>
            <Text style={styles.itemSubTitle}>
              Purchased on {item.yearOfPurchase}
            </Text>
            <View style={styles.rowAndCenter}>
              <Ionicons
                style={{ marginRight: 5 }}
                name="star"
                size={17}
                color={COLORS.YELLOW}
              />
              {/* <Text style={styles.numberRating}>{movie.rating}</Text> */}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    backgroundColor: COLORS.EXTRA_LIGHT_GRAY,
    width: 160,
    height: 160,
    borderRadius: 8,
    elevation: 3,
    marginTop: 20,
    // marginVertical: 20,
    marginHorizontal: 14,
    // marginLeft: 15,
  },
  itemTitle: {
    color: COLORS.LIGHT_GRAY,
    fontFamily: FONTS.BOLD,
    paddingVertical: 2,
    width: 140,
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

export default Items;
