import { createSlice } from '@reduxjs/toolkit';
import { Info } from '../types/info';

interface InfoState {
    infoInstance: Info[] | null;
}

const initialState: InfoState = {
    infoInstance: null,
};

const InfoSlice = createSlice({
    name: 'info',
    initialState,
    reducers: {
        setInfoInstance: (state, action) => {
            state.infoInstance = action.payload;
        },
    },
});

export default InfoSlice.reducer;
export const { setInfoInstance } = InfoSlice.actions;
