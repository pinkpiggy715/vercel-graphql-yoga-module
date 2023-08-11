export type getFactoryResponse = {
  asOfDateTime: string;
  factory: string;
  factoryName: string;
  id: number;
  isActive: boolean;
  lastPlannedVrlAssignment: string;
  lastUpdateDatetime: string;
  lastUpdatedBy: string;
}[];

export type getFactoryDetailResponse = {
  createDate: string;
  deactivationDate: null | string;
  effectiveDate: string;
  factory: string;
  fileName: string;
  id: number;
  isActive: boolean;
  updatedBy: string;
  uploadId: string;
}[];
