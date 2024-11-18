import { createSlice } from "@reduxjs/toolkit";
import { FeatureKey } from "../../config/const";
import { initialState, UserStatus } from "./usersSlice";
import { getSupplierIdByUserEmailAction } from "./action";

const usersSlice = createSlice({
  name: FeatureKey.USERS,
  initialState,
  reducers: {
    UserStatusChanged(state, action) {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSupplierIdByUserEmailAction.pending, (state, action) => {
        state.status = UserStatus.Loading;
      })
      .addCase(getSupplierIdByUserEmailAction.fulfilled, (state, action) => {
        state.status = UserStatus.Idle;
        state.SupplierId = action.payload as string;
      })
      .addCase(getSupplierIdByUserEmailAction.rejected, (state, action) => {
        state.status = UserStatus.Failed;
        state.message = action.error?.message || "";
      });
  },
});
export const { UserStatusChanged } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
