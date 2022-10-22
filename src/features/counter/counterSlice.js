import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mapType: 'mapbox',
  isMarkerVisible: true
};


export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    changeMapType: (state, action) =>{
      state.mapType = action.payload;
    },
    changeMarkerVisibility: (state) =>{
      state.isMarkerVisible = !state.isMarkerVisible;
    },
  },
});

export const { changeMapType, changeMarkerVisibility,  } = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCounterIsMarkerVisible = (state) => state.counter.isMarkerVisible;
export const selectCounterMapType = (state) => state.counter.mapType;

export default counterSlice.reducer;
