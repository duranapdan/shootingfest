import { ServiceType } from "src/app/complex-types";

export interface GetGroupListDto {
    name: string;
    key: string;
    serviceDetails: Array<GetGroupListServiceDetailDto>;
    type: ServiceType;
    isActive: boolean;
}

export interface GetGroupListServiceDetailDto {
    id: number;
    type: ServiceType;
    isActive: boolean;
    code: string;
    price: number;
    companyTypeId: number;
    productId: number;
}

export interface CompanyTypePricesDto {
    id?: number;
    type?: number;
    companyTypeId?: number;
    price?: number;
    isRequired?: boolean;
}

export interface AdditionalServiceUpsertDto {
    id: number;
    key: string;
    code: string;
    companyTypePrices: Array<CompanyTypePricesDto>;
    type: ServiceType;
    isActive: boolean;
}