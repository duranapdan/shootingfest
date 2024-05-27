import { ImageDto } from "src/app/models/image.dto";

export interface CampaignDto {
    id: number;
    key: string;
    headerKey: string;
    contentKey: string;
    redirectUrlKey: string;
    name: string;
    header: string;
    content: string;
    redirectUrl: string;
    imageId: number;
    image: ImageDto;
    order: number;
    startDate: string;
    endDate: string;
    status: number;
  }