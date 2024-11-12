import { configureStore } from "@reduxjs/toolkit";
import { documentsReducer } from "./features/documents";
import { requisitionsReducer } from "./features/requisitions";
import { rfqsReducer } from "./features/rfqs/reducer";

const store = configureStore({
  reducer: {
    documents: documentsReducer,
    requisitions: requisitionsReducer,
    rfqs: rfqsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
