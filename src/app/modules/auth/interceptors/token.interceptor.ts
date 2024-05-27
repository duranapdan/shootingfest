import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs';
import { LoginResponseDto } from '../models/login-response.dto';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

    private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const data: LoginResponseDto = JSON.parse(localStorage.getItem(this.authLocalStorageToken) || '{}');

        req.headers.append("Access-Control-Allow-Origin", "*");
        req.headers.append("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
        req.headers.append("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");
        if (data && data.accessToken) {
            // If we have a accessToken, we set it to the header
            req = req.clone({
                setHeaders: { Authorization: `Bearer ${data.accessToken.token}` }
            });
        }

        return next.handle(req).pipe(
            catchError((err) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        localStorage.removeItem(this.authLocalStorageToken)
                        window.location.href = '/';
                    }
                }
                throw err;
            })
        )
    }
}
