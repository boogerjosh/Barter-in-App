import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import COLORS from "../constants/Colors";
import FONTS from "../constants/Fonts";
import { useNavigation } from "@react-navigation/native";

const Highlight = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.push("Detail")}
    >
      <View>
        <ImageBackground
          style={styles.highlight}
          imageStyle={{
            borderRadius: 12,
            backgroundColor: item.backgroundColor,
            flexDirection: "row",
            alignItems: "flex-end",
          }}
          source={item.image}
        >
          <View>
            <View style={styles.highlightItem}>
              <View style={styles.chipsContainer}>
                <Text style={styles.chips}>{item.chips}</Text>
              </View>

              {/* <Image source={item.image} style={styles.highlightImage} /> */}
            </View>
            <View>
              <Text style={styles.highlightTitle}>{item.title}</Text>
              <Text style={styles.highlightSubtitle}>{item.subtitle}</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  highlight: {
    backgroundColor: COLORS.EXTRA_LIGHT_GRAY,
    width: 230,
    height: 230,
    borderRadius: 12,
    elevation: 5,
    marginVertical: 2,
  },
  highlightItem: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  chipsContainer: {
    backgroundColor: COLORS.PRIMARY_LIGHT,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  chips: {
    color: COLORS.WHITE,
    textTransform: "uppercase",
    fontFamily: FONTS.BOLD,
    fontSize: 12,
  },
  highlightImage: {
    width: 100,
    height: 100,
  },
  highlightTitle: {
    fontFamily: FONTS.BOLD,
    fontSize: 16,
    textTransform: "uppercase",
    color: COLORS.DARK_GREY,
    marginBottom: 5,
  },
  highlightSubtitle: {
    fontFamily: FONTS.REGULAR,
    fontSize: 12,
    color: COLORS.DARK_GREY,
  },
});

export default Highlight;
