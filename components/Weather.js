import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const Weather = ({ weather }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.city}>{weather.name}</Text>
      <Text style={styles.temp}>{weather.main.temp} °C</Text>
      <Text style={styles.description}>{weather.weather[0].description}</Text>
      <Image
        style={styles.icon}
        source={{ uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png` }}
      />
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
