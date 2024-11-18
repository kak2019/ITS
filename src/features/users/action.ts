import { createAsyncThunk } from "@reduxjs/toolkit";
import { CONST, FeatureKey } from "../../config/const";
import { spfi } from "@pnp/sp";
import { Caching } from "@pnp/queryable";
import { getSP } from "../../pnpjsConfig";
import { Logger, LogLevel } from "@pnp/logging";
import { MESSAGE } from "../../config/message";
import { AppInsightsService } from "../../config/AppInsightsService";
import { IUserMapping } from "../../model/userMapping";

//#region actions
export const getSupplierIdByUserEmailAction = createAsyncThunk(
  `${FeatureKey.USERS}/getSupplierIdByUserEmail`,
  async (email: string): Promise<string> => {
    const sp = spfi(getSP());
    const spCache = sp.using(Caching({ store: "session" }));
    try {
      let items: IUserMapping[] = [];
      let hasNext = true;
      let pageIndex = 0;
      while (hasNext) {
        const response = await spCache.web.lists
          .getByTitle(CONST.LIST_NAME_USERMAPPING)
          .items.select("UserEmail", "SupplierId")
          .top(5000)
          .skip(pageIndex * 5000)();
        items = items.concat(
          response.map((item) => {
            return {
              UserEmail: item.UserEmail,
              SupplierId: item.SupplierId,
            } as IUserMapping;
          })
        );
        hasNext = response.length === 5000;
        pageIndex += 1;
      }
      return items.filter((item) => item.UserEmail === email)[0].SupplierId;
    } catch (err) {
      Logger.write(
        `${CONST.LOG_SOURCE} (_getSupplierId) - ${JSON.stringify(err)}`,
        LogLevel.Error
      );
      AppInsightsService.aiInstance.trackEvent({
        name: MESSAGE.retrieveDataFailed,
        properties: { error: err },
      });
      return Promise.reject(MESSAGE.retrieveDataFailed);
    }
  }
);
//#endregion
//#region methods
//#endregion
