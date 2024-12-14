import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./userSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

// Инференция типов `RootState` и `AppDispatch` на основе созданного хранилища
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;