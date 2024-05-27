import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'localImage' })
export class LocalImagePipe implements PipeTransform {
    transform(image: File): Promise<string | ArrayBuffer | null> {
        return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
            var fr = new FileReader();
            fr.onload = function () {
                resolve(fr.result)
            }
            fr.readAsDataURL(image);
        })
    }
}