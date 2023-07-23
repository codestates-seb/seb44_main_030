import { configureStore } from '@reduxjs/toolkit';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import mapSlice from './map';
import infoSlice from './info';
import selectinfo from './selectinfo';
import scrollReducer from './scroll';
import editDataReducer from './editData';
import toastState from './toastState';
export const store = configureStore({
    reducer: {
        counter: mapSlice,
        info: infoSlice,
        selection: selectinfo,
        scroll: scrollReducer,
        editData: editDataReducer,
        toast: toastState,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
