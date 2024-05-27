import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { AppService } from "src/app/app.service";
import { IDataResult } from "src/app/models/api-data-result.model";
import { IResult } from "src/app/models/api-result.model";
import { MultilanguageEntityDto } from "src/app/shared/models/multilanguage-entity.dto";
import { ContactAddressDto, ContactAddressUpsertDto, ContactFormDto } from "../models/contact-address.dto";
import { PaginationParams } from "src/app/models/pagination-params.model";
import { PagedList } from "src/app/models/api-paged-data-result.model";
import { MultilanguageEntityRequestDto } from "src/app/shared/models/multilanguage-entity-request.dto copy";

@Injectable()
export class ContactAddressService {

    private _isLoading = false;
    public get isLoading(): boolean {
        return this._isLoading;
    }

    constructor(private _httpClient: HttpClient, private _appService: AppService) { }

    public async getInstance(id: number): Promise<MultilanguageEntityDto<ContactAddressDto>> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.get<IDataResult<MultilanguageEntityDto<ContactAddressDto>>>(id === 0 ? `${this._appService.apiUrl2}/ContactAddresses/CreateNewInstanceWithLanguage` : `${this._appService.apiUrl2}/ContactAddresses/GetWithTranslation?id=${id}`));
            if (!res.isSuccess) {
                this._isLoading = false;
                throw res.errorMessages.concat(res.validatonErrorMessages);
            }

            this._isLoading = false;
            return res.data;
        } catch (error: any) {
            this._isLoading = false;
            throw error.message ? [error.message] : error;
        }
    }

    public async getList(): Promise<PagedList<ContactAddressDto>> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.post<IDataResult<PagedList<ContactAddressDto>>>(`${this._appService.apiUrl2}/ContactAddresses/GetList`,{}));
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

    public async getContactForms(params: PaginationParams): Promise<PagedList<ContactFormDto>> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.post<IDataResult<PagedList<ContactFormDto>>>(`${this._appService.apiUrl2}/ContactForms/GetList?Page=${params.Page}&PageSize=${params.Count}`, {}));
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

    public async upsert(model: MultilanguageEntityRequestDto<ContactAddressUpsertDto>): Promise<ContactAddressUpsertDto> {
        try {
            console.log(model)
            this._isLoading = true; 
           
            const res = model.data.entity.id>0 ? await firstValueFrom(this._httpClient.put<IDataResult<ContactAddressUpsertDto>>(`${this._appService.apiUrl2}/ContactAddresses`, model)) : await firstValueFrom(this._httpClient.post<IDataResult<ContactAddressUpsertDto>>(`${this._appService.apiUrl2}/ContactAddresses`, model));
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

    public async delete(parameterId: number): Promise<void> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.delete<IResult>(`${this._appService.apiUrl2}/ContactAddresses?id=${parameterId}`));
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
    public async export(): Promise<any> {
        this._isLoading = true;
        const res = await firstValueFrom(this._httpClient.get<IDataResult<any>>(`${this._appService.apiUrl2}/ContactForm/ContactFormExport`));
        console.log(res);
        this._isLoading = false;
        return res.data;
    }
}