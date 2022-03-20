import React, { useState }  from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Keyboard,
  Alert,
  Dimensions,
  TouchableOpacity,
  Image
} from "react-native";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from 'expo-image-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import { StackActions } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import FONTS from "../constants/Fonts";
import COLORS from "../constants/Colors";
import Input from "../constants/Input";
import TextInputDesc from '../constants/TextInputDesc';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../constants/Button";
import Loader from "../constants/Loader";
import axios from 'axios';

const { height, width } = Dimensions.get("screen");
const setWidth = (w) => (width / 100) * w;


const ChooseCategory = () => {
  const options = {
     title: 'Select Image',
      type: 'Library',
      options: {
        maxHeight: 200,
        maxWidth: 200,
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: false
      },
  }
  const navigation = useNavigation();
  const [inputs, setInputs] = React.useState({
    title: '',
    description: '',
    brand: '',
    yearOfPurchase: '',
    // adsImage: ''
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [adsImage, setProfileImage] = useState('');
  // const [progress, setProgress] = useState(0);

  const openGallery = async () => {
    const images = await launchImageLibrary(options);
    console.log(images)
  }

  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }

    if (status === 'granted') {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });
      console.log(response, 'ini image')

      if (!response.cancelled) {
        setProfileImage(response.uri);
        // console.log(adsImage, 'ini gambarrrrr ===========')
      }
    }
  };


  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.title) {
      handleError('Title is required', 'title');
      isValid = false;
    }
    // } else if (inputs.title.length < 15) {
    //   handleError('Min title length of 15', 'title');
    //   isValid = false;
    // } else if (inputs.title.length > 70) {
    //   handleError('Length maximum is 70 characters', 'title');
    //   isValid = false;
    // }

    if (!inputs.description) {
      handleError('Description is required', 'description');
      isValid = false;
    }
    // } else if (inputs.description.length < 20) {
    //   handleError('Min description length of 20', 'description');
    //   isValid = false;
    // } else if (inputs.description.length > 4096) {
    //   handleError('Length maximum is 4096 characters', 'description');
    //   isValid = false;
    // }

    if (!inputs.brand) {
      handleError('Brand is required', 'brand');
      isValid = false;
    }

    if (!inputs.yearOfPurchase) {
      handleError('Year Purchase is required', 'yearOfPurchase');
      isValid = false;
    }

    if (!adsImage) {
      handleError('Image is required', 'adsImage');
      isValid = false;
    }

    if (isValid) {
      addAds();
    }
  };

  const addAds = () => {
    setLoading(true);
    setTimeout(async () => {

      const formData = new FormData();
        
      formData.append('image', {
        // title: inputs.title,
        // description: inputs.description,
        // brand: inputs.brand,
        // yearOfPurchase: inputs.yearOfPurchase,
        uri: Platform.OS === 'android' ? adsImage : adsImage.replace('file://', ''),
        type: 'image/jpg'
      });

      console.log(formData)
      try {
        let data = {
          title: inputs.title,
          description: inputs.description,
          brand: inputs.brand,
          yearOfPurchase: inputs.yearOfPurchase,
        }
        console.log(data)
        const response = await axios.post('https://b117-2001-448a-1061-10b7-4c0-ae07-68ea-205f.ngrok.io/users/items',   data, {
          headers: {
          // Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          access_token: await AsyncStorage.getItem('access_token')
         }})
        setLoading(false);
        console.log(response)
        // navigation.navigate('LoginScreen');
      } catch (error) {
        Alert.alert('Error', 'Something went wrong');
        setLoading(false);
      }
    }, 3000);
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.WHITE, flex: 1}}>
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{paddingTop: 50, paddingHorizontal: 20}}>
        <Text style={{color: COLORS.BLACK, fontSize: 40, fontWeight: 'bold'}}>
          Add Your Ads
        </Text>
        <Text style={{color: COLORS.GRAY, fontSize: 18, marginVertical: 10}}>
          Enter Your Offer to Ads
        </Text>
        <View style={{marginVertical: 20}}>
          <Input
            onChangeText={text => handleOnchange(text, 'title')}
            onFocus={() => handleError(null, 'title')}
            iconName="format-title"
            label="Title"
            placeholder="Enter your title ads"
            error={errors.title}
          />

          <TextInputDesc
            multiline={true}
            numberOfLines={4}
            onChangeText={text => handleOnchange(text, 'description')}
            onFocus={() => handleError(null, 'description')}
            iconName="card-text-outline"
            label="Description"
            placeholder="Enter your description ads"
            error={errors.description}
          />

          <Input
            // keyboardType="numeric"
            onChangeText={text => handleOnchange(text, 'brand')}
            onFocus={() => handleError(null, 'brand')}
            iconName="tshirt-v-outline"
            label="Brand"
            placeholder="Enter your brand ads"
            error={errors.brand}
          />

          <Input
            onChangeText={text => handleOnchange(text, 'yearOfPurchase')}
            onFocus={() => handleError(null, 'yearOfPurchase')}
            iconName="update"
            label="Year Purchase"
            placeholder="Enter your year purchase ads"
            error={errors.yearOfPurchase}
          />
          <View style={{flexDirection: 'row'}}>

          <TouchableOpacity
            // onFocus={() => handleError(null, 'adsImage')}
            onPress={openImageLibrary}
            style={styles.uploadBtnContainer}
          >
            {adsImage ? (
              <Image
                source={{ uri: adsImage }}
                style={{ width: '100%', height: '100%' }}
              />
            ) : (
              <Text style={styles.uploadBtn}>Upload Profile Image</Text>
            )}
          </TouchableOpacity>
          
          {/* <TouchableOpacity
            onPress={openImageLibrary}
            style={styles.uploadBtnContainer}
          >
            {profileImage1 ? (
              <Image
                source={{ uri: profileImage1 }}
                style={{ width: '100%', height: '100%' }}
              />
            ) : (
              <Text style={styles.uploadBtn}>Upload Profile Image</Text>
            )}
          </TouchableOpacity> */}
        
          </View>
          <Text style={styles.skip}>Skip</Text>
          
          {/* {profileImage ? (
            <Text
              onPress={uploadProfileImage}
              style={[
                styles.skip,
                { backgroundColor: 'green', color: 'white', borderRadius: 8 },
              ]}
            >
              Upload
            </Text>
          ) : null} */}

          <Button title="Submit" onPress={validate} />
          {/* <Text
            onPress={() => navigation.navigate('LoginScreen')}
            style={{
              color: COLORS.BLACK,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}>
          </Text> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    overflow: 'hidden',
  },
  uploadBtn: {
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.3,
    fontWeight: 'bold',
  },
  skip: {
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    opacity: 0.5,
  },
});

export default ChooseCategory;
