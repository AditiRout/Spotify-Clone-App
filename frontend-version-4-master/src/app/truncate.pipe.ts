import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number): string {
    if (!value) return '';
    
    // Check if the length of the string exceeds the limit
    if (value.length <= limit) {
      return value; // Return the original string if within limit
    }
    
    // Truncate and add "..." if limit exceeded
    return value.substring(0, limit) + '...';
  }
}
