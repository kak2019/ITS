import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "./useApp";
import {
  RFQStatus,
  allRFQsSelector,
  getAllRFQsAction,
  updateRFQAction,
  isFetchingSelector,
  messageSelector,
  createRFQAction,
} from "../features/rfqs";
import { IRFQGrid } from "../model/rfq";

type RFQOperators = [
  isFetching: RFQStatus,
  allRFQs: IRFQGrid[],
  errorMessage: string,
  getAllRFQs: () => void,
  updateRFQ: (RFQ: IRFQGrid) => void,
  createRFQ: (RFQ: IRFQGrid) => void
];

export const useRFQ = (): Readonly<RFQOperators> => {
  const dispatch = useAppDispatch();
  const isFetching = useAppSelector(isFetchingSelector);
  const errorMessage = useAppSelector(messageSelector);
  const allRFQs = useAppSelector(allRFQsSelector);
  const getAllRFQs = useCallback(() => {
    return dispatch(getAllRFQsAction());
  }, [dispatch]);
  const updateRFQ = useCallback(
    (RFQ: IRFQGrid) => {
      return dispatch(updateRFQAction(RFQ));
    },
    [dispatch]
  );
  const createRFQ = useCallback(
    (RFQ: IRFQGrid) => {
      return dispatch(createRFQAction(RFQ));
    },
    [dispatch]
  );
  return [
    isFetching,
    allRFQs,
    errorMessage,
    getAllRFQs,
    updateRFQ,
    createRFQ,
  ] as const;
};
