import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cities: [],
  favorites: [],
};

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    addCity: (state, action) => {
      state.cities.push(action.payload);
    },
    toggleFavorite: (state, action) => {
      const city = action.payload;
      if (state.favorites.find((fav) => fav.id === city.id)) {
        state.favorites = state.favorites.filter((fav) => fav.id !== city.id);
      } else {
        state.favorites.push(city);
      }
    },
  },
});

export const { addCity, toggleFavorite } = citiesSlice.actions;
export default citiesSlice.reducer;
