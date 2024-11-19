import { IUserRole } from "../../model/user";

export enum UserStatus {
  Idle,
  Loading,
  Failed,
}

export interface IUserState {
  status: UserStatus;
  message: string;
  SupplierId: string;
  AllUserRoles: IUserRole[];
}
export const initialState: IUserState = {
  status: UserStatus.Idle,
  message: "",
  SupplierId: "",
  AllUserRoles: [],
};
