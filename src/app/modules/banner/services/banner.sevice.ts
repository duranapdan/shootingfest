import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { AppService } from "src/app/app.service";
import { IDataResult } from "src/app/models/api-data-result.model";
import { IResult } from "src/app/models/api-result.model";
import { MultilanguageEntityDto } from "src/app/shared/models/multilanguage-entity.dto";
import { BannerDto, BannerUpsertDto } from "../models/banner.dto";
import { PagedList } from "src/app/models/api-paged-data-result.model";

@Injectable()
export class BannerService {

    private _isLoading = false;
    public get isLoading(): boolean {
        return this._isLoading;
    }

    constructor(private _httpClient: HttpClient, private _appService: AppService) { }

    public async get(id: number): Promise<BannerDto> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.get<IDataResult<BannerDto>>(`${this._appService.apiUrl2}/HomeSliders/${id}`));
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

    public async getList(): Promise<PagedList<BannerDto>> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.post<IDataResult<PagedList<BannerDto>>>(`${this._appService.apiUrl2}/HomeSliders/GetList?Page=0&PageSize=1000`, {}));
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
    public async getListByPage(params:any): Promise<PagedList<BannerDto>> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.post<IDataResult<PagedList<BannerDto>>>(`${this._appService.apiUrl2}/HomeSliders/GetList?Page=${params.Page}&PageSize=${params.Count}`, {}));
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

    public async upsert(upsertModel:BannerUpsertDto): Promise<BannerDto> {
        console.log(upsertModel)
        try {
            this._isLoading = true;
            if(upsertModel.data.id === 0){
                delete upsertModel.data.id;
            }
            console.log(upsertModel)
            const res = upsertModel.data.id 
            ? await firstValueFrom(this._httpClient.put<IDataResult<BannerDto>>(`${this._appService.apiUrl2}/HomeSliders`, upsertModel)) 
            : await firstValueFrom(this._httpClient.post<IDataResult<BannerDto>>(`${this._appService.apiUrl2}/HomeSliders`, upsertModel))
    
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

            const res = await firstValueFrom(this._httpClient.delete<IResult>(`${this._appService.apiUrl2}/HomeSliders`, {body:{id:brandId}}));
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