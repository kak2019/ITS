declare let azureFunctionBaseUrl: string;
declare let aadClientId: string;
declare let appInsightsKey: string;
export class HostSettings {
  public static get AzureHost(): string {
    return azureFunctionBaseUrl;
  }
  public static get AadClientId(): string {
    return aadClientId;
  }
  public static get AppInsightsKey(): string {
    return appInsightsKey;
  }
}
const CONST = {
  LIST_NAME_REQUISITION: "Requisition",
  LIST_NAME_RFQ: "RFQs",
  LIST_NAME_USERMAPPING: "UserSupplierMapping",
  LIST_NAME_USERROLE: "User Role",
  CONFIGLIB_Name: "SiteAssets",
  SPLITTER: "; ",
  LOG_SOURCE: "🔶gsits",
  LIBRARY_NAME: "Documents",
  azureFunctionBaseUrl: HostSettings.AzureHost,
  aadClientId: HostSettings.AadClientId,
  appInsightsKey: HostSettings.AppInsightsKey,
};
/**
 * State feature key (prefix of action name)
 */
const FeatureKey = {
  PARMAS: "PARMAS",
  BUYERS: "BUYERS",
  RFQS: "RFQS",
  QUOTATIONS: "QUOTATIONS",
  DOCUMENTS: "DOCUMENTS",
  REQUISITIONS: "REQUISITIONS",
  USERS: "USERS",
} as const;
export { CONST, FeatureKey };
