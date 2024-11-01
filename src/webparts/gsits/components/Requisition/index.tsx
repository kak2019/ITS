import * as React from 'react';
import { useState, useEffect } from 'react';
import { Stack, TextField, Dropdown, Toggle, PrimaryButton, DefaultButton, DetailsList, DetailsListLayoutMode, SelectionMode, Icon, Label, Checkbox, DatePicker } from '@fluentui/react';
import './index.css';

// 多语言翻译对象
const translations = {
    en: {
        title: "Requisition for New Part Price",
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
    const [isSearchVisible, setIsSearchVisible] = useState(true); // 控制搜索区域显示/隐藏
    const [columnsPerRow, setColumnsPerRow] = useState(5); // 默认每行5列

    // 切换语言
    const toggleLanguage = (): void => {
        setLanguage((prevLang) => (prevLang === 'en' ? 'ja' : 'en'));
    };

    // 切换搜索区域的显示状态
    const toggleSearchVisibility = (): void => {
        setIsSearchVisible(!isSearchVisible);
    };

    // 根据屏幕宽度调整列数
    useEffect(() => {
        const handleResize = ():void => {
            const width = window.innerWidth;
            if (width > 1200) setColumnsPerRow(5);
            else if (width > 800) setColumnsPerRow(3);
            else setColumnsPerRow(2);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const itemWidth = `${100 / columnsPerRow}%`;

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
        <Stack tokens={{ childrenGap: 20, padding: 20 }}>
            <Toggle
                label="Language"
                onText="EN"
                offText="JA"
                onChange={toggleLanguage}
            />
            <h2 className='mainTitle'>{translations[language].title}</h2>

            {/* 搜索区域标题和切换图标 */}
            <Stack 
                horizontal
                verticalAlign="center"
                tokens={{ childrenGap: 10 }}
                styles={{
                    root: {
                        backgroundColor: '#F3F2F1',
                        padding: '10px 20px',
                        borderLeft: '4px solid #99CCFF',
                        cursor: 'pointer',
                        marginBottom: 0,
                    }
                }}
                onClick={toggleSearchVisibility}
            >
                <Icon iconName={isSearchVisible ? "ChevronDown" : "ChevronRight"} style={{ fontSize: 16 }} />
                <Label styles={{ root: { fontWeight: 'bold' } }}>{translations[language].search}</Label>
            </Stack>

            {/* 搜索区域 */}
            {isSearchVisible && (
                <Stack tokens={{ childrenGap: 10, padding: 20 }} styles={{ root: { backgroundColor: '#E0F0FF', borderRadius: '4px' } }}>
                    <Stack horizontal wrap tokens={{ childrenGap: 10 }} verticalAlign="start">
                        {/* 控制每个 Stack.Item 的宽度 */}
                        <Stack.Item grow styles={{ root: { minWidth: itemWidth, maxWidth: itemWidth } }}>
                            <Dropdown label="Requisition Type" placeholder="Please Select" options={dropdownOptions} />
                        </Stack.Item>
                        <Stack.Item grow styles={{ root: { minWidth: itemWidth, maxWidth: itemWidth } }}>
                            <TextField label="Buyer" placeholder="Entered text" />
                        </Stack.Item>
                        <Stack.Item grow styles={{ root: { minWidth: itemWidth, maxWidth: itemWidth } }}>
                            <TextField label="Parma" placeholder="Placeholder text" />
                        </Stack.Item>
                        <Stack.Item grow styles={{ root: { minWidth: itemWidth, maxWidth: itemWidth } }}>
                            <TextField label="Section" placeholder="Placeholder text" />
                        </Stack.Item>
                        <Stack.Item grow styles={{ root: { minWidth: itemWidth, maxWidth: itemWidth } }}>
                            <Dropdown label="Status" placeholder="Optional" options={dropdownOptions} />
                        </Stack.Item>

                        {/* 第二行 */}
                        <Stack.Item grow styles={{ root: { minWidth: itemWidth, maxWidth: itemWidth } }}>
                            <TextField label="Part Number" placeholder="Placeholder text" />
                        </Stack.Item>
                        <Stack.Item grow styles={{ root: { minWidth: itemWidth, maxWidth: itemWidth } }}>
                            <Checkbox label="Qualifier" styles={{ root: { marginTop: 28, backgroundColor: "white", height: "30px" } }} />
                        </Stack.Item>
                        <Stack.Item grow styles={{ root: { minWidth: itemWidth, maxWidth: itemWidth } }}>
                            <TextField label="Project" placeholder="Placeholder text" />
                        </Stack.Item>
                        <Stack.Item grow styles={{ root: { minWidth: itemWidth, maxWidth: itemWidth } }}>
                            <Dropdown label="Material User" placeholder="Optional" options={dropdownOptions} />
                        </Stack.Item>
                        <Stack.Item grow styles={{ root: { minWidth: itemWidth, maxWidth: itemWidth } }}>
                            <Dropdown label="RFQ Number" placeholder="Optional" options={dropdownOptions} />
                        </Stack.Item>

                        {/* 第三行 */}
                        <Stack.Item grow styles={{ root: { minWidth: itemWidth, maxWidth: itemWidth } }}>
                            <TextField label="Required Week From" placeholder="YYYYWW" />
                        </Stack.Item>
                        <Stack.Item grow styles={{ root: { minWidth: itemWidth, maxWidth: itemWidth } }}>
                            <TextField label="Required Week To" placeholder="YYYYWW" />
                        </Stack.Item>
                        <Stack.Item grow styles={{ root: { minWidth: itemWidth, maxWidth: itemWidth } }}>
                            <DatePicker label="Created Date From" placeholder="Select Date" ariaLabel="Select a date" />
                        </Stack.Item>
                        <Stack.Item grow styles={{ root: { minWidth: itemWidth, maxWidth: itemWidth } }}>
                            <DatePicker label="Created Date To" placeholder="Select Date" ariaLabel="Select a date" />
                        </Stack.Item>
                        <Stack.Item grow styles={{ root: { minWidth: itemWidth, maxWidth: itemWidth } }}>
                            <PrimaryButton text="Search" styles={{ root: { alignSelf: 'flex-end', marginTop: 28 } }} />
                        </Stack.Item>
                    </Stack>
                </Stack>
            )}

           {/* 表格和按钮区域 */}
           <h3 style={{ color: '#333', fontSize: '20px', marginTop: '20px' }}>{translations[language].title}</h3>
            <DetailsList
                items={items}
                columns={columns}
                setKey="set"
                layoutMode={DetailsListLayoutMode.fixedColumns}
                selectionMode={SelectionMode.single}
                styles={{ root: { backgroundColor: '#FFFFFF', border: '1px solid #ddd', borderRadius: '4px' } }}
            />
            
            {/* 底部按钮 */}
            <Stack horizontal tokens={{ childrenGap: 10, padding: 10 }}>
                <DefaultButton text={translations[language].view} />
                <PrimaryButton text={translations[language].createRFQ} />
            </Stack>
        </Stack>
    );
};

export default Requisition;
