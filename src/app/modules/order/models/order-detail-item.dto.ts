import { OrderItemOrderUnitDto } from "./order-item-order-unit.dto";

export interface OrderDetailItemDto {
    id: number;
    productId: number;
    productName: string;
    productCode: string;
    productImage: string;
    brandId: number;
    brandName: string;
    productTypeId: number;
    productType: string;
    orderUnit?: OrderItemOrderUnitDto;
    unitPrice: number;
    price: number;
    quantity: number;
    tax: number;
    taxRate: number;
    total: number;
    itemVatGroup: string;
}
