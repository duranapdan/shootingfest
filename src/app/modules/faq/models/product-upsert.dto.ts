import { ProductPriceUpsertDto } from "./product-price-upsert.dto"

export interface ProductUpsertDto {
    id?: number;
    key: string;
    descKey: string;
    seoTitleKey:string;
    seoDescriptionKey:string;
    seoUrlKey:string;
    name: string;
    description: string;
    seoTitle:string;
    seoDescription:string;
    seoUrl:string;
    code: string;
    categories: Array<{ categoryId: number, displayOrder: number }>;
    stockProduct: boolean;
    isNewProduct: boolean;
    expirationDate: Date;
    availableDate: Date;
    productFlagId: number;
    productTypeId: number;
    brandId: number;
    deliveryStartDate: Date;
    shipmentDate: Date;
    isActive: boolean;
    itemVatGroup: string;
    itemCategoryCode: string;
    mainImageId: number;
    tokenMainImage: string;
    productImages: Array<string>;
    deletedImages: Array<number>;
    deletedDocuments: Array<number>;
    productPrices: Array<ProductPriceUpsertDto>;
    videos: Array<{
        linkUrl: string,
        name: string
    }>
}