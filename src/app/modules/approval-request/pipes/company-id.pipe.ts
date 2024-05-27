import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'companyId' })
export class CompanyIdPipe implements PipeTransform {
    transform(value: string): number {
        try {
            const data = JSON.parse(value);
            return data.CompanyId;
        } catch (error) {
            return 0;
        }
    }
}
