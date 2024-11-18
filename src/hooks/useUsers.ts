import { useCallback } from "react";
import {
  getSupplierIdByUserEmailAction,
  isFetchingSelector,
  messageSelector,
  supplierIdSelector,
  UserStatus,
} from "../features/users";
import { useAppDispatch, useAppSelector } from "./useApp";

type RequisitionOperators = [
  isFetching: UserStatus,
  supplierId: string,
  errorMessage: string,
  getSupplierId: (email: string) => void
];

export const useRequisition = (): Readonly<RequisitionOperators> => {
  const dispatch = useAppDispatch();
  const isFetching = useAppSelector(isFetchingSelector);
  const errorMessage = useAppSelector(messageSelector);
  const supplierId = useAppSelector(supplierIdSelector);
  const getSupplierId = useCallback(
    (email: string) => {
      return dispatch(getSupplierIdByUserEmailAction(email));
    },
    [dispatch]
  );
  return [isFetching, supplierId, errorMessage, getSupplierId] as const;
};
