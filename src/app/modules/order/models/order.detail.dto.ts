import { OrderStatus } from 'src/app/complex-types';
import { AddressDto } from 'src/app/shared/models/address.dto';
import { CartDto } from './cart.dto';
import { OrderDetailItemDto } from './order-detail-item.dto';
import { OrderPaymentDto } from './order-payment.dto';
import { OrderDto } from './order.dto';

export interface OrderDetailDto {
  shoppingCartDetailItems: Array<OrderDetailItemDto>;
  billAddress: AddressDto;
  deliveryAddress: AddressDto;
  orderSummary: OrderDto;
  orderDate: Date;
  orderStatus: OrderStatus;
  orderPayment: OrderPaymentDto;
  isAvailableCancel: boolean;
  isAvailableRepeat: boolean;
  isAvailableRefund: boolean;
}
