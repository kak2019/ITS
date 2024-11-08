import { IRequisition } from "../../model/requisition";

export enum RequisitionStatus {
  Idle,
  Loading,
  Failed,
}

export interface IRequisitionState {
  status: RequisitionStatus;
  message: string;
  AllRequisitions: IRequisition[];
}
export const initialState: IRequisitionState = {
  status: RequisitionStatus.Idle,
  message: "",
  AllRequisitions: [],
};
