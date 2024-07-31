import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../features/cities/citiesSlice';
import Icon from 'react-native-vector-icons/Ionicons';

const Weather = ({ weather }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.cities.favorites);
  const isFavorite = favorites.find((fav) => fav.id === weather.id);

  return (
    <View style={styles.container}>
      <Text style={styles.city}>{weather.name}</Text>
      <Text style={styles.temp}>{weather.main.temp} °C</Text>
      <Text style={styles.description}>{weather.weather[0].description}</Text>
      <Image
        style={styles.icon}
        source={{ uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png` }}
      />
      <TouchableOpacity onPress={() => dispatch(toggleFavorite(weather))}>
        <Icon name={isFavorite ? 'heart' : 'heart-outline'} size={24} color={isFavorite ? 'red' : 'gray'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 20,
  },
  description: {
    fontSize: 16,
  },
  icon: {
    width: 50,
    height: 50,
  },
});

export default Weather;
