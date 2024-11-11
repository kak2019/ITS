import * as React from 'react';
import { useState, useEffect } from 'react';
import { Stack, TextField, Dropdown, PrimaryButton, DetailsList, DetailsListLayoutMode, Icon, Label, DatePicker, Selection } from '@fluentui/react';
import { useNavigate } from 'react-router-dom';
import { IColumn } from '@fluentui/react';
import './index.css';
import { useTranslation } from 'react-i18next';

// 定义项目数据类型
interface Item {
    key: number;
    partNo: string;
    qualifier: string;
    partDescription: string;
    materialUser: string;
    reqType: string;
    annualQty: string;
    orderQty: string;
    reqWeekFrom: string;
    createdDate: string;
    rfqNo: string;
    reqBuyer: string;
    handlerName: string;
    status: string;
}

const Requisition: React.FC = () => {
    const { t } = useTranslation(); // 使用 i18next 进行翻译
    const navigate = useNavigate();
    const [isSearchVisible, setIsSearchVisible] = useState(true);
    const [columnsPerRow, setColumnsPerRow] = useState<number>(5);
    const [selectedItems, setSelectedItems] = useState<Item[]>([]);

    // 定义 Selection，用于 DetailsList 的选择
    const selection = new Selection({
        onSelectionChanged: () => {
            setSelectedItems(selection.getSelection() as Item[]);
        }
    });

    // 跳转到 Create RFQ 页面，并传递选中的记录
    const handleCreateRFQ = ():void => {
        navigate('/create-rfq', { state: { selectedItems } });
    };


    // 切换搜索区域的显示状态
    const toggleSearchVisibility = (): void => {
        setIsSearchVisible(!isSearchVisible);
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

    // 定义表格的列
    const columns: IColumn[] = [
        { key: 'partNo', name: t('Part No.'), fieldName: 'partNo', minWidth: 100 },
        { key: 'qualifier', name: t('Qualifier'), fieldName: 'qualifier', minWidth: 50 },
        { key: 'partDescription', name: t('Part Description'), fieldName: 'partDescription', minWidth: 100 },
        { key: 'materialUser', name: t('Material User'), fieldName: 'materialUser', minWidth: 100 },
        { key: 'reqType', name: t('Req. Type'), fieldName: 'reqType', minWidth: 50 },
        { key: 'annualQty', name: t('Annual Qty'), fieldName: 'annualQty', minWidth: 80 },
        { key: 'orderQty', name: t('Order Qty'), fieldName: 'orderQty', minWidth: 80 },
        { key: 'reqWeekFrom', name: t('Req Week From'), fieldName: 'reqWeekFrom', minWidth: 100 },
        { key: 'createdDate', name: t('Created Date'), fieldName: 'createdDate', minWidth: 100 },
        { key: 'rfqNo', name: t('RFQ No.'), fieldName: 'rfqNo', minWidth: 80 },
        { key: 'reqBuyer', name: t('Req. Buyer'), fieldName: 'reqBuyer', minWidth: 80 },
        { key: 'handlerName', name: t('Handler Name'), fieldName: 'handlerName', minWidth: 100 },
        { key: 'status', name: t('Status'), fieldName: 'status', minWidth: 80 },
    ];

    // 初始化项目数据
    const items: Item[] = new Array(10).fill(0).map((_, index) => ({
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
        <Stack className="Requisition" tokens={{ childrenGap: 20, padding: 20 }}>
          
            <h2 className='mainTitle' >{t('Requisition for New Part Price')}</h2>

            {/* 搜索区域标题和切换图标 */}
            <Stack 
                horizontal
                verticalAlign="center"
                tokens={{ childrenGap: 10 }}
                className="noMargin"
                styles={{
                    root: {
                        backgroundColor: 'white',
                        padding: '10px 20px',
                        cursor: 'pointer',
                        marginBottom: 0,
                        marginTop: 0
                    }
                }}
                onClick={toggleSearchVisibility}
            >
                <Icon iconName={isSearchVisible ? "ChevronDown" : "ChevronRight"} style={{ fontSize: 16 }} />
                <Label styles={{ root: { fontWeight: 'bold' } }}>{t('Search')}</Label>
            </Stack>

            {/* 搜索区域 */}
            {isSearchVisible && (
                <Stack tokens={{ padding: 10 }} className="noMargin">
                    <Stack tokens={{ childrenGap: 10, padding: 20 }} styles={{ root: { backgroundColor: '#CCEEFF', borderRadius: '4px' } }}>
                        <Stack horizontal wrap tokens={{ childrenGap: 10 }} verticalAlign="start">
                            <Stack.Item grow styles={{ root: { flexBasis: itemWidth, maxWidth: itemWidth } }}>
                                <Dropdown label="Requisition Type" placeholder="Please Select" options={dropdownOptions} style={{width: Number(itemWidth) - 30}} />
                            </Stack.Item>
                            <Stack.Item grow styles={{ root: { flexBasis: itemWidth, maxWidth: itemWidth } }}>
                                <TextField label="Buyer" placeholder="Entered text" style={{width: Number(itemWidth) - 30}} />
                            </Stack.Item>
                            <Stack.Item grow styles={{ root: { flexBasis: itemWidth, maxWidth: itemWidth } }}>
                                <TextField label="Parma" placeholder="Placeholder text" style={{width: Number(itemWidth) - 30}} />
                            </Stack.Item>
                            <Stack.Item grow styles={{ root: { flexBasis: itemWidth, maxWidth: itemWidth } }}>
                                <TextField label="Section" placeholder="Placeholder text" style={{width: Number(itemWidth) - 30}} />
                            </Stack.Item>
                            <Stack.Item grow styles={{ root: { flexBasis: itemWidth, maxWidth: itemWidth } }}>
                                <Dropdown label="Status" placeholder="Optional" options={dropdownOptions} style={{width: Number(itemWidth) - 30}} />
                            </Stack.Item>

                            <Stack.Item grow styles={{ root: { flexBasis: itemWidth, maxWidth: itemWidth } }}>
                                <TextField label="Part Number" placeholder="Placeholder text" />
                            </Stack.Item>
                            <Stack.Item grow styles={{ root: { flexBasis: itemWidth, maxWidth: itemWidth } }}>
                                <Dropdown label="Qualifier" placeholder="Optional" options={dropdownOptions} />
                            </Stack.Item>
                            <Stack.Item grow styles={{ root: { flexBasis: itemWidth, maxWidth: itemWidth } }}>
                                <TextField label="Project" placeholder="Placeholder text" />
                            </Stack.Item>
                            <Stack.Item grow styles={{ root: { flexBasis: itemWidth, maxWidth: itemWidth } }}>
                                <Dropdown label="Material User" placeholder="Optional" options={dropdownOptions} />
                            </Stack.Item>
                            <Stack.Item grow styles={{ root: { flexBasis: itemWidth, maxWidth: itemWidth } }}>
                                <Dropdown label="RFQ Number" placeholder="Optional" options={dropdownOptions} />
                            </Stack.Item>

                            <Stack.Item grow styles={{ root: { flexBasis: itemWidth, maxWidth: itemWidth } }}>
                                <TextField label="Required Week From" placeholder="YYYYWW" />
                            </Stack.Item>
                            <Stack.Item grow styles={{ root: { flexBasis: itemWidth, maxWidth: itemWidth } }}>
                                <TextField label="Required Week To" placeholder="YYYYWW" />
                            </Stack.Item>
                            <Stack.Item grow styles={{ root: { flexBasis: itemWidth, maxWidth: itemWidth } }}>
                                <DatePicker label="Created Date From" placeholder="Select Date" ariaLabel="Select a date" />
                            </Stack.Item>
                            <Stack.Item grow styles={{ root: { flexBasis: itemWidth, maxWidth: itemWidth } }}>
                                <DatePicker label="Created Date To" placeholder="Select Date" ariaLabel="Select a date" />
                            </Stack.Item>
                            <Stack.Item grow styles={{ root: { flexBasis: itemWidth, maxWidth: itemWidth, textAlign: 'right' } }}>
                                <PrimaryButton text="Search" styles={{ root: { marginTop: 28, border: 'none', backgroundColor: '#99CCFF', height: 36, color: 'black', borderRadius: '4px', width: 150 } }} />
                            </Stack.Item>
                        </Stack>
                    </Stack>
                </Stack>
            )}

            {/* 表格和按钮区域
            <h3 className="mainTitle noMargin">{t('title')}</h3> */}
            <DetailsList
                className="detailList"
                items={items}
                columns={columns}
                setKey="set"
                selection={selection}
                layoutMode={DetailsListLayoutMode.fixedColumns}
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
                onRenderDetailsFooter={() => (
                    <div style={{width: '100%', height: '30px', backgroundColor: '#BDBDBD'}} />
                )}
                selectionPreservedOnEmptyClick={true}
                ariaLabelForSelectionColumn="Toggle selection"
                ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                checkButtonAriaLabel="select row"
            />
            
            {/* 底部按钮 */}
            <Stack horizontal tokens={{ childrenGap: 10, padding: 10 }}>
                <PrimaryButton
                    text={t('CreateRFQ')}
                    styles={{root: {border: 'none', backgroundColor: '#99CCFF', height: 36, color: 'black'}}}
                    onClick={handleCreateRFQ}
                />
            </Stack>
        </Stack>
    );
};

export default Requisition;
