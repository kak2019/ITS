import { useCallback } from "react";
import {
  allRequisitionsSelector,
  getAllRequisitionsAction,
  isFetchingSelector,
  messageSelector,
  RequisitionStatus,
} from "../features/requisitions";
import { IRequisition } from "../model/requisition";
import { useAppDispatch, useAppSelector } from "./useApp";

type RequisitionOperators = [
  isFetching: RequisitionStatus,
  allRequisitions: IRequisition[],
  errorMessage: string,
  getAllRequisitions: () => void
];

export const useRequisition = (): Readonly<RequisitionOperators> => {
  const dispatch = useAppDispatch();
  const isFetching = useAppSelector(isFetchingSelector);
  const errorMessage = useAppSelector(messageSelector);
  const allRequisitions = useAppSelector(allRequisitionsSelector);
  const getAllRequisitions = useCallback(() => {
    return dispatch(getAllRequisitionsAction());
  }, [dispatch]);
  return [
    isFetching,
    allRequisitions,
    errorMessage,
    getAllRequisitions,
  ] as const;
};
