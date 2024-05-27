import { Pipe, PipeTransform } from '@angular/core';
import { ServiceType } from 'src/app/complex-types';

@Pipe({ name: 'supportRequestType' })
export class SupportRequestTypePipe implements PipeTransform {
    transform(type: any): string {
        return "";
    }
}