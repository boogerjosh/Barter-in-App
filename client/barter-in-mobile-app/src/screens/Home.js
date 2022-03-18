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
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import FONTS from "../constants/Fonts";
import COLORS from "../constants/Colors";
import highlights from "../../data/banner";
import categories from "../../data/categories";
import Highlight from "../components/Highlight";
import ItemSpace from "../components/ItemSpace";
const { height, width } = Dimensions.get("screen");
const setWidth = (w) => (width / 100) * w;

const HomeScreen = () => {
  console.log(categories);
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar
        style="auto"
        translucent={false}
        backgroundColor={COLORS.EXTRA_LIGHT_GRAY}
      />
      <SafeAreaView style={styles.header}>
        <View style={styles.headerWrapper}>
          <View style={styles.headerDetails}>
            <View>
              <Text style={styles.nameText}>Your Name</Text>
            </View>
            <View style={styles.iconWrapper}>
              <FontAwesome5 name="award" size={24} color="gold" />
            </View>
          </View>
          <View>
            <Image
              source={require("../../assets/person.jpg")}
              style={styles.headerImage}
            />
          </View>
        </View>
      </SafeAreaView>
      {/* Search Bar */}
      <View style={styles.search}>
        <View style={styles.searchWrapper}>
          <FontAwesome5
            name="search"
            size={20}
            color="black"
            style={styles.searchicon}
          />
          <TextInput placeholder="Search Item" style={styles.searchInput} />
        </View>
      </View>
      <View style={styles.highlightWrapper}>
        <FlatList
          data={highlights}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Highlight item={item} />}
          horizontal
          ItemSeparatorComponent={() => <ItemSpace width={20} />}
          ListHeaderComponent={() => <ItemSpace width={20} />}
          ListFooterComponent={() => <ItemSpace width={20} />}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.categoryWrapper}>
        <View style={styles.category}>
          <View>
            <Text style={styles.categoryTitle}>Categories</Text>
          </View>
          <View>
            <Text style={styles.categorySubtitle}>See all</Text>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          {categories.map((chunk, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                {chunk.map((category) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => navigation.push("ListItemHome")}
                    >
                      <View
                        key={category.id}
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
                            source={category.image}
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
                            {category.title}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })}
        </View>
      </View>
      {/* <View style={styles.container}>
        <StatusBar style="auto" />
        <Text>Ini Home Page</Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => navigation.push("ListItemHome")}
        >
          <Text style={styles.buttonText}>List Item</Text>
        </TouchableOpacity>
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: COLORS.WHITE,
    // alignItems: "center",
    // justifyContent: "center",
  },
  header: {
    backgroundColor: COLORS.BASIC_BACKGROUND,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
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
    flexDirection: "row",
  },
  iconWrapper: {
    marginLeft: 10,
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
  highlightWrapper: {
    marginTop: 20,
  },
  categoryWrapper: {
    paddingHorizontal: 20,
    marginTop: 20,
    flex: 1,
  },
  category: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  categoryTitle: {
    fontFamily: FONTS.MEDIUM,
    fontSize: 18,
    color: COLORS.DARK_GREY,
  },
  categorySubtitle: {
    fontFamily: FONTS.REGULAR,
    fontSize: 14,
    color: COLORS.DARK_GREY,
    textDecorationLine: "underline",
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
  nameText: {
    fontSize: 20,
    color: COLORS.EXTRA_LIGHT_GRAY,
    fontFamily: FONTS.BOLD,
  },
  buttonText: {
    fontSize: 14,
    color: COLORS.DARK_GREY,
    fontFamily: FONTS.BOLD,
  },
});

export default HomeScreen;
