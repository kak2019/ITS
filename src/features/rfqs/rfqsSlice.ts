import { IRFQGrid } from "../../model/rfq";

export enum RFQStatus {
  Idle,
  Loading,
  Failed,
}

export interface IRFQState {
  status: RFQStatus;
  message: string;
  AllRFQs: IRFQGrid[];
}
export const initialState: IRFQState = {
  status: RFQStatus.Idle,
  message: "",
  AllRFQs: [],
};
