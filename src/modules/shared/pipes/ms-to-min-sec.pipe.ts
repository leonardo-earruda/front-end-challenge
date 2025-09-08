import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'msToMinSec', standalone: true })
export class MsToMinSecPipe implements PipeTransform {
  transform(value?: number | null): string {
    if (!value) return '--:--';
    const totalSec = Math.floor(value / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  }
}
