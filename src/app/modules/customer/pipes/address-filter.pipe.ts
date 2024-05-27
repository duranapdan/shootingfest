import { Pipe, PipeTransform } from '@angular/core';
import { AddressTypes } from 'src/app/complex-types';
import { AddressDto } from 'src/app/shared/models/address.dto';

@Pipe({ name: 'addressFilter' })
export class AddresFilterPipe implements PipeTransform {
    transform(value: Array<AddressDto>, type: AddressTypes): Array<AddressDto> {
        return value.filter(a => a.addressType == type);
    }
}