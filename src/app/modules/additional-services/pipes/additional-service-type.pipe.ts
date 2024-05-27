import { Pipe, PipeTransform } from '@angular/core';
import { ServiceType } from 'src/app/complex-types';

@Pipe({ name: 'additionalServiceType' })
export class AdditionalServiceTypePipe implements PipeTransform {
    transform(type: ServiceType): string {
        switch (type) {
            case ServiceType.AdditionalService:
                return 'Additional Service';
            case ServiceType.Pallet:
                return 'Pallet';
            case ServiceType.Shipper:
                return 'Shipper';
            default:
                return '-';
        }
    }
}