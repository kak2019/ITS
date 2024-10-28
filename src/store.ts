import { configureStore } from "@reduxjs/toolkit";
import { documentsReducer } from "./features/documents";

const store = configureStore({
    reducer: {
        documents: documentsReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;