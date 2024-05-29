import { ProductTopInfoIconType } from 'src/app/complex-types';
import { DocumentDto } from 'src/app/models/document.dto';
import { ImageDto } from 'src/app/models/image.dto';
import { ProductTypeDto } from './product-type.dto';

export interface ProductDto {
  productCategories: Array<{ categoryId: number }>;
  id: number;
  name: string;
  key: string;
  description: string;
  seoTitleKey: string;
  seoDescriptionKey: string;
  seoUrlKey: string;
  seoTitle: string;
  seoDescription: string;
  seoUrl: string;
  code: string;
  erpBarcode: string;
  descKey: string;
  categories: Array<{ categoryId: number }>;
  productTypes: Array<ProductTypeDto>;
  productRelateds: Array<any>
  stockProduct: boolean;
  expirationDate: Date;
  availableDate: Date;
  productFlagId: number;
  coolerType: string;
  coolerSubType: string;
  brandId: number;
  deliveryStartDate: Date;
  shipmentDate: Date;
  itemVatGroup: string;
  isActive: boolean;
  isItInStock: boolean
  itemCategoryCode: string;
  mainImageId: number;
  mainImage: ImageDto;
  productPrice: ProductPriceDto;
  productImages: Array<ProductImageDto>;
  images: Array<ImageDto>;
  productUnits: Array<ProductUnitDto>;
  productFlags: Array<ProductProductFlagDto>;
  showOnHomepage: boolean;
  bestSeller: boolean;
  stockQuantity: number;
  topInfoIconType: ProductTopInfoIconType;
  topInfoTitle: string;
  topInfoDescription: string;
  quantity: number;
  isNewProduct: boolean;
  productTypeId: number;
  genderType: number
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
  productId: number;
  displayOrder: number;
}

export interface ProductPriceDto {
  productId?: number;
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
