import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Stack, TextField, Dropdown, PrimaryButton, DetailsList, DetailsListLayoutMode, Icon, Label, DatePicker, Selection, TooltipHost } from '@fluentui/react';
import { useNavigate } from 'react-router-dom';
import { IColumn } from '@fluentui/react';
import './index.css';
import { useTranslation } from 'react-i18next';
import { useRequisition } from '../../../../hooks/useRequisition';
import { Spinner, SpinnerSize } from '@fluentui/react';
import { IRequisitionGrid } from '../../../../model/requisition'
import { useUser } from '../../../../hooks/useUser';
import { Logger, LogLevel } from '@pnp/logging';
import AppContext from '../../../../AppContext';
// import { getAADClient } from '../../../../pnpjsConfig';
// import { AadHttpClient } from '@microsoft/sp-http';
// import { CONST } from '../../../../config/const';
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
    let userEmail = ""
    const { t } = useTranslation(); // 使用 i18next 进行翻译
    const navigate = useNavigate();
    const { getUserIDCode } = useUser(); // 引入 useUser 钩子
    const ctx = useContext(AppContext);
    if (!ctx || !ctx.context) {
        throw new Error("AppContext is not provided or context is undefined");
    } else { userEmail = ctx.context._pageContext._user.email; }

    console.log(userEmail)
    const [currentUserIDCode, setCurrentUserIDCode] = useState<string>('');
    const [isSearchVisible, setIsSearchVisible] = useState(true);
    const [columnsPerRow, setColumnsPerRow] = useState<number>(5);
    const [selectedItems, setSelectedItems] = useState<Item[]>([]);
    const [
        isFetching,
        allRequisitions,
        ,
        getAllRequisitions,
        ,
    ] = useRequisition();

    // 定义 Selection，用于 DetailsList 的选择
    const selection = new Selection({
        onSelectionChanged: () => {
            setSelectedItems(selection.getSelection() as Item[]);
        }
    });

    // 跳转到 Create RFQ 页面，并传递选中的记录
    const handleCreateRFQ = (): void => {
        navigate('/create-rfq', { state: { selectedItems } });
    };


    // 切换搜索区域的显示状态
    const toggleSearchVisibility = (): void => {
        setIsSearchVisible(!isSearchVisible);
    };
    // useEffect((): void => {
    //     // Dome function app
    //     const fetchData = async (): Promise<void> => {
    //         try {
    //             const client = getAADClient();
    //             const response = await client.get(`${CONST.azureFunctionBaseUrl}/api/GetParma?q=981`, AadHttpClient.configurations.v1);
    //             const result = await response.json();
    //             console.log(result);

    //         }
    //         catch (error) {
    //             console.error(error);

    //         }
    //     };
    //     fetchData().then(_ => _, _ => _);

    // }, []);

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

    const columns: IColumn[] = [
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

    const RequisitionsType = [
        { key: 'NP', text: 'NP' },
        { key: 'RB', text: 'RB' },
        { key: 'PP', text: 'PP' },
    ];
    const StatesType = [
        { key: 'New', text: 'New' },
        { key: 'In Progress', text: 'In Progress' },
        { key: 'Sent to GPS', text: 'Sent to GPS' },
    ];
    const QualifierType = [
        { key: '', text: '' },
    ];

    const [filters, setFilters] = useState<{
        requisitionType: string;
        buyer: string;
        parma: string;
        section: string;
        status: string;
        partNumber: string;
        qualifier: string;
        project: string;
        materialUser: string;
        rfqNumber: string;
        requiredWeekFrom: string;
        requiredWeekTo: string;
        createdDateFrom: Date | null;
        createdDateTo: Date | null;
    }>({
        requisitionType: '',
        buyer: '',
        parma: '',
        section: '',
        status: '',
        partNumber: '',
        qualifier: '',
        project: '',
        materialUser: '',
        rfqNumber: '',
        requiredWeekFrom: '',
        requiredWeekTo: '',
        createdDateFrom: null,
        createdDateTo: null,
    });
    // console.log(filters)
    const applyFilters = (): IRequisitionGrid[] => {
        return allRequisitions.filter(item => {
            const {
                requisitionType,
                buyer,
                parma,
                section,
                status,
                partNumber,
                qualifier,
                project,
                materialUser,
                rfqNumber,
                requiredWeekFrom,
                requiredWeekTo,
                createdDateFrom,
                createdDateTo,
            } = filters;

            return (
                (!requisitionType || item.RequisitionType === requisitionType) &&
                (!buyer || item.ReqBuyer.toLowerCase().includes(buyer.toLowerCase())) &&
                (!parma || item.Parma.toLowerCase().includes(parma.toLowerCase())) &&
                (!section || item.Section.toLowerCase().includes(section.toLowerCase())) &&
                (!status || item.Status === status) &&
                (!partNumber || item.PartNumber.toLowerCase().includes(partNumber.toLowerCase())) &&
                (!qualifier || item.Qualifier === qualifier) &&
                (!project || item.Project.toLowerCase().includes(project.toLowerCase())) &&
                (!materialUser || item.MaterialUser === materialUser) &&
                (!rfqNumber || item.RfqNo.toLowerCase().includes(rfqNumber.toLowerCase())) &&
                (!requiredWeekFrom || item.RequiredWeek >= requiredWeekFrom) &&
                (!requiredWeekTo || item.RequiredWeek <= requiredWeekTo) &&
                (!createdDateFrom || (item.CreateDate && new Date(item.CreateDate) >= createdDateFrom)) &&
                (!createdDateTo || (item.CreateDate && new Date(item.CreateDate) <= createdDateTo))
            );
        });
    };
    const [filteredItems, setFilteredItems] = useState<IRequisitionGrid[]>(allRequisitions);
    useEffect(() => {
        // 获取当前登录用户信息
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/explicit-function-return-type
        const fetchUserInfo = async () => {
            try {
                // const userEmail = userEmail; // Replace with actual email if available
                const userIDCode = await getUserIDCode(userEmail);
                setCurrentUserIDCode(userIDCode);

                //const userPicture = await getUserPicture(userIDCode);
            } catch (error) {
                Logger.write(`Failed to fetch user info: ${error}`, LogLevel.Error);
            }
        };
        fetchUserInfo().catch(e => console.log(e));
    }, [])

    useEffect(() => {
        getAllRequisitions();
    }, []);
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
                                <Dropdown label={t("Requisition Type")} placeholder="Please Select" options={RequisitionsType} style={{ width: Number(itemWidth) - 30 }}
                                    onChange={(e, option) => setFilters(prev => ({ ...prev, requisitionType: String(option?.key || '') }))}
                                />
                            </Stack.Item>
                            {/* <Stack.Item grow styles={{ root: { flexBasis: itemWidth, maxWidth: itemWidth } }}>
                                <TextField label={t("Buyer")} placeholder="Entered text" style={{width: Number(itemWidth) - 30}} 
                                defaultValue={currentUserIDCode}
                                onChange={(e, newValue) => setFilters(prev => ({ ...prev, buyer: newValue || '' }))}
                                />
                            </Stack.Item> */}
                            <Stack.Item grow styles={{ root: { flexBasis: itemWidth, maxWidth: itemWidth } }}>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px',marginTop:'4px' }}>
                                    <span style={{ marginRight: '8px', fontSize: '14px', fontWeight: '500' }}>{t("Buyer")}</span>
                                    <TooltipHost
                                        content={t("Search by Org/Handler Code/Name")}
                                        calloutProps={{ gapSpace: 0 }}
                                    >
                                        <Icon
                                            iconName="Info"
                                            styles={{
                                                root: {
                                                    fontSize: '16px', // 增大字体大小
                                                    cursor: 'pointer',
                                                    color: '#0078D4', // 使用更显眼的颜色（蓝色）
                                                },
                                            }}
                                        />
                                    </TooltipHost>
                                </div>
                                <TextField
                                    placeholder="Entered text"
                                    style={{ width: Number(itemWidth) - 30 }}
                                    defaultValue={currentUserIDCode}
                                    onChange={(e, newValue) => setFilters(prev => ({ ...prev, buyer: newValue || '' }))}
                                />
                            </Stack.Item>
                            <Stack.Item grow styles={{ root: { flexBasis: itemWidth, maxWidth: itemWidth } }}>
                                <TextField label={t("Parma")} placeholder="Placeholder text" style={{ width: Number(itemWidth) - 30 }}
                                    onChange={(e, newValue) => setFilters(prev => ({ ...prev, parma: newValue || '' }))}
                                />
                            </Stack.Item>
                            <Stack.Item grow styles={{ root: { flexBasis: itemWidth, maxWidth: itemWidth } }}>
                                <TextField label={t("Section")} placeholder="Placeholder text" style={{ width: Number(itemWidth) - 30 }}
                                    onChange={(e, newValue) => setFilters(prev => ({ ...prev, section: newValue || '' }))}
                                />
                            </Stack.Item>
                            <Stack.Item grow styles={{ root: { flexBasis: itemWidth, maxWidth: itemWidth } }}>
                                <Dropdown label={t("Status")} placeholder="Optional" options={StatesType} style={{ width: Number(itemWidth) - 30 }}
                                    onChange={(e, option) => setFilters(prev => ({ ...prev, status: String(option?.key || '') }))}
                                />
                            </Stack.Item>

                            <Stack.Item grow styles={{ root: { flexBasis: itemWidth, maxWidth: itemWidth } }}>
                                <TextField label={t("Part Number")} placeholder="Placeholder text"
                                    onChange={(e, newValue) => setFilters(prev => ({ ...prev, partNumber: newValue || '' }))}
                                />
                            </Stack.Item>
                            <Stack.Item grow styles={{ root: { flexBasis: itemWidth, maxWidth: itemWidth } }}>
                                <Dropdown label={t("Qualifier")} placeholder="Optional" options={QualifierType}
                                    onChange={(e, option) => setFilters(prev => ({ ...prev, qualifier: String(option?.key || '') }))}
                                />
                            </Stack.Item>
                            <Stack.Item grow styles={{ root: { flexBasis: itemWidth, maxWidth: itemWidth } }}>
                                <TextField label={t("Project")} placeholder="Placeholder text"
                                    onChange={(e, newValue) => setFilters(prev => ({ ...prev, project: newValue || '' }))}
                                />
                            </Stack.Item>
                            <Stack.Item grow styles={{ root: { flexBasis: itemWidth, maxWidth: itemWidth } }}>
                                <TextField label={t("Material User")}
                                    onChange={(e, newValue) => setFilters(prev => ({ ...prev, materialUser: newValue || '' }))}
                                />
                            </Stack.Item>
                            <Stack.Item grow styles={{ root: { flexBasis: itemWidth, maxWidth: itemWidth } }}>
                                <TextField label={t("RFQ Number")}
                                    onChange={(e, newValue) => setFilters(prev => ({ ...prev, rfqNumber: newValue || '' }))} />
                            </Stack.Item>

                            <Stack.Item grow styles={{ root: { flexBasis: itemWidth, maxWidth: itemWidth } }}>
                                <TextField label={t("Required Week From")} placeholder="YYYYWW"
                                    onChange={(e, newValue) => setFilters(prev => ({ ...prev, requiredWeekFrom: newValue || '' }))}
                                />
                            </Stack.Item>
                            <Stack.Item grow styles={{ root: { flexBasis: itemWidth, maxWidth: itemWidth } }}>
                                <TextField label={t("Required Week To")} placeholder="YYYYWW"
                                    onChange={(e, newValue) => setFilters(prev => ({ ...prev, requiredWeekTo: newValue || '' }))}
                                />
                            </Stack.Item>
                            <Stack.Item grow styles={{ root: { flexBasis: itemWidth, maxWidth: itemWidth } }}>
                                <DatePicker label={t("Created Date From")} placeholder="Select Date" ariaLabel="Select a date"
                                    onSelectDate={(date) =>
                                        setFilters(prev => ({
                                            ...prev,
                                            createdDateFrom: date || null, // 确保 date 为 null，而不是 undefined
                                        }))
                                    }

                                />

                            </Stack.Item>
                            <Stack.Item grow styles={{ root: { flexBasis: itemWidth, maxWidth: itemWidth } }}>
                                <DatePicker label={t("Created Date To")} placeholder="Select Date" ariaLabel="Select a date"
                                    onSelectDate={(date) =>
                                        setFilters(prev => ({
                                            ...prev,
                                            createdDateTo: date || null, // 确保 date 为 null，而不是 undefined
                                        }))
                                    } />
                            </Stack.Item>
                            <Stack.Item grow styles={{ root: { flexBasis: itemWidth, maxWidth: itemWidth, textAlign: 'right' } }}>
                                <PrimaryButton text={t("Search")} styles={{ root: { marginTop: 28, border: 'none', backgroundColor: '#99CCFF', height: 36, color: 'black', borderRadius: '4px', width: 150 } }}
                                    onClick={() => {
                                        const result = applyFilters();
                                        setFilteredItems(result);
                                    }} />
                            </Stack.Item>
                        </Stack>
                    </Stack>
                </Stack>
            )}

            {/* 表格和按钮区域
            <h3 className="mainTitle noMargin">{t('title')}</h3> */}
            {isFetching ? (
                <Spinner label={t('Loading...')} size={SpinnerSize.large} />
            ) : (
                <DetailsList
                    className="detailList"
                    items={filteredItems}//filteredItems allRequisitions
                    columns={columns}
                    setKey="set"
                    selection={selection}
                    layoutMode={DetailsListLayoutMode.fixedColumns}
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
            )}

            {/* 底部按钮 */}
            <Stack horizontal tokens={{ childrenGap: 10, padding: 10 }}>
                <PrimaryButton
                    text={t('Create')}
                    styles={{ root: { border: 'none', backgroundColor: '#99CCFF', height: 36, color: 'black' } }}
                    onClick={handleCreateRFQ}
                    disabled={selectedItems.length === 0}
                />
            </Stack>
        </Stack>
    );
};

export default Requisition;
