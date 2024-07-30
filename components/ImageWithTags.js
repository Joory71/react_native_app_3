import React, { useState } from 'react';
import { StyleSheet, View, Image, TextInput, Text } from 'react-native';

const ImageWithTags = ({ image }) => {
  const [tags, setTags] = useState('');

  return (
    <View style={styles.container}>
      <Image source={{ uri: image.uri }} style={styles.image} />
      <TextInput
        style={styles.input}
        placeholder="Add tags"
        value={tags}
        onChangeText={setTags}
      />
      {tags.split(',').map((tag, index) => (
        <Text key={index} style={styles.tag}>#{tag.trim()}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
    width: '80%',
    marginVertical: 10,
  },
  tag: {
    color: '#007AFF',
    marginHorizontal: 5,
  },
});

export default ImageWithTags;
