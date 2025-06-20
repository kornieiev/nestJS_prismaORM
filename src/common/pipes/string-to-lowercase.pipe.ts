// 4:21:50 - Pipe
// https://youtu.be/HT6cm4GoSIw?t=15713

import {
  type ArgumentMetadata,
  Injectable,
  type PipeTransform,
} from '@nestjs/common';

@Injectable()
export class StringToLowercasePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    console.log(
      `4 - Срабатывание Pipe-transform. Обрабатывается значение ${value}`,
    );

    if (typeof value === 'string') {
      return value.toLocaleLowerCase();
    }
    return value;
  }
}
