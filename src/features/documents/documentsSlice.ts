import { DocumentsStatus, IFile } from "../../model/documents";

export interface IDocumentsState {
    status: DocumentsStatus;
    message: string;
    items: IFile[];
}
export const initialState: IDocumentsState = {
    status: DocumentsStatus.Idle,
    message: "",
    items: [],
}