import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { AppService } from "src/app/app.service";
import { IDataResult } from "src/app/models/api-data-result.model";
import { PagedList } from "src/app/models/api-paged-data-result.model";
import { IResult } from "src/app/models/api-result.model";
import { environment } from "src/environments/environment";
import { CompanyTypeDto } from "../models/company-type.dto";
import { CustomerDto } from "../models/customer.dto";
import { FavouriteProductListDto } from "../models/favourite-product-list.dto";
import { ManagementCustomerListParams } from "../models/management-customer-list.model";

@Injectable()
export class CustomerService {

    private _isLoading = false;
    public get isLoading(): boolean {
        return this._isLoading;
    }

    constructor(private _httpClient: HttpClient, private _appService: AppService) { }

    public async get(id: number): Promise<CustomerDto> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.get<IDataResult<CustomerDto>>(`${this._appService.apiUrl}/company/${id}`));
            if (!res.success) {
                this._isLoading = false;
                throw res.errorMessages || res.validatonErrorMessages;
            }

            this._isLoading = false;
            return res.data;
        } catch (error: any) {
            this._isLoading = false;
            throw error.message ? [error.message] : error;
        }
    }

    public async getList(params: ManagementCustomerListParams): Promise<PagedList<CustomerDto>> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.get<IDataResult<PagedList<CustomerDto>>>(`${this._appService.apiUrl}/company/getlist`, {
                params: { ...params }
            }));
            if (!res.success) {
                this._isLoading = false;
                throw res.errorMessages || res.validatonErrorMessages;
            }

            this._isLoading = false;
            return res.data;
        } catch (error: any) {
            this._isLoading = false;
            throw error.message ? [error.message] : error;
        }
    }

    public async upsert(customer: any, image: File | undefined): Promise<any> {
        try {
            this._isLoading = true;

            const formData = new FormData();
            formData.append('id', String(customer.id || 0));
            formData.append('name', <string>customer.name);
            if (image) {
                formData.append('file', image);
            }

            const res = await firstValueFrom(this._httpClient.put<IDataResult<any>>(`${this._appService.apiUrl}/customer`, formData));
            if (!res.success) {
                this._isLoading = false;
                throw res.errorMessages || res.validatonErrorMessages;
            }

            this._isLoading = false;
            return res.data;
        } catch (error: any) {
            this._isLoading = false;
            throw error.message ? [error.message] : error;
        }
    }

    public async delete(categoryId: number): Promise<void> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.delete<IResult>(`${this._appService.apiUrl}/customer?id=${categoryId}`));
            if (!res.success) {
                this._isLoading = false;
                throw res.errorMessages || res.validatonErrorMessages;
            }

            this._isLoading = false;
        } catch (error: any) {
            this._isLoading = false;
            throw error.message ? [error.message] : error;
        }
    }

    public async getCompanyTypes(): Promise<Array<CompanyTypeDto>> {
        const res = await firstValueFrom(this._httpClient.get<IDataResult<Array<CompanyTypeDto>>>(`${this._appService.apiUrl}/companyType`));
        if (!res.success) { return []; }
        return res.data;
    }

    public async createCustomerGfws(companyId: number): Promise<IDataResult<string>> {
        return await firstValueFrom(this._httpClient.post<IDataResult<string>>(`${this._appService.apiUrl}/GFWSIntegration/CreateCustomerGfws?companyId=${companyId}`, {}));
    }

    public async updateCompanyErpCode(companyId: number, erpCode: string): Promise<IResult> {
        return await firstValueFrom(this._httpClient.put<IResult>(`${this._appService.apiUrl}/Company/UpdateCompanyErpCode`, {
            id: companyId,
            erpCode: erpCode
        }));
    }

    public async getFavouriteProductList(companyId:number): Promise<IDataResult<Array<FavouriteProductListDto>>> {
        const res = await firstValueFrom(this._httpClient.get<IDataResult<Array<FavouriteProductListDto>>>(`${this._appService.apiUrl}/FavouriteProduct/GetByCompanyId/${companyId}`));
        
        return res;
      }
}