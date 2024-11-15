import * as React from 'react';
import { useState, useEffect } from 'react';
import { Stack, TextField, Dropdown, DetailsList, DetailsListLayoutMode, DatePicker, SelectionMode } from '@fluentui/react';
import './index.css';
import FileUploader from './upload';
import SupplierSelection from './select';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';



const Requisition: React.FC = () => {
    const { t } = useTranslation(); // 使用 i18next 进行翻译
    const [columnsPerRow, setColumnsPerRow] = useState(5); // 默认每行5列
    const location = useLocation()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const state:any = location.state
    console.log(state)
    // 根据屏幕宽度调整列数
    useEffect(() => {
        const handleResize = (): void => {
            const width = window.innerWidth;
            if (width > 1200) setColumnsPerRow(5.5);
            else if (width > 800) setColumnsPerRow(3);
            else setColumnsPerRow(2);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const itemWidth = `calc(${100 / columnsPerRow}% - ${(columnsPerRow - 1) * 10 / columnsPerRow}px)`;

    const columns = [
        { key: 'PartNumber', name: t('Part No.'), fieldName: 'PartNumber', minWidth: 100 },
        { key: 'Qualifier', name: t('Qualifier'), fieldName: 'Qualifier', minWidth: 50 },
        { key: 'PartDescription', name: t('Part Description'), fieldName: 'PartDescription', minWidth: 100 },
        { key: 'MaterialUser', name: t('Material User'), fieldName: 'MaterialUser', minWidth: 100 },
        { key: 'RequisitionType', name: t('Req. Type'), fieldName: 'RequisitionType', minWidth: 100 },
        { key: 'AnnualQty', name: t('Annual Qty'), fieldName: 'AnnualQty', minWidth: 80 },
        { key: 'OrderQty', name: t('Order Qty'), fieldName: 'OrderQty', minWidth: 80 },
        { key: 'RequiredWeek', name: t('Req Week From'), fieldName: 'RequiredWeek', minWidth: 100 },
        { key: 'CreateDate', name: t('Created Date'), fieldName: 'CreateDate', minWidth: 100 },
        { key: 'RfqNo', name: t('RFQ No.'), fieldName: 'RfqNo', minWidth: 80 },
        { key: 'ReqBuyer', name: t('Req. Buyer'), fieldName: 'ReqBuyer', minWidth: 80 },
        { key: 'HandlerName', name: t('Handler Name'), fieldName: 'HandlerName', minWidth: 100 },
        { key: 'Status', name: t('Status'), fieldName: 'Status', minWidth: 80 },
    ];

    // const items = new Array(10).fill(0).map((_, index) => ({
    //     key: index,
    //     partNo: '345678901234...',
    //     qualifier: '✔',
    //     partDescription: 'FLY WHEEL',
    //     materialUser: '2920',
    //     reqType: 'np',
    //     annualQty: '999999',
    //     orderQty: '999999',
    //     reqWeekFrom: 'yyyymmww',
    //     createdDate: 'yyyymmww',
    //     rfqNo: '1234567',
    //     reqBuyer: 'UDT 0001',
    //     handlerName: 'UD Taro',
    //     status: 'RFQ Sent',
    // }));

    const dropdownOptions = [
        { key: 'optional', text: 'Optional' },
        { key: 'required', text: 'Required' },
        { key: 'select', text: 'Please Select' },
    ];

    return (
        <Stack className="RFQ" tokens={{ childrenGap: 20, padding: 20 }}>
            <h2 className='mainTitle'>{t("New Parts RFQ Creation")}</h2>
            <Stack className='noMargin' horizontal tokens={{ childrenGap: 30, padding: 20 }} styles={{ root: { backgroundColor: '#CCEEFF', borderRadius: '4px',marginBottom: '5px', alignItems: 'flex-start' } }} >
                <Stack horizontal wrap tokens={{ childrenGap: 10 }} verticalAlign="start" styles={{ root: { width: '50%' } }}>
                    {/* 控制每个 Stack.Item 的宽度 */}
                    <Stack.Item grow styles={{ root: { flexBasis: '40%', width: '50%' } }}>
                        <TextField label="Parma" placeholder="Entered text" style={{width: '100%' }}/>
                    </Stack.Item>
                    <Stack.Item grow styles={{ root: { flexBasis: '40%', width: '50%',alignSelf: 'flex-end' } }}>
                        Nelson(Changzhou) Tubing Co,Ltd
                    </Stack.Item>
                    <Stack.Item grow styles={{ root: { flexBasis: '40%', maxWidth: '50%' } }}>
                        <DatePicker label="RFQ Due Date" placeholder="yymmww" />
                    </Stack.Item>
                    <Stack.Item grow styles={{ root: { flexBasis: '40%', maxWidth: '50%' } }}>
                        <Dropdown label="Order Type" placeholder="Please Select" multiSelect options={dropdownOptions} style={{width:Number(itemWidth)-30}}/>
                    </Stack.Item>
                    <Stack styles={{ root: { width: '100%' } }}>
                        <FileUploader title="Add RFQ Attachments" initalNum={4} />
                    </Stack>
                </Stack>
                <Stack horizontal wrap tokens={{ childrenGap: 10 }} verticalAlign="start" styles={{ root: { width: '50%' } }}>
                    {/* 控制每个 Stack.Item 的宽度 */}
                    <Stack grow styles={{ root: { width: '100%'} }}>
                        <SupplierSelection />
                    </Stack>
                    <Stack.Item grow styles={{ root: {  flexBasis: '100%', maxWidth: '100%' } }}>
                        <TextField label="Buyer" placeholder="Optional" multiline rows={3} style={{width: '100%'}}/>
                    </Stack.Item>
                </Stack>
            </Stack>

           {/* 表格和按钮区域 */}
           <h3 className="mainTitle noMargin">{t("Selected Parts")}</h3>
            <DetailsList
                className="detailList"
                items={state.selectedItems}
                columns={columns}
                setKey="set"
                layoutMode={DetailsListLayoutMode.fixedColumns}
                selectionMode={SelectionMode.none} // 取消单选和多选
                
                styles={{ 
                    root: { backgroundColor: '#FFFFFF', border: '1px solid #ddd', borderRadius: '4px' },
                    headerWrapper: { backgroundColor: "#AFAFAF", selectors: {
                        '.ms-DetailsHeader': {
                            backgroundColor: '#BDBDBD',
                            fontWeight: 600,
                        },
                    } }
                 }}
                viewport={{
                    height: 0,
                    width: 0
                }}
                onRenderDetailsFooter={() => {
                    const el = document.getElementsByClassName('ms-DetailsHeader')[0]
                    const width = el && el.clientWidth || '100%'
                    return (
                    <div style={{width: width, height: '30px', backgroundColor: '#BDBDBD'}} />
                )}}
                selectionPreservedOnEmptyClick={true}
                ariaLabelForSelectionColumn="Toggle selection"
                ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                checkButtonAriaLabel="select row"
            />
        </Stack>
    );
};

export default Requisition;
