import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConfirmationService {
    constructor() { }

    public confirm(model: { title?: string, content?: string } = {}): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            // TODO: create a component for generic confirmations and use it for
            resolve(confirm(model.content || 'Emin Misiniz?'));
        });
    }
}