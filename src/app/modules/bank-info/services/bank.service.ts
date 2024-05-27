import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { IDataResult } from 'src/app/models/api-data-result.model';
import { IResult } from 'src/app/models/api-result.model';
import { BankDto, BankUpsertDto } from '../components/bank-info-list/models/bank.dto';

@Injectable({
    providedIn: 'root'
})
export class BankService {

    private _isLoading = false;
    public get isLoading(): boolean {
        return this._isLoading;
    }

    constructor(private _httpClient: HttpClient, private _appService: AppService) { }

    public async getBankAccountInformation(): Promise<any> {
        const res = await firstValueFrom(this._httpClient.post<IDataResult<any>>(`${this._appService.apiUrl2}/BankAccounts/GetList`, {}));
        console.log(res);
        return res.data;
    }

    public async getBankAccountInformationById(id: any): Promise<Array<any>> {
        const res = await firstValueFrom(this._httpClient.get<IDataResult<any>>(`${this._appService.apiUrl2}/BankAccounts/${id}`));
        console.log(res);
        return res.data;
    }

    public async upsert(model: BankUpsertDto): Promise<BankDto> {
        try {
            console.log(model)
            this._isLoading = true;
            if(model.data.id === 0){
                delete model.data.id;
            }
           
            const res = model.data.id
            ? await firstValueFrom(this._httpClient.put<IDataResult<BankDto>>(`${this._appService.apiUrl2}/BankAccounts`, model)) 
            : await firstValueFrom(this._httpClient.post<IDataResult<BankDto>>(`${this._appService.apiUrl2}/BankAccounts`, model))

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

    public async delete(accountId: number): Promise<void> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.delete<IResult>(`${this._appService.apiUrl2}/BankAccounts`, { body: {id:accountId}}));
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