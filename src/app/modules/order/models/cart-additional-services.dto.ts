import { CartAdditionalServiceForPageDto } from "./cart-additional-services-for-page.dto";

export interface CartAdditionalServicesDto {
    services: Array<CartAdditionalServiceForPageDto>;
    stickers: Array<CartAdditionalServiceForPageDto>;
}