import * as React from 'react';
import { useState, useEffect } from 'react';
import { Stack, TextField, Dropdown, DetailsList, DetailsListLayoutMode, DatePicker, SelectionMode, PrimaryButton } from '@fluentui/react';
import './index.css';
import FileUploader from './upload';
import SupplierSelection from './select';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getAADClient } from '../../../../pnpjsConfig';
import { AadHttpClient } from '@microsoft/sp-http';
import { CONST } from '../../../../config/const';
// 提取 fetchData 函数
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const fetchData = async (parmaValue:string) => {
    try {
        const client = getAADClient();

        // 使用模板字符串构建完整的函数URL
        const functionUrl = `${CONST.azureFunctionBaseUrl}/api/GetParma/${parmaValue}`;

        // 请求数据
        const response = await client.get(functionUrl, AadHttpClient.configurations.v1);

        // 解析响应
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const Requisition: React.FC = () => {
    const { t } = useTranslation(); // 使用 i18next 进行翻译
    const navigate = useNavigate();
    const [columnsPerRow, setColumnsPerRow] = useState(5); // 默认每行5列
    const location = useLocation();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const state: any = location.state;
    console.log(state);

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

    // 跳转到 Create RFQ 页面，并传递选中的记录
    const handleBack = ():void => {
        navigate('/requisition');
    };

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

    const dropdownOptions = [
        { key: 'optional', text: 'Optional' },
        { key: 'required', text: 'Required' },
        { key: 'select', text: 'Please Select' },
    ];

    const [form, setForm] = React.useState({
        parma: ''
    });

    return (
        <Stack className="RFQ" tokens={{ childrenGap: 20, padding: 20 }}>
            <h2 className='mainTitle'>{t("New Parts RFQ Creation")}</h2>
            <Stack className='noMargin' horizontal tokens={{ childrenGap: 30, padding: 20 }} styles={{ root: { backgroundColor: '#CCEEFF', borderRadius: '4px', marginBottom: '5px', alignItems: 'flex-start' } }} >
                <Stack horizontal wrap tokens={{ childrenGap: 10 }} verticalAlign="start" styles={{ root: { width: '50%' } }}>
                    <Stack.Item grow styles={{ root: { flexBasis: '40%', width: '50%' } }}>
                        <TextField
                            value={form.parma}
                            label="Parma"
                            placeholder="Entered text"
                            onChange={(val) =>
                                setForm({
                                    ...form,
                                    parma: val.currentTarget.value
                                })
                            }
                            onBlur={() => fetchData(form.parma)} // onBlur 事件
                            style={{ width: '100%' }}
                        />
                    </Stack.Item>
                    <Stack.Item grow styles={{ root: { flexBasis: '40%', width: '50%', alignSelf: 'flex-end' } }}>
                        Nelson(Changzhou) Tubing Co,Ltd
                    </Stack.Item>
                    <Stack.Item grow styles={{ root: { flexBasis: '40%', maxWidth: '50%' } }}>
                        <DatePicker label="RFQ Due Date" placeholder="yymmww" />
                    </Stack.Item>
                    <Stack.Item grow styles={{ root: { flexBasis: '40%', maxWidth: '50%' } }}>
                        <Dropdown label="Order Type" placeholder="Please Select" multiSelect options={form.parma ? [{key: form.parma, text: form.parma}] : dropdownOptions } style={{ width: Number(itemWidth) - 30 }} />
                    </Stack.Item>
                    <Stack styles={{ root: { width: '100%' } }}>
                        <FileUploader title="Add RFQ Attachments" initalNum={4} />
                    </Stack>
                </Stack>
                <Stack horizontal wrap tokens={{ childrenGap: 10 }} verticalAlign="start" styles={{ root: { width: '50%' } }}>
                    <Stack grow styles={{ root: { width: '100%' } }}>
                        <SupplierSelection />
                    </Stack>
                    <Stack.Item grow styles={{ root: { flexBasis: '100%', maxWidth: '100%' } }}>
                        <TextField label="Buyer" placeholder="Optional" multiline rows={3} style={{ width: '100%' }} />
                    </Stack.Item>
                </Stack>
            </Stack>

            <h3 className="mainTitle noMargin">{t("Selected Parts")}</h3>
            <DetailsList
                className="detailList"
                items={state.selectedItems}
                columns={columns}
                setKey="set"
                layoutMode={DetailsListLayoutMode.fixedColumns}
                selectionMode={SelectionMode.none}

                styles={{
                    root: { backgroundColor: '#FFFFFF', border: '1px solid #ddd', borderRadius: '4px' },
                    headerWrapper: {
                        backgroundColor: "#AFAFAF", selectors: {
                            '.ms-DetailsHeader': {
                                backgroundColor: '#BDBDBD',
                                fontWeight: 600,
                            },
                        }
                    }
                }}
                viewport={{
                    height: 0,
                    width: 0
                }}
                onRenderDetailsFooter={() => {
                    const el = document.getElementsByClassName('ms-DetailsHeader')[0]
                    const width = el && el.clientWidth || '100%'
                    return (
                        <div style={{ width: width, height: '30px', backgroundColor: '#BDBDBD' }} />
                    )
                }}
                selectionPreservedOnEmptyClick={true}
                ariaLabelForSelectionColumn="Toggle selection"
                ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                checkButtonAriaLabel="select row"
            />

            <Stack horizontal tokens={{ childrenGap: 10, padding: 10 }}>
                <PrimaryButton
                    text={t('Back')}
                    styles={{ root: { border: 'none', backgroundColor: '#99CCFF', height: 36, color: 'black' } }}
                    onClick={handleBack}
                />
                <PrimaryButton
                    text={t('Submit')}
                    styles={{ root: { border: 'none', backgroundColor: '#99CCFF', height: 36, color: 'black' } }}
                />
            </Stack>
        </Stack>
    );
};

export default Requisition;
