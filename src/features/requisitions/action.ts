import { createAsyncThunk } from "@reduxjs/toolkit";
import { CONST, FeatureKey } from "../../config/const";
import { spfi } from "@pnp/sp";
import { Caching } from "@pnp/queryable";
import { getSP } from "../../pnpjsConfig";
import { Logger, LogLevel } from "@pnp/logging";
import { MESSAGE } from "../../config/message";
import { IRequisition } from "../../model/requisition";

//#region actions
export const getAllRequisitionsAction = createAsyncThunk(
  `${FeatureKey.REQUISITIONS}/getAllRequisitions`,
  async (): Promise<IRequisition[]> => {
    const sp = spfi(getSP());
    const spCache = sp.using(Caching({ store: "session" }));
    try {
      let items: IRequisition[] = [];
      let hasNext = true;
      let pageIndex = 0;
      while (hasNext) {
        const response = await spCache.web.lists
          .getByTitle(CONST.LIST_NAME_REQUISITION)
          .items.select(
            "Title",
            "ID",
            "RequisitionType",
            "Section",
            "Status",
            "PartNumber",
            "Qualifier",
            "MaterialUser",
            "Pproject",
            "RFQNumber",
            "Parma",
            "PartDescription",
            "AnnualQty",
            "OrderQty",
            "RequiredWeek",
            "CreatedDate",
            "RequisitionBuyer",
            "HandlerName",
            "BuyerFullInfo"
          )
          .top(5000)
          .skip(pageIndex * 5000)();
        items = items.concat(
          response.map((item) => {
            return {
              UniqueIdentifier: item.Title,
              IsSelected: false,
              RequisitionType: item.RequisitionType,
              Section: item.Section,
              Status: item.Status,
              PartNumber: item.PartNumber,
              Qualifier: item.Qualifier,
              MaterialUser: item.MaterialUser,
              Project: item.Pproject,
              RequiredWeek: item.RequiredWeek,
              CreateDate:
                item.CreatedDate === null
                  ? null
                  : stringToDate(item.CreatedDate),
              RfqNo: item.RFQNumber,
              Parma: item.Parma,
              PartDescription: item.PartDescription,
              AnnualQty: item.AnnualQty,
              OrderQty: item.OrderQty,
              ReqBuyer: item.RequisitionBuyer,
              HandlerName: item.HandlerName,
              BuyerFullInfo: item.BuyerFullInfo,
            } as IRequisition;
          })
        );
        hasNext = response.length === 5000;
        pageIndex += 1;
      }
      return items;
    } catch (err) {
      Logger.write(
        `${CONST.LOG_SOURCE} (_readAllFilesSize) - ${JSON.stringify(err)}`,
        LogLevel.Error
      );
      return Promise.reject(MESSAGE.retrieveDataFailed);
    }
  }
);
//#endregion
//#region methods
function stringToDate(dateString: string): Date {
  const year = Number(`20${dateString.substring(0, 2)}`);
  const month = Number(dateString.substring(2, 4));
  const day = Number(dateString.substring(4, 6));
  return new Date(year, month, day);
}
//#endregion
