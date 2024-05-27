import { RecordStatus } from "src/app/complex-types";
import { ImageDto } from "src/app/models/image.dto";

export interface ContactAddressDto {
    id: number;
    image: ImageDto;
    titleKey: string;
    addressKey: string;
    workingHoursKey: string;
    title: string;
    address: string;
    phoneNumberCountryCode: string;
    phone: string;
    email: string;
    workingHours: string;
    latitudeLongitude: string;
    sortOrder: number;
    status: RecordStatus;
}

export interface ContactAddressUpsertDto {
    id: number;
    titleKey: string;
    addressKey: string;
    workingHoursKey: string;
    title: string;
    phoneNumberCountryCode: string;
    phone: string;
    email: string;
    latitudeLongitude: string;
    sortOrder: number;
    status: RecordStatus;
}

export interface ContactFormDto {
    id: number;
    name: string;
    phone: string;
    email: string;
    subject: string;
    message: string;
    createdDate: Date;
}