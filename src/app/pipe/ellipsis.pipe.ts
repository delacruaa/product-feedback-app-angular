import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {
  transform(value: string): string {
    if (value.length > 140) {
      return value.substring(0, 140) + '...';
    }
    return value;
  }
}
