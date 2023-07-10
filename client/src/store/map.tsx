import { createSlice } from '@reduxjs/toolkit';

interface MapState {
    mapInstance: naver.maps.Map | null;
}

const initialState: MapState = {
    mapInstance: null,
};

const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setMapInstance: (state, action) => {
            state.mapInstance = action.payload;
        },
    },
});

export default mapSlice.reducer;
export const { setMapInstance } = mapSlice.actions;
