import { DocumentDto } from "src/app/models/document.dto";
import { AddressDto } from "src/app/shared/models/address.dto";
import { UserDto } from "../../auth";

export interface CustomerDto {
    id: number;
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
    addresses: Array<AddressDto>;
    users: Array<UserDto>;
    companyDocuments: Array<DocumentDto>;
}