import { RecordStatus } from "src/app/complex-types";
import { CompanyDto } from "src/app/models/video.dto";
import { AddressDto } from "src/app/shared/models/address.dto";
import { UserDto } from "../../auth";
import { CartAdditionalServicesDto } from "./cart-additional-services.dto";
import { CartCoinRewardDto } from "./cart-coin-reward-dto";
import { CartDetailItemDto } from "./cart-detail-item.dto";
import { CoinDto } from "./coin.dto";
import { ContainerVolumeDto } from "./container-volume-dto";
import { ContainerTypeDto, CouponCodeDto, PromotionGetDto } from "./order.dto";
import { PaymentDto } from "./payment.dto";

export interface CartDto {
  id: number;
  userId: number;
  userEmail: string;
  userFirstName: string;
  userLastName: string;
  note: string;
  companyId: number;
  containerTypeId: number;
  shipperId: number;
  paymentId: number;
  couponCodeId: number;
  promotionId: number;
  coinTransactionId: number;
  itemsCount: number;
  itemsQuantity: number;
  shippingPrice: number;
  serviceFee: number;
  grandTotal: number;
  taxTotal: number;
  discountAmount: number;
  deliveryAddressId: number;
  billingAddressId: number;
  price: number;
  promotionPrice: number;
  coinTransactionPrice: number;
  //cartStatus: CartStatus;
  status: RecordStatus;
  user: UserDto;
  company: CompanyDto;
  containerType: ContainerTypeDto;
  shipper: ShipperDto;
  payment: PaymentDto;
  couponCode: CouponCodeDto;
  promotion: PromotionGetDto;
  coin: CoinDto;
  deliveryAddress: AddressDto;
  billingAddress: AddressDto;
  cartItems: Array<CartDetailItemDto>;
  additionalServices: CartAdditionalServicesDto;
  containerVolume: ContainerVolumeDto;
  cartCoinReward: CartCoinRewardDto;
}

export interface ShipperDto {
  id: number;
  companyName: string;
  price: number;
}