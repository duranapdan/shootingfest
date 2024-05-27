import { ImageDto } from "src/app/models/image.dto";
import { LanguageDto } from "src/app/modules/translation/services/translation.service";


export interface BankDto {
    id?: number
    firstName: string
    lastName: string
    bankName: string
    accountName: string
    branchCode: string
    accountNo: string
    iban: string
    swiftCode: string
}

export interface BankUpsertDto {
    data: {
        tokens: any
        id?: number
        firstName: string
        lastName: string
        bankName: string
        accountName: string
        branchCode: string
        accountNo: string
        iban: string
        swiftCode: string

    }
}
