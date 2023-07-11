import { createSlice } from '@reduxjs/toolkit';
import { Info } from '../types/info';

interface InitialState {
    selection: null | Info;
}

const initialState: InitialState = {
    selection: null,
};

const SelectionSlice = createSlice({
    name: 'info',
    initialState,
    reducers: {
        setSelectionInstance: (state, action) => {
            state.selection = action.payload;
        },
    },
});

export default SelectionSlice.reducer;
export const { setSelectionInstance } = SelectionSlice.actions;
