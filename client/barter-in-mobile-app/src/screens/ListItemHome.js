import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ItemSpace from "../components/ItemSpace";
import FONTS from "../constants/Fonts";
import COLORS from "../constants/Colors";
import Items from "../components/Items";
// import items from "../../data/items";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useQuery } from "@apollo/client";
import { GET_ITEMS } from "../../lib/apollo/queries/items";

const { width } = Dimensions.get("screen");
const setWidth = (w) => (width / 100) * w;
const numColumns = 2;

const ListItemHomeScreen = ({ route }) => {
  const navigation = useNavigation();
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState("");
  const [id, setId] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  //graphql

  const { loading, error, data } = useQuery(GET_ITEMS, {
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
    variables: {
      search: {
        filterByCategory: route.params.item.title,
        filterByTitle: searchTitle,
      },
      getItemsId: id,
    },
  });

  let items;
  if (data) {
    items = data?.getItems;
  }

  async function getToken() {
    try {
      let newToken = await AsyncStorage.getItem("access_token");
      let newId = await AsyncStorage.getItem("id");
      if (newToken) {
        setToken(newToken);
        setAuth(true);
        setId(newId);
      } else {
        navigation.navigate("Login");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      getToken();
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.header}>
        <View style={styles.headerWrapper}>
          <View style={styles.headerDetails}>
            <Text style={styles.nameText}>Category Name</Text>
          </View>
        </View>
      </SafeAreaView>
      <View style={styles.search}>
        <View style={styles.searchWrapper}>
          <FontAwesome5
            name="search"
            size={20}
            color="black"
            style={styles.searchicon}
          />

          <TextInput
            placeholder="Search Item"
            style={styles.searchInput}
            onChangeText={setSearchTitle}
            value={searchTitle}
          />
        </View>
      </View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Items item={item} />}
        ItemSeparatorComponent={() => <ItemSpace width={10} />}
        ListHeaderComponent={() => <ItemSpace width={10} />}
        ListFooterComponent={() => <ItemSpace width={10} />}
        numColumns={numColumns}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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

export default ListItemHomeScreen;
