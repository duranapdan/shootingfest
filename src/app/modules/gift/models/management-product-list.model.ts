import { PaginationParams } from "src/app/models/pagination-params.model";

export class ManagementProductListParams extends PaginationParams {
    public sort: string = "id asc";
    public search: string = '';
    public isActive: boolean = true;
    public categoryId: number = 0;
    public companyTypeId: number = 0;
}

