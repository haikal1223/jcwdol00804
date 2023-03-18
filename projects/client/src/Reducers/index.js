import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './user';

export const globalStore = configureStore({
    // memasukkan reducer yg dibutuhkan
    reducer: {
        userReducer
    }
});