import { ServiceType, SupportRequestStatus } from "src/app/complex-types";
import { DocumentDto } from "src/app/models/document.dto";
import { OrderDto } from "../../order/models/order.dto";

export interface SupportRequestDto {
    id: number;
    title: string;
    subject: string;
    content: string;
    requestNumber: number;
    orderNumber: number;
    supportStatus: SupportRequestStatus;
    supportRequestTypeId: number;
    supportRequestType?:SupportRequestTypeDto;
    answerContent?: string;
    requesterUserId: number;
    createdDate: Date;
    // documents: Array<DocumentDto>;
    order: OrderDto
    supportRequestDocuments: Array<DocumentDto>;
}

export interface SupportRequestTypeDto {
    key: string;
    supportRequestName: string;
}

export interface AnswerSupportRequestDto {
    id: number;
    answerContent: string;
}