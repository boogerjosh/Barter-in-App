import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import FONTS from "../constants/Fonts";
import COLORS from "../constants/Colors";
const { height, width } = Dimensions.get("screen");
const setWidth = (w) => (width / 100) * w;
import categoryAdd from "../../data/categoryAdd";
import CategoryInputCard from "../components/CategoryInputCard";
import ItemSpace from "../components/ItemSpace";
const numColumns = 2;
const ChooseCategory = () => {
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView style={styles.header}>
        <View style={styles.headerWrapper}>
          <View style={styles.headerDetails}>
            <View>
              <Text style={styles.nameText}>Choose Item category</Text>
            </View>
          </View>
          <View>
            {/* <Image
              source={require("../../assets/person.jpg")}
              style={styles.headerImage}
            /> */}
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
          numColumns={numColumns}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
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
    // borderColor: COLORS.WHITE,
    borderWidth: 2,
  },
  headerDetails: {
    // flexDirection: "row",
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
});

export default ChooseCategory;
