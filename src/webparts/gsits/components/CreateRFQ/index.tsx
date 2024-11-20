import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    Stack,
    ComboBox, IComboBoxOption, IComboBoxStyles,
    DatePicker,
    Dropdown,
    DetailsList,
    DetailsListLayoutMode,
    SelectionMode,
    PrimaryButton, IComboBox,
    Dialog, DialogType, DialogFooter, DefaultButton
} from '@fluentui/react';
import FileUploader from './upload';
import SupplierSelection from './select';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAADClient } from '../../../../pnpjsConfig';
import { AadHttpClient } from '@microsoft/sp-http';
import { CONST } from '../../../../config/const';
import { useRFQ } from '../../../../hooks/useRFQ';
import { useDocument } from '../../../../hooks';
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const fetchData = async (parmaValue: string): Promise<any | null> => {
    try {
        const client = getAADClient();
        const functionUrl = `${CONST.azureFunctionBaseUrl}/api/GetSupplierInfo/${parmaValue}`;
        const response = await client.get(functionUrl, AadHttpClient.configurations.v1);

        // 检查响应状态
        if (!response.ok) {
            console.error('Error fetching data:', response.statusText);
            return null; // 返回 null 如果响应失败
        }

        const result = await response.json();
        console.log('Fetched data:', result);
        return result; // 返回结果
    } catch (error) {
        console.error('Error fetching data:', error);
        return null; // 发生异常时返回 null
    }
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const fetchDatadropdown = async (input: string): Promise<[]> => {
    try {
        const client = getAADClient();
        const functionUrl = `${CONST.azureFunctionBaseUrl}/api/GetParma?q=${input}`;
        const response = await client.get(functionUrl, AadHttpClient.configurations.v1);
        return await response.json(); // 返回 JSON 数据
    } catch (error) {
        console.error('Error fetching data:', error);
        return []; // 或者抛出错误，根据你的逻辑需求
    }
};

const Requisition: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;
    const [
       ,
        ,
        ,
        ,
        ,
        ,
        createRFQ
    ] = useRFQ();
    const [
        ,
        ,
        ,
        ,
        ,
        ,
        initialUploadRFQAttachments
    ] = useDocument();
// 新状态定义
    const [parmaDetails, setParmaDetails] = useState<{ name: string; country: string }>({ name: '', country: '' });

    const [columnsPerRow, setColumnsPerRow] = useState(5);
    const [form, setForm] = useState({ parma: '' });
    const [filteredOptions, setFilteredOptions] = useState<IComboBoxOption[]>([]);
    const [selectedValue, setSelectedValue] = useState<string | undefined>();
    const dropdownOptions = [
        { key: 'BLPR Blanket Production Order', text: 'BLPR Blanket Production Orde' },
        { key: 'QUP Quantity Production Order', text: 'QUP Quantity Production Order' },
        { key: 'SAPR Standalone Production Orde', text: 'SAPR Standalone Production Orde' },
    ];
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

    const comboBoxStyles: Partial<IComboBoxStyles> = {
        root: { width: '100%' },
        optionsContainer: { width: '100%' },
    };

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handleInputChange = async (text: string) => {
        setForm({...form, parma: text});
        if (text) {
            try {
                const response = await fetchDatadropdown(text);
                console.log(response,"eeee");
                if (response && Array.isArray(response)) {
                    setFilteredOptions(
                        response.map((item: string) => ({
                            key: item,    // 字符串本身作为选项的 key
                            text: item    // 字符串本身作为选项的 text
                        }))
                    );
                }

            } catch (error) {
                console.error('Error fetching options:', error);
            }
        } else {
            setFilteredOptions([]);
        }
    };
// 获取当前日期
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [formattedDate, setFormattedDate] = useState<string>(''); // 存储格式化后日期

    const [isRFQDialogVisible, setIsRFQDialogVisible] = useState(false);
    const [isLeavePageDialogVisible, setIsLeavePageDialogVisible] = useState(false);

    // Handlers to open dialogs
    const openRFQDialog = () => setIsRFQDialogVisible(true);
    const openLeavePageDialog = () => setIsLeavePageDialogVisible(true);

    // Handlers to close dialogs
    const closeRFQDialog = () => setIsRFQDialogVisible(false);
    const closeLeavePageDialog = () => setIsLeavePageDialogVisible(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}${month}${day}`;
    };
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handleBlur = async () => {
        try {
            const data = await fetchData(form.parma);
            if (data) {
                console.log('Fetched data on blur:', data); // 输出返回结果
                // 更新状态
                setParmaDetails({ name: data.name, country: data.country });
            }
        } catch (error) {
            console.error('Error fetching data on blur:', error);
        }
    };
    const handleChange = (event: React.FormEvent<IComboBox>, option?: IComboBoxOption):void => {
        if (option) {
            setSelectedValue(option.key as string);
            setForm({ ...form, parma: option.text });
        }
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
        { key: 'CreateDate', name: t('Created Date'), fieldName: 'CreatedDate', minWidth: 100 },
        { key: 'RfqNo', name: t('RFQ No.'), fieldName: 'RfqNo', minWidth: 80 },
        { key: 'ReqBuyer', name: t('Req. Buyer'), fieldName: 'ReqBuyer', minWidth: 80 },
        { key: 'HandlerName', name: t('Handler Name'), fieldName: 'HandlerName', minWidth: 100 },
        { key: 'Status', name: t('Status'), fieldName: 'Status', minWidth: 80 },
    ];
    const [selectedContacts, setSelectedContacts] = useState<
        { name: string; email: string; title?: string; functions?: string }[]
    >([]);
    const handleSubmit = async () => {
        try {
            // 假设你需要从 selectedItems 中构造 IRFQGrid 格式的数据
            const rfqData ={
                RFQDueDate:selectedDate || new Date(),
                Status: "New", // 示例字段
                SupplierContact:JSON.stringify(selectedContacts),
                Comment:"test",
                OrderType:selectedValue,
                Parma:form.parma
            };
            createRFQ(rfqData);
            // 上传文件
            console.log('Fetched data on blur:', selectedFiles);
            if (selectedFiles.length > 0) { // 假设 selectedFiles 是存储文件的状态
                initialUploadRFQAttachments(selectedFiles, "33");
                console.log('Files uploaded successfully');
            }

            alert('RFQ submitted successfully!');
        } catch (error) {
            console.error('Error submitting RFQ:', error);
            alert('Failed to submit RFQ.');
        }
    };
    console.log(selectedDate,formattedDate);
    return (
        <Stack className="RFQ" tokens={{ childrenGap: 20, padding: 20 }}>
            <h2 className="mainTitle">{t('New Parts RFQ Creation')}</h2>
            <Stack
                className="noMargin"
                horizontal
                tokens={{ childrenGap: 30, padding: 20 }}
                styles={{ root: { backgroundColor: '#CCEEFF', borderRadius: '4px', marginBottom: '5px', alignItems: 'flex-start' } }}
            >
                <Stack horizontal wrap tokens={{ childrenGap: 10 }} styles={{ root: { width: '50%' } }}>
                    <Stack.Item grow styles={{ root: { flexBasis: '40%', maxWidth: '50%' } }}>
                        <ComboBox
                            label={t('Parma')}
                            options={filteredOptions}
                            autoComplete="on"
                            allowFreeform={true}
                            openOnKeyboardFocus={true}
                            onInputValueChange={handleInputChange}
                            onBlur={handleBlur}
                            // text={form.parma}
                            selectedKey={selectedValue}
                            styles={comboBoxStyles}
                            onChange={handleChange}
                        />
                    </Stack.Item>
                    <Stack.Item grow styles={{ root: { flexBasis: '40%', width: '50%', alignSelf: 'flex-end' } }}>
                        {parmaDetails.name}
                    </Stack.Item>
                    <Stack.Item grow styles={{ root: { flexBasis: '40%', maxWidth: '50%' } }}>
                        <DatePicker label={t('RFQ Due Date')}  minDate={today}
                                    value={selectedDate} // 显示的日期值
                                    onSelectDate={(date) => {
                                        if (date) {
                                            setSelectedDate(date); // 设置内部日期状态
                                            const formatted = formatDate(date); // 格式化日期
                                            setFormattedDate(formatted); // 更新格式化后日期状态
                                        }
                                    }}
                        />
                    </Stack.Item>
                    <Stack.Item grow styles={{ root: { flexBasis: '40%', maxWidth: '50%' } }}>
                        <Dropdown label="Order Type" placeholder="Please Select"  options={state.selectedItems[0].RequisitionType==="PP" ? [{key: 'SAPP Standalone Prototype Order', text: 'SAPP Standalone Prototype Order'}] : dropdownOptions } style={{ width: Number(itemWidth) - 30 }} />
                    </Stack.Item>
                    <Stack.Item grow styles={{ root: { flexBasis: '100%', maxWidth: '100%' } }}>
                        <FileUploader title={t('Add RFQ Attachments')} initalNum={4}
                                      onFileSelect={(files) => setSelectedFiles(files)} />
                    </Stack.Item>
                </Stack>
                <Stack styles={{ root: { width: '50%' } }}>
                    <SupplierSelection onContactsChange={(contacts) => setSelectedContacts(contacts)} />
                </Stack>
            </Stack>
            <h3 className="mainTitle noMargin">{t('Selected Parts')}</h3>
            <DetailsList
                items={state.selectedItems}
                columns={columns}
                setKey="set"
                layoutMode={DetailsListLayoutMode.fixedColumns}
                selectionMode={SelectionMode.none}
            />
            <Stack horizontal tokens={{ childrenGap: 10, padding: 10 }}>
                <PrimaryButton
                    text={t('Back')}
                    onClick={() => {
                        openLeavePageDialog()
                    }}
                />
                <PrimaryButton text={t('Submit')} onClick={() => {
                    openRFQDialog()
                }} />
            </Stack>

            {/* RFQ Dialog */}
            <Dialog
                hidden={!isRFQDialogVisible}
                onDismiss={closeRFQDialog}
                dialogContentProps={{
                    type: DialogType.normal,
                    title: 'Confirmation',
                    subText: 'Are you sure to send RFQ? Notification email will be sent to selected supplier contact.',
                }}
            >
                <DialogFooter>
                    <PrimaryButton onClick={handleSubmit} text="Yes" />
                    <DefaultButton onClick={closeRFQDialog} text="No" />
                </DialogFooter>
            </Dialog>

            {/* Leave Page Dialog */}
            <Dialog
                hidden={!isLeavePageDialogVisible}
                onDismiss={closeLeavePageDialog}
                dialogContentProps={{
                    type: DialogType.normal,
                    title: 'Warning',
                    subText: 'Are you sure to leave this page? All filled contents will be lost.',
                }}
            >
                <DialogFooter>
                    <PrimaryButton onClick={() => navigate('/requisition')} text="Yes" />
                    <DefaultButton onClick={closeLeavePageDialog} text="No" />
                </DialogFooter>
            </Dialog>
        </Stack>
    );
};

export default Requisition;
