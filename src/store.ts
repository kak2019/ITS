import { configureStore } from "@reduxjs/toolkit";
import { documentsReducer } from "./features/documents";
import { requisitionsReducer } from "./features/requisitions";

const store = configureStore({
  reducer: {
    documents: documentsReducer,
    requisitions: requisitionsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
