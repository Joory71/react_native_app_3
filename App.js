import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import Weather from './components/Weather';
import ImagePickerComponent from './components/ImagePickerComponent';
import ImageWithTags from './components/ImageWithTags';
import Loader from './components/Loader';

const API_KEY = 'APIKEY';

export default function App() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);

      try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: {
            lat: loc.coords.latitude,
            lon: loc.coords.longitude,
            units: 'metric',
            appid: API_KEY,
          },
        });
        setWeather(response.data);
      } catch (error) {
        console.error(error);
        alert('Failed to fetch weather data. Please check your API key.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleImagesPicked = (pickedImages) => {
    setImages([...images, ...pickedImages]);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {weather && <Weather weather={weather} />}
      <ImagePickerComponent onImagesPicked={handleImagesPicked} />
      <View style={styles.imagesContainer}>
        {images.map((image, index) => (
          <ImageWithTags key={index} image={image} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  imagesContainer: {
    width: '100%',
    alignItems: 'center',
  },
});
