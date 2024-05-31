import { Injectable, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthHTTPService } from './auth-http/auth-http.service';
import { LoginResponseDto } from '../models/login-response.dto';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  constructor(
    private authHttpService: AuthHTTPService,
    private router: Router
  ) { }

  async login(email: string, password: string, fcmToken: string | null): Promise<LoginResponseDto> {
    const res = await this.authHttpService.login(email, password, fcmToken);
    localStorage.setItem(this.authLocalStorageToken, JSON.stringify(res));
    return res;
  }
  async loginAdmin(email: string, password: string, fcmToken: string): Promise<LoginResponseDto> {
    const res = await this.authHttpService.loginAdmin(email, password, fcmToken);
    localStorage.setItem(this.authLocalStorageToken, JSON.stringify(res));
    return res;
  }

  async logout() {
    localStorage.removeItem(this.authLocalStorageToken);
    location.href = '/';
  }

}
