import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import Weather from '../components/Weather';
import { toggleFavorite } from '../features/cities/citiesSlice';

const FavoritesScreen = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.cities.favorites);

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Weather weather={item} />
            <TouchableOpacity onPress={() => dispatch(toggleFavorite(item))}>
              <Text style={styles.button}>
                {favorites.find((fav) => fav.id === item.id) ? 'Dislike' : 'Like'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  item: {
    marginBottom: 20,
  },
  button: {
    color: '#007AFF',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default FavoritesScreen;
