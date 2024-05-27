import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { IDataResult } from 'src/app/models/api-data-result.model';
import { CityReadDto } from 'src/app/modules/order/models/order.dto';

@Injectable()
export class CityService {

    constructor(
        private _httpClient: HttpClient,
        private _appService: AppService
    ) { }

    public async getAll(countryId?: number): Promise<Array<CityReadDto>> {
        const res = await firstValueFrom(this._httpClient.get<IDataResult<Array<CityReadDto>>>(`${this._appService.apiUrl}/city${countryId ? `/${countryId}` : ''}`));
        if (!res.success) { return []; }

        return res.data;
    }
}