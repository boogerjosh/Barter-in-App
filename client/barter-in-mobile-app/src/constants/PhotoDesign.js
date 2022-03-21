import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import COLORS from './Colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PhotoDesign = ({
  error,
  onPress = () => {openImageLibrary},
  onFocus = () => { },
  imageUrl,
  ...props
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View style={{ marginBottom: 25 }}>
        <TouchableOpacity
            style={styles.uploadBtnContainer}
          >
            {imageUrl ? (
              <Image
                source={{ uri: imageUrl }}
                style={{ width: '100%', height: '100%' }}
              />
            ) : (
              <Text style={styles.uploadBtn}>Upload Ad Image</Text>
            )}
          </TouchableOpacity>
      {error && (
        <Text style={{marginTop: 7, color: COLORS.PERSIAN_RED, fontSize: 12}}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
   uploadBtnContainer: {
    height: 100,
    width: 100,
    borderRadius: 125 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    overflow: 'hidden',
    marginRight: 15
  },
   uploadBtn: {
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.3,
    fontWeight: 'bold',
  },
});

export default PhotoDesign;