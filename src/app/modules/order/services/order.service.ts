import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { IDataResult } from 'src/app/models/api-data-result.model';
import { PagedList } from 'src/app/models/api-paged-data-result.model';
import { IResult } from 'src/app/models/api-result.model';
import { environment } from 'src/environments/environment';
import { OrderListRequestParams } from '../models/order-list-request-params.dto';
import { OrderDetailDto } from '../models/order.detail.dto';
import { OrderCancellationTypeDto, OrderDto } from '../models/order.dto';
import { MultilanguageEntityDto } from 'src/app/shared/models/multilanguage-entity.dto';
import { MultilanguageEntityRequestDto } from 'src/app/shared/models/multilanguage-entity-request.dto copy';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    currentPayload :any
    private _isLoading = false;
    public get isLoading(): boolean {
        return this._isLoading;
    }

    constructor(private _httpClient: HttpClient, private _appService: AppService) { }

    public async getList(params: any): Promise<PagedList<OrderDto>> {
        try {
            this._isLoading = true;
            if(params.search){
                this.currentPayload ={
                    "filter": {
                        "field": "userFirstName",
                        "operator": "contains",
                        "value": params.search,
                }
            }
        }
        else{
            this.currentPayload ={
                "filter": {
                    "field": "orderStatus",
                    "operator": "eq",
                    "value": params.orderStatus,
            }

        }
            
        }
            const res = await firstValueFrom(this._httpClient.post<IDataResult<PagedList<OrderDto>>>(`${this._appService.apiUrl2}/Orders/GetList?Page=${params.Page -1}`,this.currentPayload));
            if (!res.isSuccess) {
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

    public async getOrderDetailByOrderId(orderId: number): Promise<OrderDetailDto | undefined> {
        const res = await firstValueFrom(this._httpClient.get<IDataResult<OrderDetailDto>>(`${this._appService.apiUrl}/Order/GetOrderDetail/${orderId}`));
        if (!res.success) { return undefined; }
        return res.data;
    }

    public async getOrderCancellationTypes(): Promise<any> {
        const res = await firstValueFrom(this._httpClient.post<IDataResult<PagedList<OrderCancellationTypeDto>>>(`${this._appService.apiUrl2}/OrderCancellationType/GetList`,{}));
        return res.data;
    }

    public async changeStatus(payload:any): Promise<any> {
        const res = await firstValueFrom(this._httpClient.put<IDataResult<PagedList<any>>>(`${this._appService.apiUrl2}/Orders/ChangeStatus`,payload));
        return res.data;
    }

    public async getInstance(id: number): Promise<MultilanguageEntityDto<any>> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.get<IDataResult<MultilanguageEntityDto<any>>>(id === 0 ? `${this._appService.apiUrl2}/OrderCancellationType/CreateNewInstanceWithLanguage` : `${this._appService.apiUrl2}/OrderCancellationType/GetWithTranslation?Id=${id}`));
            if (!res.isSuccess) {
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
    
    public async upsert(model: MultilanguageEntityRequestDto<any>): Promise<any> {
        try {
            this._isLoading = true;
                if(model.data.entity.id == 0){
                    delete model.data.entity.id;
                }
                const res = model.data.entity.id
                ? await firstValueFrom(this._httpClient.put<IDataResult<any>>(`${this._appService.apiUrl2}/OrderCancellationType`, model))
                : await firstValueFrom(this._httpClient.post<IDataResult<any>>(`${this._appService.apiUrl2}/OrderCancellationType`, model))
           
                if (!res.isSuccess) {
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

    public async deleteCancellationType(data: any):  Promise<void> {

            try {
                this._isLoading = true;
                const payload: OrderCancellationTypeDto =  {
                    id:data
                }
                const res = await firstValueFrom(this._httpClient.delete<IResult>(`${this._appService.apiUrl2}/OrderCancellationType`,{ body: payload}));
                if (!res.isSuccess) {
                    this._isLoading = false;
                    throw res.errorMessages.concat(res.validatonErrorMessages);
                }
    
                this._isLoading = false;
            } catch (error: any) {
                this._isLoading = false;
                throw error.message ? [error.message] : error;
            }
        }

    public async cancelOrder(data: any): Promise<IResult> {
        const res = await firstValueFrom(this._httpClient.put<IResult>(`${this._appService.apiUrl}/Order/CancelOrderAdmin`, data));
        return res;
    }

    public async refundOrder(data: any): Promise<IResult> {
        const res = await firstValueFrom(this._httpClient.put<IResult>(`${this._appService.apiUrl}/Order/RefundOrder`, data));
        return res;
    }
    public async sendToErp(id: number): Promise<IResult> {
        this._isLoading = true;
        const res = await firstValueFrom(this._httpClient.get<IResult>(`${this._appService.apiUrl}/GFWSIntegration/CreateErpNotSendOrder/${id}`));
        this._isLoading = false;
        return res;
    }
}