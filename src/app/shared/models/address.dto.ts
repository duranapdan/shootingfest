import { AddressTypes } from "src/app/complex-types";
import { CompanyDto } from "src/app/models/video.dto";

export interface AddressDto {
    id: number;
    addressTitle: string;
    addressContactFullName: string;
    companyName: string;
    phoneNumberCountryCode: string;
    phone: string;
    email: string;
    countryId: number;
    cityId: number;
    postalCode: string;
    addressText: string;
    addressType: AddressTypes;
    companyId: number;
    suspended: boolean;
    country: string;
    city: string;
    company: CompanyDto;
    createdBy: string;
    createdDate: Date;
}