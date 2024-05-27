import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginResponseDto } from '../models/login-response.dto';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  constructor() { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    try {
      const data: LoginResponseDto = JSON.parse(localStorage.getItem(this.authLocalStorageToken) || '{}');

      const auth = Boolean(data && data.accessToken);
      if (!auth) {
        window.location.href = '/auth/login';
      }

      return auth;
    } catch (error) {
      window.location.href = '/auth/login';
      return false;
    }
  }
}
