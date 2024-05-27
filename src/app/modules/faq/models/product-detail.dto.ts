
export interface ProductDetailDto {
    id: string,
    questionText: string,
    answerText: string,
    faqOrder: number,
    status: number,
    createdBy: string,
    createdDate: string,
    modifiedBy: string,
    modifiedDate: string,
    isDeleted: boolean,
    deletedDate: string,
    userId: string | null;
}

