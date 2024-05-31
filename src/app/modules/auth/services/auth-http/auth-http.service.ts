import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResponseDto } from '../../models/login-response.dto';
import { IDataResult } from 'src/app/models/api-data-result.model';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root',
})
export class AuthHTTPService {

  constructor(private _httpClient: HttpClient, private _appService: AppService) { }

  async login(email: string, password: string, fcmToken: string | null): Promise<LoginResponseDto> {
    const res = await firstValueFrom(this._httpClient.post<LoginResponseDto>(`${this._appService.apiUrl2}/Auth/Login`, {
      email,
      password,
      authenticatorCode: null,
      fcmToken
    }));

    return res;
  }

  async loginAdmin(email: string, password: string, fcmToken: string): Promise<LoginResponseDto> {
    const res = await firstValueFrom(this._httpClient.post<IDataResult<LoginResponseDto>>(`${this._appService.apiUrl}/user/LoginAdmin`, {
      email,
      password,
    }));

    if (!res.success) {
      throw res.errorMessages || res.validatonErrorMessages;
    }

    return res.data;
  }
}
