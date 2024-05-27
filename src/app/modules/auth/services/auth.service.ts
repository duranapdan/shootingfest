import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription, firstValueFrom } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { UserDto } from '../models/user.dto';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthHTTPService } from './auth-http/auth-http.service';
import { LoginResponseDto } from '../models/login-response.dto';

export type UserType = UserDto | undefined;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  /*   private _currentUser: UserDto | undefined = undefined;
    public get currentUser(): UserDto | undefined {
      return this._currentUser;
    }
   */

  constructor(
    private authHttpService: AuthHTTPService,
    private router: Router
  ) { }

  async login(email: string, password: string): Promise<LoginResponseDto> {
    const res = await this.authHttpService.login(email, password);
    localStorage.setItem(this.authLocalStorageToken, JSON.stringify(res));

    //  this._currentUser = res.user;
    return res;
  }
  async loginAdmin(email: string, password: string): Promise<LoginResponseDto> {
    const res = await this.authHttpService.loginAdmin(email, password);
    localStorage.setItem(this.authLocalStorageToken, JSON.stringify(res));

    // this._currentUser = res.user;
    return res;
  }

  async logout() {
    localStorage.removeItem(this.authLocalStorageToken);
    location.href = '/';
  }

  /*   public getUser(): UserDto | undefined {
      const json = localStorage.getItem(this.authLocalStorageToken);
      if (json) {
        const dto: LoginResponseDto = JSON.parse(json);
  
        this._currentUser = dto.user;
        return dto.user;
      }
      return undefined;
    } */
}
