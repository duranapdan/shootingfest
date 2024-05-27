import { ImageDto } from 'src/app/models/image.dto';

export interface FavouriteProductListDto {
  productId: number;
  productCode: string;
  productName: string;
  price: number;
  images: Array<ImageDto>;
  mainImage: ImageDto;
}
