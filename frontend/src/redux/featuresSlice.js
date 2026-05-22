import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedFeatures: [], // Array of string IDs: e.g., ['crm', 'email_marketing']
};

const featuresSlice = createSlice({
  name: 'features',
  initialState,
  reducers: {
    setFeatures: (state, action) => {
      state.selectedFeatures = action.payload;
    },
    clearFeatures: (state) => {
      state.selectedFeatures = [];
    }
  },
});

export const { setFeatures, clearFeatures } = featuresSlice.actions;
export default featuresSlice.reducer;