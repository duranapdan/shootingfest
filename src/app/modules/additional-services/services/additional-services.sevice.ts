import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { AppService } from "src/app/app.service";
import { IDataResult } from "src/app/models/api-data-result.model";
import { IResult } from "src/app/models/api-result.model";
import { MultilanguageEntityDto } from "src/app/shared/models/multilanguage-entity.dto";
import { environment } from "src/environments/environment";
import { AdditionalServiceUpsertDto, GetGroupListDto } from "../models/additional-service.dto";

@Injectable()
export class AdditionalServicesService {

    private _isLoading = false;
    public get isLoading(): boolean {
        return this._isLoading;
    }

    constructor(private _httpClient: HttpClient, private _appService: AppService) { }

    public async getInstance(code: string): Promise<MultilanguageEntityDto<AdditionalServiceUpsertDto>> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.get<IDataResult<MultilanguageEntityDto<AdditionalServiceUpsertDto>>>(`${this._appService.apiUrl}/AdditionalService/GetWithTranslationByCode/${code}`));
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

    public async getList(): Promise<Array<GetGroupListDto>> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.get<IDataResult<Array<GetGroupListDto>>>(`${this._appService.apiUrl}/AdditionalService/getgrouplist`));
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

    public async syncTranslations(): Promise<void> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.get<IResult>(`${this._appService.apiUrl}/GFWSIntegration/SyncProductAllTranslations`));
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
    
    public async upsert(model: MultilanguageEntityDto<AdditionalServiceUpsertDto>): Promise<AdditionalServiceUpsertDto> {
        try {
            this._isLoading = true;
            const res = await firstValueFrom(this._httpClient.put<IDataResult<AdditionalServiceUpsertDto>>(`${this._appService.apiUrl}/AdditionalService`, model));
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
            const res = await firstValueFrom(this._httpClient.delete<IDataResult<AdditionalServiceUpsertDto>>(`${this._appService.apiUrl}/AdditionalService`, {
                params: {
                    id: id
                }
            }));
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
}