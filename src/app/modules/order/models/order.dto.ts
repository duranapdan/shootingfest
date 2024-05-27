import { AddressTypes, DiscountType, OrderStatus, OrderUnitType, PromotionType, RecordStatus, TransactionType } from "src/app/complex-types";
import { ImageDto } from "src/app/models/image.dto";
import { CompanyDto } from "src/app/models/video.dto";
import { UserDto } from "../../auth";
import { ProductDto } from "../../users/models/product.dto";
import { ContainerVolumeDto } from "./container-volume-dto";

export interface OrderDto {
    id: number;
    cartId: number;
    orderNo: number;
    userId: number;
    userEmail: string;
    userFirstName: string;
    userLastName: string;
    note: string;
    companyId: number;
    containerTypeId: number;
    shipperId: number;
    couponCodeId: number;
    promotionId: number;
    coinTransactionId: number;
    itemsCount: number;
    itemsQuantity: number;
    shippingPrice: number;
    serviceFee: number;
    grandTotal: number;
    price: number;
    taxTotal: number;
    discountAmount: number;
    promotionPrice: number;
    coinTransactionPrice: number;
    orderStatus: OrderStatus;
    orderDate: Date;
    deliveredDate: Date;
    status: RecordStatus;
    erpOrderNo: string;
    erpSendingDate: Date;
    erpInvoiceNo: string;
    user: UserDto;
    company: CompanyDto;
    containerType: ContainerTypeDto;
    orderProformaPath: string;
    orderInvoicePath: string;
    shipper: ShipperListDto;
    couponCode: CouponCodeDto;
    promotion: PromotionGetDto;
    coinTransaction: CoinTransactionDto;
    listOrderItems: Array<OrderItemDto>;
    listOrderAddresses: Array<OrderAddressDto>;
    containerVolume: ContainerVolumeDto,
    isViewingSupportRequest: boolean;
    orderCancellationTypeId?: number;
    orderCancellationMessage?: string;
    orderCancellationType?: OrderCancellationTypeDto;
    orderRefundMessage?: string;
    //additionalServices: OrderAdditionalServicesDto ;
    //orderPayment: OrderPaymentDto ;
}
export interface CountryReadDto {
    id: number;
    iso: string;
    name: string;
    niceName: string;
    iso3: string;
    numCode: string;
    phoneCode: string;
}
export interface OrderAddressDto {
    id: number;
    orderId: number;
    addressId: number;
    addressTitle: string;
    addressContactFullName: string;
    companyId: number;
    companyName: string;
    phone: string;
    email: string;
    countryId: number;
    cityId: number;
    addressText: string;
    addressType: AddressTypes;
    sameWithBillingAddress: boolean;
    order: OrderDto;
    country: CountryReadDto;
    city: CityReadDto;
    company: CompanyDto;

}
export interface CityReadDto {
    id: number;
    cityName: string;
    countryId: number;
}
export interface OrderItemDto {
    id: number;
    orderId: number;
    productId: number;
    productName: string;
    quantity: number;
    price: number;
    unitPrice: number;
    total: number;
    tax: number;
    discount: number;
    discountedUnitPrice: number;
    orderUnitId: number;
    orderUnit: OrderUnitReadDto;
    product: ProductDto
}

export interface OrderUnitReadDto {
    id: number;
    name: string;
    key: string;
    quantity: number;
    orderUnitPieces: number;
    orderUnitBoxPieces: number;
    orderUnitType: OrderUnitType;

}

export interface ContainerTypeDto {
    id: number;
    name: string;
    key: string;
    description: string;
    imageId: number;
    image: ImageDto;
    code: string;
    palletCapacity: number;
    cargoWeight: string;
    cubicCapacity: string;
}

export interface ShipperListDto {
    id: number;
    companyName: string;
    price: number;
}

export interface CouponCodeDto {
    id: number;
    name: string;
    key: string;
    code: string;
    descriptionKey: string;
    description: string;
    startDate: Date;
    endDate: Date;
    usageLimit: number;
    discountType: number;
    discountAmount: number;
    companyId: number;
}

export interface PromotionGetDto {
    id: number;
    key: string;
    name: string;
    description: string;
    descriptionKey: string;
    userId: number;
    companyId: number;
    imageId: number;
    membershipStatusId: number;
    minValue: number;
    usageLimit: number;
    startDate: Date;
    endDate: Date;
    promotionType: PromotionType;
    discountType: DiscountType;
    discount: number;
    couponCode: string;
    minCoinValue: number;
    user: UserDto;
    image: ImageDto;
    company: CompanyDto;
    promotionRequiredProducts: [],
    promotionPromotedProducts: []

}
export interface MembershipStatusDto {
    id: number;
    name: string;
    key: string;
    minOrderCount: number;
    minOrderSum: number;
}

export interface CoinTransactionDto {
    id: number;
    membershipStatusId: number;
    userId: number;
    orderId: number;
    orderTotal: number;
    coinAmount: number;
    transactionType: TransactionType;
    transactionDate: Date;
    membershipStatus: MembershipStatusDto;
    user: UserDto;
    order: OrderDto;
}

export interface OrderCancellationTypeDto {
    id?: number;
    key?: string;
    name?: string;
}
