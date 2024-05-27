import { ImageDto } from "src/app/models/image.dto";

export interface ProductFlagDto {
    id: number;
    name: string;
    key: string;
    image: any;
    images: Array<any>
}