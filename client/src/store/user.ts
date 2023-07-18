import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    isLogin: false,
    userId: null,
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLogin = true;
            state.userId = action.payload;
        },
        logout: () => initialState,
    },
});
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;