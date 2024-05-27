import { ImageDto } from "src/app/models/image.dto";
import { LanguageDto } from "../../translation/services/translation.service";

export interface BannerDto {
    id?: number;
    redirectUrl: string;
    expireDate: Date;
    image: ImageDto;
    languageId: number;
    language?: LanguageDto;
    languageSymbol:string
    imagePath:string
}

export interface BannerUpsertDto {
    data: {
    id?: number;
    redirectUrl: string;
    expireDate?: Date;
    tokens: string;
    languageId: number;
}
}
