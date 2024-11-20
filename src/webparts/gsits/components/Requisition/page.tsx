import * as React from 'react';
import { PrimaryButton } from '@fluentui/react';
// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-function-return-type
const Pagination = ({ totalItems, pageSize, currentPage, onPageChange }: any) => {
    const totalPages = Math.ceil(totalItems / pageSize);

    const changePage = (pageNumber: number):void => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            onPageChange(pageNumber);
        }
    };

    return (
        <div style={{paddingLeft: '10px', display: 'flex', alignItems: 'center', height: '100%'}}>
            <PrimaryButton style={{minHeight: '24px', borderRadius: '5px', padding: '0 10px'}} onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>Previous</PrimaryButton>
            <span style={{display: 'inline-block', margin: '0 5px'}}> {currentPage} / {totalPages} </span>
            <PrimaryButton style={{minHeight: '24px', borderRadius: '5px', padding: '0 10px'}} onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>Next</PrimaryButton>
        </div>
    );
};

export default Pagination