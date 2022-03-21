import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FONTS from "../constants/Fonts";
import COLORS from "../constants/Colors";
import categoryAdd from "../../data/categoryAdd";
import CategoryInputCard from "../components/CategoryInputCard";
import ItemSpace from "../components/ItemSpace";
const { height, width } = Dimensions.get("screen");
const setWidth = (w) => (width / 100) * w;

const ChooseCategory = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>   
     <SafeAreaView style={styles.header}>
        <View style={styles.headerWrapper}>
          <View style={styles.headerDetails}>
            <View>
              <Text style={styles.nameText}>Category Name</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <View>
        <FlatList
          data={categoryAdd}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <ItemSpace width={10} />}
          ListHeaderComponent={() => <ItemSpace width={10} />}
          ListFooterComponent={() => <ItemSpace width={10} />}
          renderItem={({ item }) => <CategoryInputCard item={item} />}
          numColumns={2}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  header: {
    backgroundColor: COLORS.BASIC_BACKGROUND,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingBottom: 30,
  },
  headerImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
    borderWidth: 2,
  },
  headerDetails: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    marginLeft: 10,
  },
  nameText: {
    fontSize: 20,
    color: COLORS.EXTRA_LIGHT_GRAY,
    fontFamily: FONTS.BOLD,
  },
  search: {
    marginHorizontal: 20,
    backgroundColor: COLORS.WHITE,
    borderRadius: 20,
    padding: 15,
    marginTop: -25,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      height: 3,
      width: 0,
    },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  searchWrapper: {
    flexDirection: "row",
  },
  searchicon: {
    marginRight: 10,
    color: COLORS.DARK_GREY,
  },
  searchInput: {
    color: COLORS.DARK_GREY,
    fontFamily: FONTS.MEDIUM,
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
  uploadBtnContainer: {
    height: 100,
    width: 100,
    borderRadius: 125 / 2,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
    borderWidth: 1,
    overflow: "hidden",
  },
  uploadBtn: {
    textAlign: "center",
    fontSize: 16,
    opacity: 0.3,
    fontWeight: "bold",
  },
  skip: {
    textAlign: "center",
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    opacity: 0.5,
  },
});

export default ChooseCategory;
