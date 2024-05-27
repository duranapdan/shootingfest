import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { IDataResult } from 'src/app/models/api-data-result.model';
import { PagedList } from 'src/app/models/api-paged-data-result.model';

@Injectable()
export class TranslationService {

    private _isLoading = false;
    public get isLoading(): boolean {
        return this._isLoading;
    }

    constructor(private _httpClient: HttpClient, private _appService: AppService) { }

    public async get(key: string): Promise<DictionaryStaticListDto> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.get<IDataResult<DictionaryStaticListDto>>(`${this._appService.apiUrl2}/Dictionary/GetStaticDictionaryByKey/${key}`));
            console.log(res);
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

    public async getList(): Promise<Array<DictionaryStaticListDto>> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.get<IDataResult<Array<DictionaryStaticListDto>>>(`${this._appService.apiUrl2}/Dictionary/GetStaticDictionaryList`));
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


    public async getLanguages(): Promise<PagedList<LanguageDto>> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.post<IDataResult<PagedList<LanguageDto>>>(`${this._appService.apiUrl2}/Languages/GetList`, {}));
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

    public async upsert(model: DictionaryStaticListDto): Promise<DictionaryStaticListDto> {
        try {
            this._isLoading = true;
            const res = await firstValueFrom(this._httpClient.post<IDataResult<DictionaryStaticListDto>>(`${this._appService.apiUrl2}/Dictionary/UpsertStaticDictionary`, {dictionary : model}));
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
}

export interface LanguageDto {
    id: number;
    name: string;
    symbol: string;
    flag: string;
}

export interface DictionaryStaticListDto {
    entryKey: string;
    dictionary: Array<DictionaryStaticDto>;
}
export interface DictionaryStaticDto {
    id: number;
    languageId: number;
    languageSymbol: string;
    entryValue: string;
}