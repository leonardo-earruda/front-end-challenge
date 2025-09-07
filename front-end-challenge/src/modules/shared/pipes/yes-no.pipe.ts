import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yesNo',
})
export class YesNoPipe implements PipeTransform {
  transform(value: unknown): string {
    return value ? 'Sim' : 'Não';
  }
}
