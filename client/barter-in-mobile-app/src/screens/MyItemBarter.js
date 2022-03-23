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
import MyItemComp from "../components/MyItemComp";
import ItemSpace from "../components/ItemSpace";
import axios from "axios";

const MyItemBarter = () => {
  const navigation = useNavigation();

  const [items, setItems] = useState([]);

  const getItems = async () => {
    try {
      const data = await axios.get("https://7cd3-110-138-93-44.ngrok.io/items");
      setItems(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.header}>
        <View style={styles.headerWrapper}>
          <View style={styles.headerDetails}>
            <Text style={styles.nameText}>My Items</Text>
          </View>
        </View>
      </SafeAreaView>
      <View>
        <FlatList
          contentContainerStyle={styles.listItem}
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MyItemComp item={item} />}
          ItemSeparatorComponent={() => <ItemSpace width={10} />}
          ListHeaderComponent={() => <ItemSpace width={10} />}
          ListFooterComponent={() => <ItemSpace width={10} />}
          numColumns={1}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    paddingTop: StatusBar.currentHeight || 25,
    paddingBottom: setWidth(20),
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

export default MyItemBarter;
