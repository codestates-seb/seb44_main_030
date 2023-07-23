import { createSlice } from '@reduxjs/toolkit';

interface ToastState {
    toastInstance: boolean;
    toastMessage: string | null;
}

const initialState: ToastState = {
    toastInstance: false,
    toastMessage: null,
};

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        setToast: (state, action) => {
            state.toastInstance = true;
            state.toastMessage = action.payload;
        },
        clearToast: (state) => {
            state.toastInstance = false;
            state.toastMessage = null;
        },
    },
});

export default toastSlice.reducer;
export const { setToast, clearToast } = toastSlice.actions;
