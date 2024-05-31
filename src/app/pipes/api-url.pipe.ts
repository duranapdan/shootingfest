import { Pipe, PipeTransform } from '@angular/core';
import { AppService } from '../app.service';

@Pipe({ name: 'apiUrl' })
export class ApiUrlPipe implements PipeTransform {

    constructor(private _appService: AppService) { }

    transform(value: string): string {
        if (!value) { return `/assets/media/logos/Logo.svg`; }
        return value.startsWith('/') ? `${this._appService.apiUrl2.replace('/api', '')}${value}` : `${this._appService.apiUrl2.replace('/api', '')}/${value}`;
    }
}