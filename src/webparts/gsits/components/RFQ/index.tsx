import { DatePicker, DefaultPalette, DetailsList, Dropdown, IColumn, IconButton, Label, PrimaryButton, Stack, TextField } from '@fluentui/react';
import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';


const RFQ: React.FC = () => {

    const { t } = useTranslation();
    const [isSearchVisibel, setIsSearchVisible ] = useState(true); 
    const [requestType, setRequestType] = useState('');
    const [rfqNumber, setRFQNumber] = useState('');
    const [buyer, setBuyer] = useState('');
    const [section, setSection] = useState('');
    const [status, setStatus] = useState('');
    const [parma, setParma] = useState('');
    const [rfqReleaseDateTo, setRfqReleaseDateTo] = useState<Date | undefined>(undefined);
    const [rfqReleaseDateFrom, setRfqReleaseDateFrom] = useState<Date | undefined>(undefined);
    const [rfqDueDateFrom, setRfqDueDateFrom] = useState<Date | undefined>(undefined);
    const [rfqDueDateTo, setRfqDueDateTo] = useState<Date | undefined>(undefined);


const typeOptions = [
    {key: "all", text: "All"},
    {key: "newpart", text: "New Part"},
    {key: "pricechange", text: "Price Change"}
]
const statusOptions = [
    { key: 'all', text: 'All' },
    { key: 'new', text: 'New' },
    { key: 'inprogress', text: 'In Progress' },
    { key: 'senttoGPS', text: 'Sent to GPS' }
]

const columns: IColumn[] = [
    { key: 'PartNumber', name: t('Part No.'), fieldName: 'PartNumber', minWidth: 100 },
    { key: 'RFQNo', name: t('RFQNo'), fieldName: 'RFQNo', minWidth: 100 },
    { key: 'Buyer', name: t('Buyer'), fieldName: 'Buyer', minWidth: 100 },
    { key: 'HandlerName', name: t('Handler Name'), fieldName: 'HandlerName', minWidth: 100 },
    { key: 'Type', name: t('Type'), fieldName: 'Type', minWidth: 100 },
    { key: 'ReasonofRFQ', name: t('Reason of RFQ'), fieldName: 'ReasonofRFQ', minWidth: 150 },
    { key: 'RFQReleaseDate', name: t('RFQ Release Date'), fieldName: 'RFQReleaseDate', minWidth: 80 },
    { key: 'RFQDueDate', name: t('RFQ Due Date'), fieldName: 'RFQDueDate', minWidth: 100 },
    { key: 'Status', name: t('Status'), fieldName: 'Status', minWidth: 100 },
    { key: 'EffectiveDateRequest', name: t('Effective Date Request'), fieldName: 'EffectiveDateRequest', minWidth: 100 }
    ]
    
    const data = [
        {
            PartNumber: "12345",
            RFQNo: "1234567890",
            Buyer: "UDT 0001",
            HandlerName: "UD Taro",
            Type: "New Part Price",
            ReasonofRFQ: "999999",
            RFQReleaseDate: "2024/01/01",
            RFQDueDate: "2024/02/01",
            Status: "RFQ Sent",
            EffectiveDateRequest: "2024/03/01"
        },
        {
            PartNumber: "67890",
            RFQNo: "0987654321",
            Buyer: "UDT 0002",
            HandlerName: "UD Hanako",
            Type: "Price Change",
            ReasonofRFQ: "888888",
            RFQReleaseDate: "2024/02/10",
            RFQDueDate: "2024/03/10",
            Status: "In Progress",
            EffectiveDateRequest: "2024/04/01"
        },
        {
            PartNumber: "13579",
            RFQNo: "1357924680",
            Buyer: "UDT 0003",
            HandlerName: "UD Ken",
            Type: "New Part Price",
            ReasonofRFQ: "777777",
            RFQReleaseDate: "2024/01/15",
            RFQDueDate: "2024/02/15",
            Status: "New",
            EffectiveDateRequest: "2024/05/01"
        },
        {
            PartNumber: "24680",
            RFQNo: "2468135790",
            Buyer: "UDT 0004",
            HandlerName: "UD Momo",
            Type: "Price Change",
            ReasonofRFQ: "666666",
            RFQReleaseDate: "2024/03/01",
            RFQDueDate: "2024/04/01",
            Status: "Sent to GPS",
            EffectiveDateRequest: "2024/06/01"
        }
    ];
    
    const fieldStyles = { root: { width: '100%' } };

    const toggleSearchBar = (): void => {
        setIsSearchVisible(!isSearchVisibel);
    };
    

      return (
        <Stack tokens={{ childrenGap: 20 }} styles={{root : {width: '100%'}}}>
        <h2 className='mainTitle'>RFQ & Quote</h2>
        
         {/* 搜索栏标题 */}
         <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
                <IconButton
                    iconProps={{ iconName: isSearchVisibel ? 'ChevronDown' : 'ChevronRight' }}
                    title="Toggle Search Bar"
                    ariaLabel="Toggle Search Bar"
                    onClick={toggleSearchBar}
                />
                <Label styles={{ root: { fontWeight: 'bold', fontSize: 16 } }}>Search</Label>
                </Stack>
        {/* 搜索区域 */}
        {isSearchVisibel && 
        <Stack
        styles={{
            root: {
                background: '#CCEEFF',
                padding: 20,
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)', // 五等分
                gap: '10px',
            },
        }}
        >
            {/* 第一行 */}
           
            <Dropdown label="Type" selectedKey={requestType} onChange={(e, option) => setRequestType(String(option?.key || ''))} options={typeOptions} styles={fieldStyles}/>
            <TextField label="RFQ No." value={rfqNumber} onChange={(e, newValue) => setRFQNumber(newValue || '')} styles={fieldStyles}/>
            <TextField label="Buyer" value={buyer} onChange={(e, newValue) => setBuyer(newValue || '')} styles={fieldStyles}/>
           <TextField label="Section" value={section} onChange={(e, newValue) => setSection(newValue || '')} styles={fieldStyles}/>
            <Dropdown label="Status" selectedKey={status} onChange={(e, option) => setStatus(String(option?.key || ''))} options={statusOptions} styles={fieldStyles}/>
                
            

            {/* 第二行 */}
            
            <TextField label="Parma" value={parma} onChange={(e, newValue) => setParma(newValue || '')} styles={fieldStyles}/>
            <DatePicker label="RFQ Release Date From" value={rfqReleaseDateFrom} onSelectDate={date => setRfqReleaseDateFrom(date || undefined)} styles={fieldStyles}/>
            <DatePicker label="RFQ Release Date To" value={rfqReleaseDateTo} onSelectDate={date => setRfqReleaseDateTo(date || undefined)} styles={fieldStyles}/>
            <DatePicker label="RFQ Due Date From" value={rfqDueDateFrom} onSelectDate={date => setRfqDueDateFrom(date || undefined)} styles={fieldStyles}/>
            <DatePicker label="RFQ Due Date To" value={rfqDueDateTo} onSelectDate={date => setRfqDueDateTo(date || undefined)} styles={fieldStyles}/>
            
            {/* 搜索按钮 */}
            <Stack.Item style={{ gridColumn: '5', justifySelf: 'end' }}>
                        <PrimaryButton text="Search" className='button'/>
                    </Stack.Item>
        </Stack>
        }

            

            {/* 结果展示区域 */}
            <DetailsList
                items={data}
                columns={columns}
                selectionMode={0} // 禁止选择模式
                styles={{
                    root: {
                        marginTop: 20,
                        padding: 10,
                        borderTop: `1px solid ${DefaultPalette.neutralLight}`,
                        borderBottom: `1px solid ${DefaultPalette.neutralLight}`,
                    },
                }}
            />
        </Stack>
    );
};

export default RFQ;