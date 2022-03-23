import React, { useState, useEffect } from "react";
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
import MyAddsComp from "../components/MyAddsComp";
import ItemSpace from "../components/ItemSpace";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyAddsScreen = () => {
  const navigation = useNavigation();
  // console.log();
  const [items, setItems] = useState([]);
  const [auth, setAuth] = useState(false);
  // async function getToken() {
  //   try {
  //     await AsyncStorage.removeItem("access_token");
  //     let token = await AsyncStorage.getItem("access_token");
  //     console.log(token, ">>>>>");
  //     if (token) {
  //       setAuth(true);
  //     } else {
  //       navigation.navigate("Login");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const getItems = async () => {
    try {
      const data = await axios.get(
        "https://7cd3-110-138-93-44.ngrok.io/items",
        {
          headers: {
            access_token: await AsyncStorage.getItem("access_token"),
          },
        }
      );
      setItems(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(items);
  // useFocusEffect(() => {
  //   getToken();
  // });

  useEffect(() => {
    getItems();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <View style={styles.headerWrapper}>
          <View style={styles.headerDetails}>
            <Text style={styles.nameText}>My Ads</Text>
          </View>
        </View>
      </View>
      <View>
        <FlatList
          contentContainerStyle={styles.listItem}
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MyAddsComp item={item} />}
          ItemSeparatorComponent={() => <ItemSpace width={10} />}
          ListHeaderComponent={() => <ItemSpace width={10} />}
          ListFooterComponent={() => <ItemSpace width={10} />}
          numColumns={1}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    paddingTop: StatusBar.currentHeight || 25,
    paddingBottom: setWidth(45),
    // paddingBottom: 200,
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
});

export default MyAddsScreen;
