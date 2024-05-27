export interface CoinPeriodModel {
    id?: number;
    statement?: string;
    startDate?: Date;
    endDate?: Date;
}
export interface CoinPeriodExportDto {
    coinPeriodId: number;
    coinPeriod: string;
    userId: number;
    userFirstName: string;
    userLastName: string;
    userEmail: string;
    userMembershipStatusId: number;
    userMembershipStatus: string;
    userCreatedDate: Date;
    userCompanyId: number;
    userCompanyName: string;
    userCompanyEmail: string;
    userCompanyTypeId: number;
    userCompanyTypeName: string;

    totalEarnAmount: number;
    totalUseAmount: number;
    totalCoinAmount: number;
    totalOrderAmount: number;
    gift: string;
}