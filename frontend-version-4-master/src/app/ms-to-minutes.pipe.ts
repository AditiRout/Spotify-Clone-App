import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'msToMinutes'
})
export class MsToMinutesPipe implements PipeTransform {
  transform(milliseconds: number): string {
    const minutes: number = Math.floor(milliseconds / 60000);
    const seconds: number = parseInt(((milliseconds % 60000) / 1000).toFixed(0), 10);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }
}