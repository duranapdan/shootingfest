import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { ConfirmationTypes, ConfirmStatus } from 'src/app/complex-types';
import { IDataResult } from 'src/app/models/api-data-result.model';
import { environment } from 'src/environments/environment';
import { ConfirmationDto, ConfirmationRejectDto } from '../models/confirmation.dto';

@Injectable()
export class ApprovalRequestService {

    private _isLoading = false;
    public get isLoading(): boolean {
        return this._isLoading;
    }

    constructor(private _httpClient: HttpClient, private _appService: AppService) { }

    public async getAll(): Promise<Array<ConfirmationDto>> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.get<IDataResult<Array<ConfirmationDto>>>(`${this._appService.apiUrl}/Confirmation?confirmStatus=${ApprovalRequestParams.Status}&&confirmationTypes=${ApprovalRequestParams.Type}`));
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
    public async getById(id:number): Promise<ConfirmationDto> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.get<IDataResult<ConfirmationDto>>(`${this._appService.apiUrl}/Confirmation/${id}`));
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

    public async approve(id: number): Promise<ConfirmationDto> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.get<IDataResult<ConfirmationDto>>(`${this._appService.apiUrl}/Confirmation/Confirm/${id}`));
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

    public async reject(model: ConfirmationRejectDto): Promise<void> {
        try {
            this._isLoading = true;
            const res = await firstValueFrom(this._httpClient.post<IDataResult<ConfirmationDto>>(`${this._appService.apiUrl}/Confirmation/Reject`, model));
            console.log(res);

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

    public async export(): Promise<any> {
        const res = await firstValueFrom(this._httpClient.get<IDataResult<any>>(`${this._appService.apiUrl}/Confirmation/Export?confirmStatus=${ApprovalRequestParams.Status}&&confirmationTypes=${ApprovalRequestParams.Type}`));
        console.log(res);
        return res.data;
    }
}

export class ApprovalRequestParams {
    public static Status: ConfirmStatus = ConfirmStatus.Waiting;
    public static Type: ConfirmationTypes = ConfirmationTypes.UserEdit;
}