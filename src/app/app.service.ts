import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    private _config: any = undefined;

    public get apiUrl(): string {
        return this._config?.apiUrl;
    }
    public get apiUrl2(): string {
        return this._config?.apiUrl2;
    }
    public get baseUrl(): string {
        return this._config?.baseUrl;
    }



    constructor(
        private _httpClient: HttpClient
    ) { }

    public async loadConfig(): Promise<void> {
        this._config = await firstValueFrom(this._httpClient.get<any>('/config.json'));
        console.log(this._config)
    }
}
