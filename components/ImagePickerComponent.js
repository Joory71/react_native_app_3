import React, { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ImagePickerComponent = ({ onImagesPicked }) => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      onImagesPicked(result.assets);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
});

export default ImagePickerComponent;
