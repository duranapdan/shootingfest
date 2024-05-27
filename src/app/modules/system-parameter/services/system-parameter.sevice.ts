import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { AppService } from "src/app/app.service";
import { IDataResult } from "src/app/models/api-data-result.model";
import { IResult } from "src/app/models/api-result.model";
import { } from "src/app/shared/models/multilanguage-entity.dto";
import { SystemParameterDto } from "../models/system-parameter.dto";

@Injectable()
export class SystemParameterService {

    private _isLoading = false;
    public get isLoading(): boolean {
        return this._isLoading;
    }

    constructor(private _httpClient: HttpClient, private _appService: AppService) { }

    public async get(id: number): Promise<SystemParameterDto> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.get<IDataResult<SystemParameterDto>>(`${this._appService.apiUrl}/systemparameter/${id}`));
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

    public async getByKey(key: string): Promise<string> {
            const res = await firstValueFrom(this._httpClient.get<IDataResult<SystemParameterDto>>(`${this._appService.apiUrl}/systemparameter/GetByKey/${key}`));

            return res?.data?.parameterValue;

    }

    public async getList(): Promise<Array<SystemParameterDto>> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.get<IDataResult<Array<SystemParameterDto>>>(`${this._appService.apiUrl}/SystemParameter`));
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

    public async upsert(model: SystemParameterDto): Promise<SystemParameterDto> {
        try {
            this._isLoading = true;
            const res = await firstValueFrom(this._httpClient.put<IDataResult<SystemParameterDto>>(`${this._appService.apiUrl}/systemparameter`, model));
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

    public async delete(parameterId: number): Promise<void> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.delete<IResult>(`${this._appService.apiUrl}/SystemParameter?id=${parameterId}`));
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