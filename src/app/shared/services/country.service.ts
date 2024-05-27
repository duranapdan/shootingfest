import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { IDataResult } from 'src/app/models/api-data-result.model';
import { CountryReadDto } from 'src/app/modules/order/models/order.dto';

@Injectable()
export class CountryService {

    constructor(
        private _httpClient: HttpClient,
        private _appService: AppService
    ) { }

    public async getAll(): Promise<Array<CountryReadDto>> {
        const res = await firstValueFrom(this._httpClient.get<IDataResult<Array<CountryReadDto>>>(`${this._appService.apiUrl}/country`));
        if (!res.success) { return []; }

        return res.data;
    }
}