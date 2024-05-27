import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dataListing' })
export class DataListingPipe implements PipeTransform {
    transform(value: string): Array<string> {
        try {
            const data = JSON.parse(value);
            return Object.keys(data).map(k => {
                return `"${k}":"${data[k]}"`;
            });
        } catch (error) {
            return value ? value.split('|') : [];
        }
    }
}
