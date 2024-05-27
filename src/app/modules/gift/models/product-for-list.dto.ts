import { ImageDto } from "src/app/models/image.dto";
import { BrandDto } from "../../brand/models/brand.dto";
import { CategoryDto } from "../../category/models/category.dto";
import { ProductFlagDto } from "../../product-flag/models/product-flag.dto";
import { ProductTagDto } from "../../product-tag/models/product-tag.dto";
import { ProductTypeDto } from "./product-type.dto";
import { ProductProductFlagDto } from "./product.dto";

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
}