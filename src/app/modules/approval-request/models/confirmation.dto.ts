import { ConfirmationTypes, ConfirmStatus } from "src/app/complex-types";

export interface ConfirmationDto {
    id: number;
    entityId: number;
    entityName: string;
    transactionDescription: string;
    oldData: string;
    newData: string;
    diffOldData: string;
    diffNewData: string;
    description: string;
    changeUserAndCompanyName: string;
    rejectMessage: string;
    rejectIsSilent: boolean;
    requiredModifyFields: string;
    confirmStatus: ConfirmStatus;
    confirmationType: ConfirmationTypes;
}

export interface ConfirmationRejectDto {
    id: number;
    message: string;
    isSilent: boolean;
    requiredModifyFields: Array<string>;
}
