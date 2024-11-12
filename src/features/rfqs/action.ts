import { createAsyncThunk } from "@reduxjs/toolkit";
import { CONST, FeatureKey } from "../../config/const";
import { spfi } from "@pnp/sp";
import { Caching } from "@pnp/queryable";
import { getSP } from "../../pnpjsConfig";
import { Logger, LogLevel } from "@pnp/logging";
import { MESSAGE } from "../../config/message";
import { IRFQGrid } from "../../model/rfq";

//#region actions
export const getAllRFQsAction = createAsyncThunk(
  `${FeatureKey.RFQS}/getAllRFQs`,
  async (): Promise<IRFQGrid[]> => {
    const sp = spfi(getSP());
    const spCache = sp.using(Caching({ store: "session" }));
    try {
      let items: IRFQGrid[] = [];
      let hasNext = true;
      let pageIndex = 0;
      while (hasNext) {
        const response = await spCache.web.lists
          .getByTitle(CONST.LIST_NAME_RFQ)
          .items.select("ID", "Title")
          .top(5000)
          .skip(pageIndex * 5000)();
        items = items.concat(
          response.map((item) => {
            return {
              ID: item.ID,
              Title: item.Title,
            } as IRFQGrid;
          })
        );
        hasNext = response.length === 5000;
        pageIndex += 1;
      }
      return items;
    } catch (err) {
      Logger.write(
        `${CONST.LOG_SOURCE} (_getAllRFQs) - ${JSON.stringify(err)}`,
        LogLevel.Error
      );
      return Promise.reject(MESSAGE.retrieveDataFailed);
    }
  }
);
export const updateRFQAction = createAsyncThunk(
  `${FeatureKey.RFQS}/updateRFQ`,
  async (RFQ: IRFQGrid): Promise<void> => {
    const sp = spfi(getSP());
    const spCache = sp.using(Caching({ store: "session" }));
    try {
      await spCache.web.lists
        .getByTitle(CONST.LIST_NAME_RFQ)
        .items.getById(+RFQ.ID)
        .update({
          ID: RFQ.ID,
          Title: RFQ.Title,
        });
    } catch (err) {
      Logger.write(
        `${CONST.LOG_SOURCE} (_updateRFQ) - ${JSON.stringify(err)}`,
        LogLevel.Error
      );
      return Promise.reject(MESSAGE.updateDataFailed);
    }
  }
);
export const createRFQAction = createAsyncThunk(
  `${FeatureKey.RFQS}/createRFQ`,
  async (RFQ: IRFQGrid): Promise<void> => {
    const sp = spfi(getSP());
    const spCache = sp.using(Caching({ store: "session" }));
    try {
      await spCache.web.lists.getByTitle(CONST.LIST_NAME_RFQ).items.add({
        ID: RFQ.ID,
        Title: RFQ.Title,
      });
    } catch (err) {
      Logger.write(
        `${CONST.LOG_SOURCE} (_updateRFQ) - ${JSON.stringify(err)}`,
        LogLevel.Error
      );
      return Promise.reject(MESSAGE.retrieveDataFailed);
    }
  }
);
//#endregion
//#region methods
//#endregion
