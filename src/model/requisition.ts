export interface IRequisitionGrid {
<<<<<<< HEAD
  ID: string; //SharePoint Item Id
  UniqueIdentifier: string; //Column "Title"
  IsSelected?: boolean; // For Grid View, No Corresponding SharePoint List Column
  RequisitionType: string; //Column "Requisition Type"
  Section: string; //Column "Section"
  Status: string; //Column "Status"
  PartNumber: string; //Column "Part Number"
  Qualifier: string; //Column "Qualifier"
  MaterialUser: string; //Column "Material User"
  Project?: string; //Column "Pproject"
  RequiredWeek?: string; //Column "Required Week"
  CreateDate?: Date; //Column "Create Date"
  RfqNo?: string; //Column "RFQ Number"
  Parma?: string; //Column Parma
  PartDescription: string; //Column "Part Description"
  AnnualQty?: number; //Column "Annual Qty"
  OrderQty?: number; //Column "Order Qty"
  ReqBuyer: string; //Column "Requisition Buyer"
  Handler: string; //Column "Handler"
  HandlerName: string; //Column "Handler Name"
  BuyerFullInfo: string; //Column "Buyer Full Info" Used for Buyer filter
  SectionDescription: string; //Column "Section Description" Used for Section filter
  Porg: string; //Column "Porg"
=======
  ID: string;
  UniqueIdentifier: string;
  IsSelected?: boolean;
  RequisitionType: string;
  Section: string;
  Status: string;
  PartNumber: string;
  Qualifier: string;
  MaterialUser: string;
  Project?: string;
  RequiredWeek?: string;
  CreateDate?: Date;
  RfqNo?: string;
  Parma?: string;
  PartDescription: string;
  AnnualQty?: number;
  OrderQty?: number;
  ReqBuyer: string;
  Handler: string;
  HandlerName: string;
  BuyerFullInfo: string;
  SectionDescription: string;
  Porg:string;
>>>>>>> 1b84c9ff7e472794773c3608bf943865b1c1b33f
}
