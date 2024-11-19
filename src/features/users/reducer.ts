import { createSlice } from "@reduxjs/toolkit";
import { FeatureKey } from "../../config/const";
import { initialState, UserStatus } from "./usersSlice";
import { getSupplierIdByUserEmailAction, getUserRoleAction } from "./action";
import { IUserRole } from "../../model/user";

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
      })
      .addCase(getUserRoleAction.pending, (state, action) => {
        state.status = UserStatus.Loading;
      })
      .addCase(getUserRoleAction.fulfilled, (state, action) => {
        state.status = UserStatus.Idle;
        state.AllUserRoles = [...action.payload] as IUserRole[];
      })
      .addCase(getUserRoleAction.rejected, (state, action) => {
        state.status = UserStatus.Failed;
        state.message = action.error?.message || "";
      });
  },
});
export const { UserStatusChanged } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
