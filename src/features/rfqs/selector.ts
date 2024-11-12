import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IRFQState } from "./rfqsSlice";

const featureStateSelector = (state: RootState): object => state.rfqs;

export const isFetchingSelector = createSelector(
  featureStateSelector,
  (state: IRFQState) => state?.status
);
export const messageSelector = createSelector(
  featureStateSelector,
  (state: IRFQState) => state?.message
);
export const allRFQsSelector = createSelector(
  featureStateSelector,
  (state: IRFQState) => state?.AllRFQs
);
