import { createSlice } from '@reduxjs/toolkit';
import {Styles} from "../../Leaflet/VectorGrid";

const initialState = {
  mapType: 'mapbox',
  isMarkerVisible: true,
  visibleFeatures: Object.keys(Styles),
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
    addVisibleFeatures: (state, action)=>{
      state.visibleFeatures.push(action.payload);
    },
    removeVisibleFeatures: (state, action)=>{
      state.visibleFeatures = state.visibleFeatures.filter(feature => feature !== action.payload);
    },
  },
});

export const { changeMapType, changeMarkerVisibility,addVisibleFeatures, removeVisibleFeatures  } = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCounterIsMarkerVisible = (state) => state.counter.isMarkerVisible;
export const selectCounterMapType = (state) => state.counter.mapType;
export const selectCounterVisibleFeatures = (state) => state.counter.visibleFeatures;

export default counterSlice.reducer;
