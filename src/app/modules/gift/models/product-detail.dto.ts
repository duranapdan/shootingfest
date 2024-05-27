import { ImageDto } from "src/app/models/image.dto";
import { DocumentForProductDetailDto } from "./document-for-product-detail.dto";
import { OrderUnitForProductDetailDto } from "./order-unit-for-product-detail.dto";
import { ProductTypeDto } from "./product-type.dto";
import { VideoForProductDetailDto } from "./video-for-product-detail.dto";

export interface ProductDetailDto {
    id: number;
    images: Array<ImageDto>;
    stockAvaibleStatus: boolean;
    lastUseDate: Date;
    name: string;
    brand: string;
    categoryName: string;
    price: number;
    currency: string;
    productType: ProductTypeDto;
    orderUnits: Array<OrderUnitForProductDetailDto>;
    description: string;
    documents: Array<DocumentForProductDetailDto>;
    videos: Array<VideoForProductDetailDto>;
}