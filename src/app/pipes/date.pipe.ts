

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'localeDate' })
export class LocaleDatePipe implements PipeTransform {
    transform(date: Date): string {
        return new Date(date).toLocaleDateString(localStorage.getItem('lang') || 'tr');
    }
}

@Pipe({ name: 'remainingWeek' })
export class RemainingWeekPipe implements PipeTransform {
    transform(date: Date): number {
        var dateDiffTime = (new Date(date)).getTime() - (new Date).getTime();
        return Math.ceil(dateDiffTime / (1000 * 3600 * 24 * 7));
    }
}

