import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from '../services/charactersSlice';

const store = configureStore({
  reducer: {
    characters: charactersReducer,
  },
});

export default store;
