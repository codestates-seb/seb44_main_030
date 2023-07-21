import { createSlice } from '@reduxjs/toolkit';

interface ToastState {
    toastInstance: boolean;
}

const initialState: ToastState = {
    toastInstance: false,
};

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        setToast: (state, action) => {
            state.toastInstance = action.payload;
        },
    },
});

export default toastSlice.reducer;
export const { setToast } = toastSlice.actions;
