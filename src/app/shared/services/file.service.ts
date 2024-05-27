import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { IDataResult } from 'src/app/models/api-data-result.model';
import { FileResponseDto } from '../models/file-response.dto';

@Injectable({
    providedIn: 'root'
})
export class FileService {

    private _isLoading: boolean = false;
    public get isLoading(): boolean {
        return this._isLoading;
    }

    constructor(
        private _httpClient: HttpClient,
        private _appService: AppService
    ) { }

    public async postFile(file: File): Promise<FileResponseDto> {
        this._isLoading = true;
        const formData = new FormData();
        formData.append('file', file);
        const res = await firstValueFrom(this._httpClient.post<IDataResult<FileResponseDto>>(`${this._appService.apiUrl2}/Documents`, formData));
        if (!res.isSuccess) {
            throw res.errorMessages.concat(res.validatonErrorMessages);
        }

        this._isLoading = false;
        return res.data;
    }

    public async getLocalSource(file: File): Promise<any> {
        this._isLoading = true;
        return new Promise<any>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                this._isLoading = false;
                resolve(reader.result);
            };
            reader.onerror = (e) => {
                this._isLoading = false;
                reject(e);
            }
        });
    }
}
