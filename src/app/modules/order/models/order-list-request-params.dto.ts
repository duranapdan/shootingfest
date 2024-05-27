import { OrderStatus } from "src/app/complex-types";
import { PaginationParams } from "src/app/models/pagination-params.model";

export class OrderListRequestParams extends PaginationParams {
    public sort: string = "id asc";
    public search: string = '';
    public orderStatus: OrderStatus = OrderStatus.AwaitingApproval;
    public erpNotSend: boolean = false;
}
