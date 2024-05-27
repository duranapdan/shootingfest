import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { AppService } from "src/app/app.service";
import { IDataResult } from "src/app/models/api-data-result.model";
import { IResult } from "src/app/models/api-result.model";
import { MultilanguageEntityDto } from "src/app/shared/models/multilanguage-entity.dto";
import { environment } from "src/environments/environment";
import { BrandDto } from "../models/brand.dto";
import { MultilanguageEntityRequestDto } from "src/app/shared/models/multilanguage-entity-request.dto copy";
import { PagedList } from "src/app/models/api-paged-data-result.model";

@Injectable()
export class BrandService {

    private _isLoading = false;
    public get isLoading(): boolean {
        return this._isLoading;
    }

    constructor(private _httpClient: HttpClient, private _appService: AppService) { }

    public async getInstance(id: number): Promise<MultilanguageEntityDto<BrandDto>> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.get<IDataResult<MultilanguageEntityDto<BrandDto>>>(id === 0 ? `${this._appService.apiUrl2}/Brands/CreateNewInstanceWithLanguage` : `${this._appService.apiUrl2}/Brands/GetWithTranslation?Id=${id}`));
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
    /* 
        public async getList(): Promise<any> {
            try {
                this._isLoading = true;
    
                const res = await firstValueFrom(this._httpClient.post<IDataResult<PagedList<BrandDto>>>(`${this._appService.apiUrl2}/Brands/GetList?Page=0&PageSize=1000`,{}));
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
        } */

    /*     public async getListByPage(params:any): Promise<any> {
            try {
                this._isLoading = true;
    
                const res = await firstValueFrom(this._httpClient.post<IDataResult<PagedList<BrandDto>>>(`${this._appService.apiUrl2}/Brands/GetList?Page=${params.Page}&PageSize=${params.Count}`,{}));
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
     */




    public async upsert(model: MultilanguageEntityRequestDto<BrandDto>): Promise<BrandDto> {
        try {
            this._isLoading = true;
            if (model.data.entity.id == 0) {
                delete model.data.entity.id;
            }
            const res = model.data.entity.id
                ? await firstValueFrom(this._httpClient.put<IDataResult<BrandDto>>(`${this._appService.apiUrl2}/Brands`, model))
                : await firstValueFrom(this._httpClient.post<IDataResult<BrandDto>>(`${this._appService.apiUrl2}/Brands`, model))

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

    public async delete(brandId: number): Promise<void> {
        try {
            this._isLoading = true;
            const payload: BrandDto = {
                id: brandId
            }
            const res = await firstValueFrom(this._httpClient.delete<IResult>(`${this._appService.apiUrl2}/Brands`, { body: payload }));
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
}