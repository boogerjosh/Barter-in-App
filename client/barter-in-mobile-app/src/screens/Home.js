import React, { useEffect, useState } from "react";
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
  Button,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import FONTS from "../constants/Fonts";
import COLORS from "../constants/Colors";
import highlights from "../../data/banner";
import categories from "../../data/categories";
import Highlight from "../components/Highlight";
import Categories from "../components/Categories";
import ItemSpace from "../components/ItemSpace";
const { height, width } = Dimensions.get("screen");
const setWidth = (w) => (width / 100) * w;
const numColumns = 3;
const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      options={{ headerShown: false }}
    >
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
                  marginBottom: 10,
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
                          marginHorizontal: 12,
                          justifyContent: "center",
                          marginBottom: 20,
                        }}
                      >
                        <View
                          style={{
                            position: "absolute",
                            top: 0,
                            backgroundColor: category.backgroundColor,
                            borderRadius: 10,
                            width: width / 3 - 30,
                            height: width / 3 - 30,
                          }}
                        />
                        <View>
                          <Image
                            source={category.image}
                            style={{
                              width: width / 5 - 30,
                              height: width / 5 - 30,
                            }}
                          />
                          <Text
                            style={{
                              textAlign: "center",
                              fontFamily: FONTS.MEDIUM,
                              marginTop: 10,
                              fontSize: 17,
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
    paddingBottom: 20,
  },
  headerImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
    borderColor: COLORS.EXTRA_LIGHT_GRAY,
    borderWidth: 2,
  },
  headerDetails: {
    flexDirection: "row",
  },
  iconWrapper: {
    marginLeft: 10,
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
