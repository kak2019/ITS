import { createSlice } from "@reduxjs/toolkit";
import { FeatureKey } from "../../config/const";
import { initialState, RFQStatus } from "./rfqsSlice";
import { createRFQAction, getAllRFQsAction, updateRFQAction } from "./action";
import { IRFQGrid } from "../../model/rfq";

const rfqsSlice = createSlice({
  name: FeatureKey.RFQS,
  initialState,
  reducers: {
    RFQStatusChanged(state, action) {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllRFQsAction.pending, (state, action) => {
        state.status = RFQStatus.Loading;
      })
      .addCase(getAllRFQsAction.fulfilled, (state, action) => {
        state.status = RFQStatus.Idle;
        state.AllRFQs = [...(action.payload as readonly IRFQGrid[])];
      })
      .addCase(getAllRFQsAction.rejected, (state, action) => {
        state.status = RFQStatus.Failed;
        state.message = action.error?.message || "";
      })
      .addCase(updateRFQAction.pending, (state, action) => {
        state.status = RFQStatus.Loading;
      })
      .addCase(updateRFQAction.fulfilled, (state, action) => {
        state.status = RFQStatus.Idle;
      })
      .addCase(updateRFQAction.rejected, (state, action) => {
        state.status = RFQStatus.Failed;
        state.message = action.error?.message || "";
      })
      .addCase(createRFQAction.pending, (state, action) => {
        state.status = RFQStatus.Loading;
      })
      .addCase(createRFQAction.fulfilled, (state, action) => {
        state.status = RFQStatus.Idle;
      })
      .addCase(createRFQAction.rejected, (state, action) => {
        state.status = RFQStatus.Failed;
        state.message = action.error?.message || "";
      });
  },
});
export const { RFQStatusChanged } = rfqsSlice.actions;
export const rfqsReducer = rfqsSlice.reducer;
