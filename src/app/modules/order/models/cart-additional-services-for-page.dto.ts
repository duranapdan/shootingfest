export interface CartAdditionalServiceForPageDto {
    id: number;
    additionalServiceId: number;
    key: string;
    name: string;
    price: number;
    isParentService: boolean;
    parentServiceId: number;
}