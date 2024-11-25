import { IRequisitionGrid } from "./requisition";

export interface IRFQGrid {
  ID?: string; //SharePoint Item Id
  Title?: string; //Column "Title"
  Parma?: string; //Column "Parma"
  SupplierContact?: string; //Column "Supplier Contact"
  RFQDueDate?: Date; //Column "RFQ Due Date"
  OrderType?: string; //Column "Order Type"
  RFQInstructionToSupplier?: string; //Column "RFQ Instruction To Supplier"
  RFQStatus?: string; //Column "RFQ Status"
  BuyerInfo?: string; //Column "Buyer Info"
  SectionInfo?: string; //Column "Section Info"
  CommentHistory?: string; //Column "Comment History"
  RequisitionIds?: string; //Column "Requisition Ids"
  QuoteReceivedDate?: Date; //Column "Quote Received Date"
  ReasonOfRFQ?: string; //Column "Reason of RFQ"
  EffectiveDateRequest?: Date; //Column "Effective Date Request"
  HandlerName?: string; //Column "Handler Name"
  RFQNo?: string; //Column "RFQ No."
  Created?: Date; //SharePoint Item Create Date
  RFQType?: string; //Column "RFQ Type"
}
export interface IRFQRequisition {
  RFQ: IRFQGrid;
  Requisitions: IRequisitionGrid[];
}
