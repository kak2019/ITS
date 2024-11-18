import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IUserState } from "./usersSlice";

const featureStateSelector = (state: RootState): object => state.users;

export const isFetchingSelector = createSelector(
  featureStateSelector,
  (state: IUserState) => state?.status
);
export const messageSelector = createSelector(
  featureStateSelector,
  (state: IUserState) => state?.message
);
export const supplierIdSelector = createSelector(
  featureStateSelector,
  (state: IUserState) => state?.SupplierId
);
