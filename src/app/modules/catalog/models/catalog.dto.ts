import { RecordStatus } from "src/app/complex-types";
import { DocumentDto } from "src/app/models/document.dto";
import { ImageDto } from "src/app/models/image.dto";
import { BrandDto } from "../../brand/models/brand.dto";

export interface CatalogDto {
    id: number;
    name: string;
    key: string;
    imageId: number;
    image?: ImageDto;
    documentId: number;
    document: DocumentDto;
    brandId: number;
    brand: BrandDto;
    status: RecordStatus;
}
