import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { RecordStatus } from 'src/app/complex-types';
import { IDataResult } from 'src/app/models/api-data-result.model';
import { PagedList } from 'src/app/models/api-paged-data-result.model';
import { IResult } from 'src/app/models/api-result.model';
import { ImageDto } from 'src/app/models/image.dto';
import { MultilanguageEntityRequestDto } from 'src/app/shared/models/multilanguage-entity-request.dto copy';
import { MultilanguageEntityDto } from 'src/app/shared/models/multilanguage-entity.dto';
import { environment } from 'src/environments/environment';

@Injectable()
export class ChooseForYouService {

    private _isLoading = false;
    public get isLoading(): boolean {
        return this._isLoading;
    }

    constructor(private _httpClient: HttpClient, private _appService: AppService) { }

    public async getInstance(id: number): Promise<MultilanguageEntityDto<ChooseForYouUpsertDto>> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.get<IDataResult<MultilanguageEntityDto<ChooseForYouUpsertDto>>>(id === 0 ? `${this._appService.apiUrl2}/ChooseForYous/CreateNewInstanceWithLanguage` : `${this._appService.apiUrl2}/ChooseForYous/GetWithTranslation?id=${id}`));
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

    public async getList(): Promise<PagedList<ChooseForYouDto>> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.post<IDataResult<PagedList<ChooseForYouDto>>>(`${this._appService.apiUrl2}/ChooseForYous/GetList`, {}));
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

    public async upsert(model: MultilanguageEntityRequestDto<ChooseForYouUpsertDto>): Promise<ChooseForYouUpsertDto> {
        try {
            this._isLoading = true;
            if(model.data.entity.id == 0){
                delete model.data.entity.id;
            }
            const res = model.data.entity.id ? await firstValueFrom(this._httpClient.put<IDataResult<ChooseForYouUpsertDto>>(`${this._appService.apiUrl2}/ChooseForYous`, model)) : await firstValueFrom(this._httpClient.post<IDataResult<ChooseForYouUpsertDto>>(`${this._appService.apiUrl2}/ChooseForYous`, model));
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

            const res = await firstValueFrom(this._httpClient.delete<IResult>(`${this._appService.apiUrl2}/ChooseForYous`,{body:{id:brandId}}));
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
export interface ChooseForYouDto {
    id: number;
    key: string;
    headerKey: string;
    contentKey: string;
    name: string;
    header: string;
    content:string;
    redirectUrl:string;
    order:number;
    imageId:number;
    image:ImageDto;
    status:RecordStatus;
}

export interface ChooseForYouUpsertDto {
    id?: number;
    key: string;
    headerKey: string;
    contentKey: string;
    redirectUrlKey: string;
    name: string;
    header: string;
    content:string;
    redirectUrl:string;
    order:number;
    imageId?:number;
    image:ImageDto;
    tokens:Array<string>;
}
