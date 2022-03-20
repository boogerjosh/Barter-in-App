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
    console.log("masuk RoomBarter");
    try {
      const data = await axios.get(
        "https://40eb-110-138-93-44.ngrok.io/myRoomBarters"
      );

      setRoomBarters(data.data);
      // console.log(
      //   "🚀 ~ file: BarterRoom.js ~ line 33 ~ getRoomBarters ~ data.data",
      //   data.data
      // );
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
    // alignItems: "center",
    // justifyContent: "center",
  },
  listItem: {
    padding: 10,
    paddingTop: StatusBar.currentHeight || 42,
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
});

export default BarterRoomScreen;
