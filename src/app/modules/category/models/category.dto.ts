import { RecordStatus } from "src/app/complex-types";
import { ImageDto } from "src/app/models/image.dto";

export interface CategoryDto {
    id?: number;
    name?: string;
    key?: string;
    showOnHomepage?: boolean;
    isActive?: boolean;
    image?: ImageDto;
    status?: RecordStatus;
    displayOrder?:number;
    categoryId?:number
    checked?:boolean;
    seoTitleKey?:string;
    seoDescriptionKey?:string;
    seoUrlKey?:string;
    seoTitle?:string;
    seoDescription?:string;
    seoUrl?:string;
    children?: CategoryDto[],
    parent?: any
    parentId?:number
    //NOT MAPPED
    isOpened?: boolean;
}

export interface CategoryUpsertDto {
    id: number;
    name: string;
    key: string;
    showOnHomepage: boolean;
    isActive: boolean;
    seoTitleKey:string;
    seoDescriptionKey:string;
    seoUrlKey:string;
    seoTitle:string;
    seoDescription:string;
    seoUrl:string;
}