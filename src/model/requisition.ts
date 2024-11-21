export interface IRequisitionGrid {
  ID?: string;
  UniqueIdentifier?: string;
  IsSelected?: boolean;
  RequisitionType?: string;
  Section?: string;
  Status?: string;
  PartNumber?: string;
  Qualifier?: string;
  MaterialUser?: string;
  Project?: string;
  RequiredWeek?: string;
  CreateDate?: Date;
  RfqNo?: string;
  Parma?: string;
  PartDescription?: string;
  AnnualQty?: number;
  OrderQty?: number;
  ReqBuyer?: string;
  Handler?: string;
  HandlerName?: string;
  BuyerFullInfo?: string;
  SectionDescription?: string;
}
