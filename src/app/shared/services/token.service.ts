import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class TokenService {
    private token: string | null = null;

    constructor() { }

    setToken(token: string): void {
        this.token = token;
    }

    getToken(): string | null {
        return this.token;
    }
}
