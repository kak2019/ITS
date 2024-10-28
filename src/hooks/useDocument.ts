import { useCallback } from "react";
import { getDocumentsAction, isFetchingSelector, itemsSelector, messageSelector, readAllFilesSizeAction, updateTitlesAction } from "../features/documents";
import { DocumentsStatus, IFile } from "../model/documents";
import { useAppDispatch, useAppSelector } from "./useApp";


type DocumentOperators = [
    isFetching: DocumentsStatus,
    items: IFile[],
    errorMessage: string,
    readAllFilesSize: () => void,
    updateTitles: (ids: number[]) => void,
    getDocuments: () => void,
];

export const useDocument = (): Readonly<DocumentOperators> => {

    const dispatch = useAppDispatch();
    const isFetching = useAppSelector(isFetchingSelector);
    const errorMessage = useAppSelector(messageSelector);
    const items = useAppSelector(itemsSelector);
    const readAllFilesSize = useCallback(() => {
        return dispatch(readAllFilesSizeAction(items));
    }, [dispatch]);
    const updateTitles = useCallback((ids: number[]) => {
        return dispatch(updateTitlesAction(ids));
    }, [dispatch]);

    const getDocuments = useCallback(() => {
        return dispatch(getDocumentsAction(items));
    }, [dispatch]);
    return [
        isFetching,
        items,
        errorMessage,
        readAllFilesSize,
        updateTitles,
        getDocuments,
    ] as const;
}