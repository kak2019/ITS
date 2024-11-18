export enum UserStatus {
  Idle,
  Loading,
  Failed,
}

export interface IUserState {
  status: UserStatus;
  message: string;
  SupplierId: string;
}
export const initialState: IUserState = {
  status: UserStatus.Idle,
  message: "",
  SupplierId: "",
};
