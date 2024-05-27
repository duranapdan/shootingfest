import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { AppService } from "src/app/app.service";
import { IDataResult } from "src/app/models/api-data-result.model";
import { IResult } from "src/app/models/api-result.model";
import { MultilanguageEntityDto } from "src/app/shared/models/multilanguage-entity.dto";
import { CatalogDto } from "../models/catalog.dto";
import { PagedList } from "src/app/models/api-paged-data-result.model";

@Injectable()
export class CatalogService {

    private _isLoading = false;
    public get isLoading(): boolean {
        return this._isLoading;
    }

    constructor(private _httpClient: HttpClient, private _appService: AppService) { }

    public async getInstance(id: number): Promise<MultilanguageEntityDto<CatalogDto>> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.get<IDataResult<MultilanguageEntityDto<CatalogDto>>>(id === 0 ? `${this._appService.apiUrl}/catalog/CreateNewInstanceWithLanguage` : `${this._appService.apiUrl}/catalog/GetWithTranslation/${id}`));
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

    public async getList(): Promise<PagedList<CatalogDto>> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.get<IDataResult<PagedList<CatalogDto>>>(`${this._appService.apiUrl}/Catalog/GetAllCatalogs`));
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
    
    public async upsert(model: MultilanguageEntityDto<CatalogDto>): Promise<CatalogDto> {
        try {
            this._isLoading = true;
            const res = await firstValueFrom(this._httpClient.put<IDataResult<CatalogDto>>(`${this._appService.apiUrl}/catalog`, model));
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

    public async delete(brandId: number): Promise<void> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.delete<IResult>(`${this._appService.apiUrl}/Catalog?id=${brandId}`));
            if (!res.success) {
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