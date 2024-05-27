import { ProductUnitDto } from "../../users/models/product.dto";
import { CartItemOrderUnitDto } from "./cart-item-order-unit.dto";
import { OrderUnitReadDto } from "./order.dto";

export interface CartDetailItemDto {
    id: number;
    productId: number;
    productName: string;
    productCode: string;
    productImage: string;
    brandId: number;
    brandName: string;
    productTypeId: number;
    productType: string;
    productUnit: ProductUnitDto;
    orderUnit?: CartItemOrderUnitDto;
    orderUnits?: OrderUnitReadDto[];
    unitPrice: number;
    price: number;
    quantity: number;
    tax: number;
    taxRate: number;
    total: number;
    itemVatGroup: string;
    removableAmount: number;

    // NOT MAPPING
    cartItemDetailId: number
} 