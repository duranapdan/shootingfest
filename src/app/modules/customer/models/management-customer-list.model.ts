import { PaginationParams } from "src/app/models/pagination-params.model";

export class ManagementCustomerListParams extends PaginationParams {
    public sort: string = "id asc";
    public search: string = '';
}

