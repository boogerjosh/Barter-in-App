import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import FONTS from "../constants/Fonts";
import COLORS from "../constants/Colors";
const { height, width } = Dimensions.get("screen");
const setWidth = (w) => (width / 100) * w;

const DetailScreen = () => {
  const [readMore, setReadMore] = useState(false)
  const navigation = useNavigation();
  const controllRead = (value) => {
    setReadMore(value)
  }
  return (
   <View style={styles.container}>
      <ScrollView style={{ width: Dimensions.get("window").width }}>
        <Image
          source={{
            uri: `https://images.tokopedia.net/img/cache/500-square/product-1/2020/7/16/4472846/4472846_67ddfc39-170c-4638-bf49-4d31e8184be8_980_980.jpg`
          }}
          style={{
            height: 250,
            width: "100%",
          }}
        ></Image>
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize:17,
              marginTop: 15,
              marginLeft: 15,
              marginRight: 15,
              borderBottomWidth: 2,
              borderColor: "#C0C0C0",
            }}
          >
            Examplenya ini baju gue deh
          </Text>
        </View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <View style={{flex: 1, height: 4, backgroundColor: COLORS.EXTRA_LIGHT_GRAY}} />
          </View>
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize:17,
              marginTop: 15,
              marginLeft: 15,
              marginRight: 15,
              borderBottomWidth: 2,
              borderColor: "#C0C0C0",
            }}
          >
           Details
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize:17,
              color: "black",
              fontFamily: FONTS.SEMI_BOLD,
              marginTop: 15,
              marginLeft: 15,
            }}
          >
            Brand
          </Text>
          <Text
            style={{
              fontSize:17,
              marginTop: 15,
              marginLeft: 15,
              marginRight: 15,
              borderBottomWidth: 2,
              color: COLORS.GRAY
            }}
          >
            Calvin Klein
          </Text>
        </View>
          <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, marginTop: 10}}>
            <View style={{flex: 1, height: 1, backgroundColor: COLORS.DARK_GREY}} />
          </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize:17,
              color: "black",
              marginTop: 15,
              marginLeft: 15,
              fontFamily: FONTS.SEMI_BOLD,
            }}
          >
            Year
          </Text>
          <Text
            style={{
              fontSize:17,
              marginTop: 15,
              marginLeft: 15,
              marginRight: 15,
              borderBottomWidth: 2,
              color: COLORS.GRAY
            }}
          >
            1990
          </Text>
        </View>
          <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, marginTop: 10}}>
            <View style={{flex: 1, height: 1, backgroundColor: COLORS.DARK_GREY}} />
          </View>
        <View>
          <Text
            style={{
              color: "black",
              fontFamily: FONTS.SEMI_BOLD,
              fontSize: 17,
              marginTop: 15,
              marginLeft: 15,
              marginRight: 15,
            }}
          >
            Description
          </Text>
          { readMore ?  <Text
            style={{
              marginTop: 10,
              fontSize: 17,
              marginBottom: 15,
              marginLeft: 15,
              marginRight: 15,
              borderBottomWidth: 2,
              borderColor: "#C0C0C0",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor,
            neque a fringilla semper, neque massa commodo neque, sed varius
            nulla urna at neque. Vivamus ullamcorper mauris ex, eget consectetur
            elit ultrices at. Etiam massa massa, pellentesque et risus quis,
            suscipit scelerisque tortor. Morbi ac tincidunt ligula, non
            ullamcorper orci. Morbi laoreet turpis sed nisi aliquet, vel
            efficitur sem faucibus. Cras vestibulum iaculis libero sed blandit.
            Nulla quis ex maximus, dapibus nunc eu, pulvinar lacus. Phasellus
            aliquet mattis turpis, vitae faucibus purus sollicitudin ut.
          </Text> :    <Text
            style={{
              marginTop: 10,
              fontSize: 17,
              marginBottom: 10,
              marginLeft: 15,
              marginRight: 15,
              borderBottomWidth: 2,
              borderColor: "#C0C0C0",
            }}
            numberOfLines={3}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor,
            neque a fringilla semper, neque massa commodo neque, sed varius
            nulla urna at neque. Vivamus ullamcorper mauris ex, eget consectetur
            elit ultrices at. Etiam massa massa, pellentesque et risus quis,
            suscipit scelerisque tortor. Morbi ac tincidunt ligula, non
            ullamcorper orci. Morbi laoreet turpis sed nisi aliquet, vel
            efficitur sem faucibus. Cras vestibulum iaculis libero sed blandit.
            Nulla quis ex maximus, dapibus nunc eu, pulvinar lacus. Phasellus
            aliquet mattis turpis, vitae faucibus purus sollicitudin ut.
          </Text> }
          { readMore ? <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginLeft: 15,
            marginRight: 15
          }}>
          <TouchableOpacity
            onPress={() => controllRead(false)}
          >
            <Text
              style={{
                fontSize: 15,
                fontFamily: FONTS.SEMI_BOLD,
                color: "black",
                textAlign: "center",
              }}
            >
              READ LESS
            </Text>
          </TouchableOpacity>
          </View> :   <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginLeft: 15,
            marginRight: 15
          }}>
          <TouchableOpacity
            onPress={() => controllRead(true)}
          >
            <Text
              style={{
                fontSize: 15,
                fontFamily: FONTS.SEMI_BOLD,
                color: "black",
                textAlign: "center",
              }}
            >
              READ MORE
            </Text>
          </TouchableOpacity>
          </View>}
        </View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <View style={{flex: 1, height: 4, backgroundColor: COLORS.EXTRA_LIGHT_GRAY}} />
          </View>
        <View>
          <Text
            style={{
              color: "black",
              fontFamily: FONTS.SEMI_BOLD,
              fontSize: 17,
              marginTop: 12,
              marginLeft: 15,
              marginRight: 15,
              marginBottom: 7
            }}
          >
            Barter Profile
          </Text>
          <View style={{ flexDirection: 'row', marginLeft: 15, marginBottom: 15}}>
            <Image
              source={require("../../assets/person.jpg")}
              style={styles.headerImage}
            />
        <View style={{flexDirection: 'column', justifyContent: 'center'}}>       
          <Text
            style={{
              color: "black",
              fontFamily: FONTS.SEMI_BOLD,
              fontSize: 13,
              marginLeft: 9,
              marginRight: 15,
            }}
          >
              Josua
          </Text>
          <Text
            style={{
              color: "black",
              fontFamily: FONTS.SEMI_BOLD,
              fontSize: 13,
              marginLeft: 9,
              marginRight: 15,
            }}
          >
             test@gmail.com
          </Text>
          </View>
          </View>
        </View>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 0, marginBottom: 15}}>
            <View style={{flex: 1, height: 4, backgroundColor: COLORS.EXTRA_LIGHT_GRAY}} />
          </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.PRIMARY,
              width: 350,
              paddingVertical: 8,
              borderRadius: 10,
              justifyContent: "center",
              marginTop: 4,
            }}
            onPress={() => navigation.navigate("Detail", { id: data.id })}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
                marginVertical: 5,
              }}
            >
              Ajukan Barter
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#2E2EFF",
              width: 350,
              paddingVertical: 8,
              borderRadius: 10,
              justifyContent: "center",
              marginTop: 20,
              marginBottom: 25,
            }}
            onPress={() => navigation.navigate("Detail", { id: data.id })}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
                marginVertical: 5,
              }}
            >
              Chat
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerImage: {
    height: 65,
    width: 65,
    borderRadius: 50,
    borderWidth: 2,
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

export default DetailScreen;
