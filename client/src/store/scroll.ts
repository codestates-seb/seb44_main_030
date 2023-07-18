import { createSlice } from '@reduxjs/toolkit';
const initialState = 0;
const scrollSlice = createSlice({
    name: 'scroll',
    initialState,
    reducers: {
        savePosition: (_, action) => action.payload,
        reset: () => initialState,
    },
});
export const { savePosition, reset } = scrollSlice.actions;
export default scrollSlice.reducer;
