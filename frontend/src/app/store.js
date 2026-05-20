import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/authSlice';
import featuresReducer from '../redux/featuresSlice';

export const store = configureStore({
  reducer: { 
    auth: authReducer,
    features: featuresReducer,
  },
});

export default store;