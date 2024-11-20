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
    PrimaryButton
} from '@fluentui/react';
import FileUploader from './upload';
import SupplierSelection from './select';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAADClient } from '../../../../pnpjsConfig';
import { AadHttpClient } from '@microsoft/sp-http';
import { CONST } from '../../../../config/const';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const fetchData = async (parmaValue: string) => {
    try {
        const client = getAADClient();
        const functionUrl = `${CONST.azureFunctionBaseUrl}/api/GetParma/${parmaValue}`;
        const response = await client.get(functionUrl, AadHttpClient.configurations.v1);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const Requisition: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;

    const [columnsPerRow, setColumnsPerRow] = useState(5);
    const [form, setForm] = useState({ parma: '' });
    const [filteredOptions, setFilteredOptions] = useState<IComboBoxOption[]>([]);
    const options: IComboBoxOption[] = [
        { key: 'apple', text: 'Apple' },
        { key: 'aanana', text: 'aanana' },
        { key: 'aherry', text: 'aherry' },
        { key: 'date', text: 'Date' },
        { key: 'grape', text: 'Grape' },
        { key: 'kiwi', text: 'Kiwi' }
    ];
    const dropdownOptions = [
        { key: 'optional', text: 'Optional' },
        { key: 'required', text: 'Required' },
        { key: 'select', text: 'Please Select' },
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
    const handleInputChange = (text: string) => {
        setForm({ ...form, parma: text });
        if (text) {
            setFilteredOptions(
                options.filter(option =>
                    option.text.toLowerCase().startsWith(text.toLowerCase())
                )
            );
        } else {
            setFilteredOptions(options);
        }
    };

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handleBlur = async () => {
        try {
            await fetchData(form.parma);
        } catch (error) {
            console.error('Error fetching data:', error);
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
        { key: 'CreateDate', name: t('Created Date'), fieldName: 'CreateDate', minWidth: 100 },
        { key: 'RfqNo', name: t('RFQ No.'), fieldName: 'RfqNo', minWidth: 80 },
        { key: 'ReqBuyer', name: t('Req. Buyer'), fieldName: 'ReqBuyer', minWidth: 80 },
        { key: 'HandlerName', name: t('Handler Name'), fieldName: 'HandlerName', minWidth: 100 },
        { key: 'Status', name: t('Status'), fieldName: 'Status', minWidth: 80 },
    ];

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
                            options={filteredOptions.length ? filteredOptions : options}
                            autoComplete="on"
                            allowFreeform={true}
                            openOnKeyboardFocus={true}
                            onInputValueChange={handleInputChange}
                            onBlur={handleBlur}
                            text={form.parma}
                            styles={comboBoxStyles}
                            style={{ width: '100%' }}
                        />
                    </Stack.Item>
                    <Stack.Item grow styles={{ root: { flexBasis: '40%', width: '50%', alignSelf: 'flex-end' } }}>
                        Nelson(Changzhou) Tubing Co,Ltd
                    </Stack.Item>
                    <Stack.Item grow styles={{ root: { flexBasis: '40%', maxWidth: '50%' } }}>
                        <DatePicker label={t('RFQ Due Date')} placeholder="yymmww" />
                    </Stack.Item>
                    <Stack.Item grow styles={{ root: { flexBasis: '40%', maxWidth: '50%' } }}>
                        <Dropdown label="Order Type" placeholder="Please Select" multiSelect options={form.parma ? [{key: form.parma, text: form.parma}] : dropdownOptions } style={{ width: Number(itemWidth) - 30 }} />
                    </Stack.Item>
                    <Stack.Item grow styles={{ root: { flexBasis: '100%', maxWidth: '100%' } }}>
                        <FileUploader title={t('Add RFQ Attachments')} initalNum={4} />
                    </Stack.Item>
                </Stack>
                <Stack styles={{ root: { width: '50%' } }}>
                    <SupplierSelection />
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
                    onClick={() => navigate('/requisition')}
                />
                <PrimaryButton text={t('Submit')} />
            </Stack>
        </Stack>
    );
};

export default Requisition;
