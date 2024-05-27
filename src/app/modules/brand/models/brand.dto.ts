import { ImageDto } from "src/app/models/image.dto";

export interface BrandDto {
    id?: number;
    subBrandId?: number;
    name?: string;
    key?: string;
    image?: ImageDto;
    imageId?:number;
    imageKey?:string;
    imageLangSymbol?:string;
    imagePath?:string;
}
