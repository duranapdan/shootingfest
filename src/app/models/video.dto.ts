import { UserDto } from "../modules/auth";

export interface VideoDto {
    id: number;
    token: string;
    key: string;
    name: string;
    linkUrl: string;
    companyId: number;
    company: CompanyDto;
    userId: number;
    user: UserDto;
    productId: number;
}

export interface CompanyDto {
    id: number;
    userId: number;
    token: string;
    name: string;
    companyTypeId: number;
    export: boolean;
    contactName: string;
    contactCode: string;
    phoneNumberCountryCode: string;
    phone: string;
    email: string;
    taxOffice: string;
    taxNo: string;
    erpCode: string;
    allowSendingMailSmsAndNotification: boolean;
    suspended: boolean;
    customerVatGroup: string;
}