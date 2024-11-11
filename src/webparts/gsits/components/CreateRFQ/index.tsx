import * as React from 'react';
import { useState, useEffect } from 'react';
import { Stack, TextField, Dropdown, Toggle, DetailsList, DetailsListLayoutMode, DatePicker } from '@fluentui/react';
import './index.css';
import FileUploader from './upload';
import SupplierSelection from './select';


// 多语言翻译对象
const translations = {
    en: {
        title: "New Parts RFQ Creation",
        subtitle: 'Selected Parts',
        search: "Search",
        rfqNo: "RFQ No.",
        status: "Status",
        updatedDate: "Updated Date",
        quoteRecDate: "Quote Rec’d Date",
        submissionDeadline: "Submission Deadline",
        createRFQ: "Create RFQ",
        view: "View",
        rfqQuote: "RFQ & Quote",
    },
    ja: {
        title: "新しい部品価格の申請",
        subtitle: 'Selected Parts',
        search: "検索",
        rfqNo: "RFQ 番号",
        status: "ステータス",
        updatedDate: "更新日",
        quoteRecDate: "見積受領日",
        submissionDeadline: "提出期限",
        createRFQ: "RFQ 作成",
        view: "表示",
        rfqQuote: "RFQ & 見積",
    }
};

const Requisition: React.FC = () => {
    const [language, setLanguage] = useState<'en' | 'ja'>('en');
    const [columnsPerRow, setColumnsPerRow] = useState(5); // 默认每行5列

    // 切换语言
    const toggleLanguage = (): void => {
        setLanguage((prevLang) => (prevLang === 'en' ? 'ja' : 'en'));
    };

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
        { key: 'partNo', name: 'Part No.', fieldName: 'partNo', minWidth: 100 },
        { key: 'qualifier', name: 'Qualifier', fieldName: 'qualifier', minWidth: 50 },
        { key: 'partDescription', name: 'Part Description', fieldName: 'partDescription', minWidth: 100 },
        { key: 'materialUser', name: 'Material User', fieldName: 'materialUser', minWidth: 100 },
        { key: 'reqType', name: 'Req. Type', fieldName: 'reqType', minWidth: 50 },
        { key: 'annualQty', name: 'Annual Qty', fieldName: 'annualQty', minWidth: 80 },
        { key: 'orderQty', name: 'Order Qty', fieldName: 'orderQty', minWidth: 80 },
        { key: 'reqWeekFrom', name: 'Req Week From', fieldName: 'reqWeekFrom', minWidth: 100 },
        { key: 'createdDate', name: 'Created Date', fieldName: 'createdDate', minWidth: 100 },
        { key: 'rfqNo', name: 'RFQ No.', fieldName: 'rfqNo', minWidth: 80 },
        { key: 'reqBuyer', name: 'Req. Buyer', fieldName: 'reqBuyer', minWidth: 80 },
        { key: 'handlerName', name: 'Handler Name', fieldName: 'handlerName', minWidth: 100 },
        { key: 'status', name: 'Status', fieldName: 'status', minWidth: 80 },
    ];

    const items = new Array(10).fill(0).map((_, index) => ({
        key: index,
        partNo: '345678901234...',
        qualifier: '✔',
        partDescription: 'FLY WHEEL',
        materialUser: '2920',
        reqType: 'np',
        annualQty: '999999',
        orderQty: '999999',
        reqWeekFrom: 'yyyymmww',
        createdDate: 'yyyymmww',
        rfqNo: '1234567',
        reqBuyer: 'UDT 0001',
        handlerName: 'UD Taro',
        status: 'RFQ Sent',
    }));

    const dropdownOptions = [
        { key: 'optional', text: 'Optional' },
        { key: 'required', text: 'Required' },
        { key: 'select', text: 'Please Select' },
    ];

    return (
        <Stack className="RFQ" tokens={{ childrenGap: 20, padding: 20 }}>
            <Toggle
                label="Language"
                onText="EN"
                offText="JA"
                onChange={toggleLanguage}
            />
            <h2 className='mainTitle'>{translations[language].title}</h2>
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
           <h3 className="mainTitle noMargin">{translations[language].subtitle}</h3>
            <DetailsList
                className="detailList"
                items={items}
                columns={columns}
                setKey="set"
                layoutMode={DetailsListLayoutMode.fixedColumns}
                // selectionMode={SelectionMode.single}
                
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
                    return <div style={{width: '100%', height: '30px', backgroundColor: '#BDBDBD'}}/>
                }}
                selectionPreservedOnEmptyClick={true}
                ariaLabelForSelectionColumn="Toggle selection"
                ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                checkButtonAriaLabel="select row"
            />
        </Stack>
    );
};

export default Requisition;
