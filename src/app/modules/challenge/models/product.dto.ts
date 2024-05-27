import { ImageDto } from 'src/app/models/image.dto';
import { ProductFlagDto } from '../../product-flag/models/product-flag.dto';

export interface ProductDto {
  id: string;
  challengeName: string;
}

export interface ProductImageDto {
  id?: number;
  productId?: number;
  imageId: number;
  image: ImageDto
}

export interface ProductCategoryDto {
  categoryId: number;
  productId: number;
  displayOrder: number;
}

export interface ProductProductFlagDto {
  id: number;
  productFlagId: number;
  productFlag: ProductFlagDto;
  productId: number;
  displayOrder: number;
}

export interface ProductPriceDto {
  productId?: string;
  currency?: string;
  unitPrice?: number;
  discountedPrice?: number;
  status?: number
}

export interface VatRateDto {
  id: number;
  customerVatGroup: string;
  itemVatGroup: string;
  vat: string;
}

export interface ProductUnitDto {
  id: number;
  productId: number;
  pcsBox: number;
  boxPlt: number;
  boxHeight: number;
  boxWidth: number;
  boxLength: number;
  boxWeight: number;
  boxVolume: number;
}
