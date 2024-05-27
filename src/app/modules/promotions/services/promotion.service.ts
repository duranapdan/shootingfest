import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { AppService } from "src/app/app.service";
import { IDataResult } from "src/app/models/api-data-result.model";
import { IResult } from "src/app/models/api-result.model";
import { MultilanguageEntityDto } from "src/app/shared/models/multilanguage-entity.dto";
import { PromotionGetDto } from "../../order/models/order.dto";
import { PagedList } from "src/app/models/api-paged-data-result.model";
import { MultilanguageEntityRequestDto } from "src/app/shared/models/multilanguage-entity-request.dto copy";

@Injectable()
export class PromotionService {

    private _isLoading = false;
    public get isLoading(): boolean {
        return this._isLoading;
    }

    constructor(private _httpClient: HttpClient, private _appService: AppService) { }

    public async getList(): Promise<PagedList<PromotionGetDto>> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.post<IDataResult<PagedList<PromotionGetDto>>>(`${this._appService.apiUrl2}/Promotions/GetList?Page=0&PageSize=1000`, {}));
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
    public async getListByPage(params:any): Promise<PagedList<PromotionGetDto>> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.post<IDataResult<PagedList<PromotionGetDto>>>(`${this._appService.apiUrl2}/Promotions/GetList?Page=${params.Page}&PageSize=${params.Count}`, {}));
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


    // public async getContainerTypeList(): Promise<Array<any>> {
    //     try {
    //         this._isLoading = true;

    //         const res = await firstValueFrom(this._httpClient.get<IDataResult<Array<any>>>(`${this._appService.apiUrl}/ContainerType`));
    //         if (!res.isSuccess) {
    //             this._isLoading = false;
    //             throw res.errorMessages || res.validatonErrorMessages;
    //         }

    //         this._isLoading = false;
    //         return res.data;
    //     } catch (error: any) {
    //         this._isLoading = false;
    //         throw error.message ? [error.message] : error;
    //     }
    // }

    public async getWithTranslation(id: number): Promise<MultilanguageEntityDto<any>> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.get<IDataResult<MultilanguageEntityDto<any>>>(`${this._appService.apiUrl2}/Promotions/GetWithTranslation?Id=${id}`));
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

    public async getInstance(): Promise<MultilanguageEntityDto<any>> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.get<IDataResult<MultilanguageEntityDto<any>>>(`${this._appService.apiUrl2}/Promotions/CreateNewInstanceWithLanguage`));
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

    public async upsert(model: any): Promise<any> {
        try {
            this._isLoading = true;
            const res = await firstValueFrom(this._httpClient.put<IDataResult<any>>(`${this._appService.apiUrl}/catalog`, model));
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

    public async delete(id: number): Promise<void> {
        try {
            this._isLoading = true;
            const payload:any = {
                id : id
            }
            const res = await firstValueFrom(this._httpClient.delete<IResult>(`${this._appService.apiUrl2}/Promotions`, {body:payload}));
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

    public async getPromotionDetail(id: any): Promise<any> {
        console.log(id);
        const res = await firstValueFrom(this._httpClient.get<IDataResult<any>>(`${this._appService.apiUrl2}/Promotions/${id}`));
        console.log(res);
        return res.data;
    }

    public async upsertPromotion(model: MultilanguageEntityRequestDto<any>): Promise<any> {
        console.log(model);
        try {
            this._isLoading = true;
            if(model.data.entity.id == 0){
                delete model.data.entity.id;
            }
            const res = model.data.entity.id
            ? await firstValueFrom(this._httpClient.put<IDataResult<PromotionGetDto>>(`${this._appService.apiUrl2}/Promotions`, model))
            : await firstValueFrom(this._httpClient.post<IDataResult<PromotionGetDto>>(`${this._appService.apiUrl2}/Promotions`, model));
            console.log(res);

            if (!res.isSuccess) {
                this._isLoading = false;
                alert(res.errorMessages[0] || res.validatonErrorMessages[0]);
                throw res.errorMessages || res.validatonErrorMessages;
            }

            this._isLoading = false;
            return res.data;
        } catch (error: any) {
            this._isLoading = false;
            throw error.message ? [error.message] : error;
        }
    }


}