
export interface ProductForListDto {
    id: number;
    giftName: string;
    giftDescription: string;
    giftImageUrl: string;
    points: number;
    status: boolean;
    createdBy: string;
    createdDate: string;
    modifiedBy: string;
    modifiedDate: string;
    isDeleted: boolean;
    deletedDate: null | string;
    baseUrl: string;
}