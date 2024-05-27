import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { IDataResult } from 'src/app/models/api-data-result.model';
import { PagedList } from 'src/app/models/api-paged-data-result.model';
import { IResult } from 'src/app/models/api-result.model';
import { MultilanguageEntityRequestDto } from 'src/app/shared/models/multilanguage-entity-request.dto copy';
import { MultilanguageEntityDto } from 'src/app/shared/models/multilanguage-entity.dto';
import { environment } from 'src/environments/environment';

@Injectable()
export class StaticPageService {

    private _isLoading = false;
    public get isLoading(): boolean {
        return this._isLoading;
    }

    constructor(private _httpClient: HttpClient, private _appService: AppService) { }

    public async getInstance(id: number): Promise<MultilanguageEntityDto<StaticPageUpsertDto>> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.get<IDataResult<MultilanguageEntityDto<StaticPageUpsertDto>>>(id === 0 ? `${this._appService.apiUrl2}/StaticPages/CreateNewInstanceWithLanguage` : `${this._appService.apiUrl2}/StaticPages/GetWithTranslation?id=${id}`));
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

    public async getList(params:any): Promise<PagedList<StaticPageDto>> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.post<IDataResult<PagedList<StaticPageDto>>>(`${this._appService.apiUrl2}/StaticPages/GetList?Page=${params.Page}&PageSize=${params.Count}`, {}));
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

    public async upsert(model: MultilanguageEntityRequestDto<StaticPageUpsertDto>): Promise<StaticPageUpsertDto> {
        try {
            this._isLoading = true;
            if(model.data.entity.id == 0){
                delete model.data.entity.id;
            }
            const res = model.data.entity.id ? await firstValueFrom(this._httpClient.put<IDataResult<StaticPageUpsertDto>>(`${this._appService.apiUrl2}/StaticPages`, model)) : await firstValueFrom(this._httpClient.post<IDataResult<StaticPageUpsertDto>>(`${this._appService.apiUrl2}/StaticPages`, model));
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

            const res = await firstValueFrom(this._httpClient.delete<IResult>(`${this._appService.apiUrl2}/StaticPages`,{body:{id:brandId}}));
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

export interface StaticPageDto {
    id: number;
    url: string;
    description: string;
}

export interface StaticPageUpsertDto {
    id?: number;
    url: string;
    contentKey: string;
    descKey: string;
    description: string;
    content:string
}
