import { IRequisitionGrid } from "./requisition";

export interface IRFQGrid {
  ID?: string;
  Title?: string;
  Parma?: string;
  SupplierContact?: string;
  RFQDueDate?: Date;
  OrderType?: string;
  RFQInstructionToSupplier?: string;
  RFQStatus?: string;
  BuyerInfo?: string;
  SectionInfo?: string;
  CommentHistory?: string;
  RequisitionIds?: string;
  QuoteReceivedDate?: Date;
  ReasonOfRFQ?: string;
  EffectiveDateRequest?: Date;
  HandlerName?: string;
  RFQNo?: string;
  Created?: Date;
  RFQType?: string;
}
export interface IRFQRequisition {
  RFQ: IRFQGrid;
  Requisitions: IRequisitionGrid[];
}
