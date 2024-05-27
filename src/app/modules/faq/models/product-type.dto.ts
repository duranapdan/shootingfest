import { ImageDto } from "src/app/models/image.dto";

export interface ProductTypeDto {
    id?: number;
    name?: string;
    key?: string;
    image?: ImageDto |undefined;
    imageId?:number
}