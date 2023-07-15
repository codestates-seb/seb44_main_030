import { configureStore } from '@reduxjs/toolkit';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import mapSlice from './map';
import infoSlice from './info';
import selectinfo from './selectinfo';
import scrollReducer from './scroll';
export const store = configureStore({
    reducer: {
        counter: mapSlice,
        info: infoSlice,
        selection: selectinfo,
        scroll: scrollReducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

