declare let azureFunctionBaseUrl: string;
declare let aadClientId: string;
export class HostSettings {
  public static get AzureHost(): string {
    return azureFunctionBaseUrl;
  }
  public static get AadClientId(): string {
    return aadClientId;
  }
}
const CONST = {
  LIST_NAME_REQUISITION: "Requisition",
  LIST_NAME_RFQ: "RFQs",
  CONFIGLIB_Name: "SiteAssets",
  SPLITTER: "; ",
  LOG_SOURCE: "🔶gsits",
  LIBRARY_NAME: "Documents",
  azureFunctionBaseUrl: HostSettings.AzureHost,
  aadClientId: HostSettings.AadClientId,
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
} as const;
export { CONST, FeatureKey };
