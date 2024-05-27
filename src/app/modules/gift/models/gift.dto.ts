export interface GiftDto {
    id: string;
    giftName: string;
    giftDescription: string;
    giftImageUrl: string;
    points: string;
    status: boolean;
    createdBy: string;
    createdDate: string;
    modifiedBy: string;
    modifiedDate: string;
    isDeleted: boolean;
    deletedDate: null | string;
    file: Blob;
    fileName: string
}