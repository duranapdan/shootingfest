import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
// import { UserCultureType, UserCultureTypeName } from '../models/complex-types';

@Injectable()
export class LangInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var lang = localStorage.getItem('lang');
    // if (lang == 'en') {
    //   lang = UserCultureTypeName[UserCultureType.En];
    // } else if (lang == 'de') {
    //   lang = UserCultureTypeName[UserCultureType.De];
    // } else if (lang == 'tr') {
    //   lang = UserCultureTypeName[UserCultureType.Tr];
    // }
    request = request.clone({
      setHeaders: { Language: 'tr-TR' },
    });

    return next.handle(request);
  }
}
