import { ImageDto } from "src/app/models/image.dto";
import { BrandDto } from "../../brand/models/brand.dto";
import { CategoryDto } from "../../category/models/category.dto";
import { ProductFlagDto } from "../../product-flag/models/product-flag.dto";
import { ProductTagDto } from "../../product-tag/models/product-tag.dto";
import { ProductTypeDto } from "./product-type.dto";
import { ProductProductFlagDto } from "./product.dto";
import { GenderDto } from "./gender.dto";

export interface ProductForListDto {
    id: string;
    status: number;
    fullName: string;
    point: number;
    ranking: number;
    gift: number;
    challenge: number;
    age: number;
    gender: number;
    country: string;
    phoneNumberCountryCode: string;
    phoneNumber: string;
    imagePath: null | string;
    showProfilePhoto: boolean;
    showScore: boolean;
    showVideoRating: boolean;
}