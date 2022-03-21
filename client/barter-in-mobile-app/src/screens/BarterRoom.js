import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import MuBarterRoomComp from "../components/MyBarterRoomComp";
import FONTS from "../constants/Fonts";
import COLORS from "../constants/Colors";
const { height, width } = Dimensions.get("screen");
const setWidth = (w) => (width / 100) * w;
import ItemSpace from "../components/ItemSpace";
import axios from "axios";

const BarterRoomScreen = () => {
  const navigation = useNavigation();
  const [roomBarters, setRoomBarters] = useState([]);
  const getRoomBarters = async () => {
    try {
      const data = await axios.get(
        "https://33f9-110-138-93-44.ngrok.io/myRoomBarters"
      );
      setRoomBarters(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRoomBarters();
  }, []);
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <View style={styles.headerWrapper}>
          <View style={styles.headerDetails}>
            <View>
              <Text style={styles.nameText}>My Room Barter</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <View>
        <FlatList
          contentContainerStyle={styles.listItem}
          data={roomBarters}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <ItemSpace width={10} />}
          ListHeaderComponent={() => <ItemSpace width={10} />}
          ListFooterComponent={() => <ItemSpace width={10} />}
          renderItem={({ item }) => <MuBarterRoomComp item={item} />}
          // numColumns={numColumns}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listItem: {
    padding: 10,
    paddingTop: StatusBar.currentHeight || 25,
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

export default BarterRoomScreen;
