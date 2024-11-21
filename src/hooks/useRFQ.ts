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
  getRFQAction,
  newRFQIdSelector,
} from "../features/rfqs";
import { IRFQGrid } from "../model/rfq";

type RFQOperators = [
  isFetching: RFQStatus,
  allRFQs: IRFQGrid[],
  newRFQId: string,
  errorMessage: string,
  getAllRFQs: () => void,
  getRFQ: (rfq: string) => void,
  updateRFQ: (rfq: IRFQGrid) => void,
  createRFQ: (rfq: IRFQGrid) => void
];

export const useRFQ = (): Readonly<RFQOperators> => {
  const dispatch = useAppDispatch();
  const isFetching = useAppSelector(isFetchingSelector);
  const errorMessage = useAppSelector(messageSelector);
  const allRFQs = useAppSelector(allRFQsSelector);
  const newRFQId = useAppSelector(newRFQIdSelector);
  const getAllRFQs = useCallback(() => {
    return dispatch(getAllRFQsAction());
  }, [dispatch]);
  const getRFQ = useCallback(
    (rfqId: string) => {
      return dispatch(getRFQAction(rfqId));
    },
    [dispatch]
  );
  const updateRFQ = useCallback(
    (rfq: IRFQGrid) => {
      return dispatch(updateRFQAction(rfq));
    },
    [dispatch]
  );
  const createRFQ = useCallback(
    (rfq: IRFQGrid) => {
      return dispatch(createRFQAction(rfq));
    },
    [dispatch]
  );
  return [
    isFetching,
    allRFQs,
    newRFQId,
    errorMessage,
    getAllRFQs,
    getRFQ,
    updateRFQ,
    createRFQ,
  ] as const;
};
