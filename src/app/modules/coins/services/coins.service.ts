import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { AppService } from "src/app/app.service";
import { IDataResult } from "src/app/models/api-data-result.model";
import { IResult } from "src/app/models/api-result.model";
import { MultilanguageEntityDto } from "src/app/shared/models/multilanguage-entity.dto";
import { ToastService } from "src/app/shared/services/toast.service";
import { CoinPeriodExportDto } from "../models/coin-period.model";

@Injectable()
export class CoinsService {

    private _isLoading = false;
    public get isLoading(): boolean {
        return this._isLoading;
    }

    private _hasError = false;
    public get hasError(): boolean {
        return this._hasError;
    }

    private _hasSuccess = false;
    public get hasSuccess(): boolean {
        return this._hasSuccess;
    }

    constructor(
        private _httpClient: HttpClient,
        private _appService: AppService,
    ) { }
    //Coin Rules
    public async getCoinRuleList(): Promise<Array<any>> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.get<IDataResult<Array<any>>>(`${this._appService.apiUrl}/CoinRule`));
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

    //Coin Peridos
    public async getCoinPeriodList(): Promise<Array<any>> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.get<IDataResult<Array<any>>>(`${this._appService.apiUrl}/CoinPeriod`));
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

    public async upsertCoinPeriod(model: any): Promise<any> {
        try {
            this._isLoading = true;
            const res = await firstValueFrom(this._httpClient.put<IDataResult<any>>(`${this._appService.apiUrl}/CoinPeriod`, model));
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


    public async getList(model: any): Promise<Array<CoinPeriodExportDto>> {
        try {
            this._isLoading = true;
            const res = await firstValueFrom(this._httpClient.post<IDataResult<Array<CoinPeriodExportDto>>>(`${this._appService.apiUrl}/CoinPeriod/GetList`, model));
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

    public async getCoinPeriodById(id: any): Promise<any> {
        const res = await firstValueFrom(this._httpClient.get<IDataResult<any>>(`${this._appService.apiUrl}/CoinPeriod/${id}`));
        console.log(res);
        return res.data;
    }

    public async exportCoinPeriod(id: any): Promise<any> {
        const res = await firstValueFrom(this._httpClient.get<IDataResult<any>>(`${this._appService.apiUrl}/CoinPeriod/CoinPeriodExport?coinPeriodId=${id}`));
        console.log(res);
        return res.data;
    }

    public async deleteCoinPeriod(periodId: number): Promise<void> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.delete<IResult>(`${this._appService.apiUrl}/CoinPeriod?id=${periodId}`));
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

    public async importCoinPeriod(file: File): Promise<string> {
        this._isLoading = true;
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await firstValueFrom(this._httpClient.post<IDataResult<any>>(`${this._appService.apiUrl}/CoinPeriod/CoinPeriodImport`, formData));
            if (!res.success) {
                throw res.errorMessages.concat(res.validatonErrorMessages);
            }
            this._isLoading = false;
            return res.data.token;

        } catch (error) {
            this._isLoading = false;
            return "";
        }
    }

    //Coin Gifts 
    public async getCoinGiftList(): Promise<Array<any>> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.get<IDataResult<Array<any>>>(`${this._appService.apiUrl}/CoinGift`));
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

    //Coin Memberships
    public async getCoinMembershipList(): Promise<Array<any>> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.get<IDataResult<Array<any>>>(`${this._appService.apiUrl}/MembershipStatus`));
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

    public async deleteCoinMembership(id: number): Promise<void> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.delete<IResult>(`${this._appService.apiUrl}/MembershipStatus?id=${id}`));
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

    public async getcoinMembershipDetail(id: number): Promise<MultilanguageEntityDto<any>> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.get<IDataResult<MultilanguageEntityDto<any>>>(`${this._appService.apiUrl}/MembershipStatus/GetWithTranslation/${id}`));
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

    public async getcoinMembershipInstance(): Promise<MultilanguageEntityDto<any>> {
        try {
            this._isLoading = true;

            const res = await firstValueFrom(this._httpClient.get<IDataResult<MultilanguageEntityDto<any>>>(`${this._appService.apiUrl}/MembershipStatus/CreateNewInstanceWithLanguage`));
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

    public async upsertMembership(model: any): Promise<any> {
        try {
            this._isLoading = true;
            const res = await firstValueFrom(this._httpClient.post<IDataResult<any>>(`${this._appService.apiUrl}/MembershipStatus`, model));
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
}
