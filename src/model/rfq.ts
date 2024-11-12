import { IRequisitionGrid } from "./requisition";

export interface IRFQGrid {
  ID?: string;
  Title?: string;
  Parma?: string;
  RFQDueDate?: string;
  OrderType?: string;
  RFQInstructionToSupplier?: string;
  SupplierContact?: string;
  RFQStatus?: string;
  BuyerInfo?: string;
  SectionInfo?: string;
  Comment?: string;
  CommentHistory?: string;
  RequisitionIds?: string;
  QuoteReceivedDate?: Date;
  Created?: Date;
}
export interface IRFQRequisition {
  RFQ: IRFQGrid;
  Requisitions: IRequisitionGrid[];
}
