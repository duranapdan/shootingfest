import { ImageDto } from 'src/app/models/image.dto';

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
