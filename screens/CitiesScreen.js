import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import Weather from '../components/Weather';
import Loader from '../components/Loader';
import { addCity } from '../features/cities/citiesSlice';

const API_KEY = 'APIKEY';

const CitiesScreen = () => {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.cities.cities);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: cityName,
          units: 'metric',
          appid: API_KEY,
        },
      });
      dispatch(addCity(response.data));
    } catch (error) {
      console.error(error);
      alert('Failed to fetch weather data. Please check the city name.');
    } finally {
      setLoading(false);
    }
  };

  const addCityHandler = () => {
    if (city.trim()) {
      fetchWeather(city.trim());
      setCity('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Add City" onPress={addCityHandler} />
      {loading && <Loader />}
      <FlatList
        data={cities}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Weather weather={item} />}
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
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default CitiesScreen;
