import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryImage'
})
export class CategoryImagePipe implements PipeTransform {

  transform(category: string): string {
     switch (category) {
        case 'FORMULA1':
            return 'formula1/ferrari.jpg';
        case 'STOCK_CAR':
            return 'stock-car/stock-car-1.jpg';
        case 'FORMULA_INDY':
            return 'formula-indy/formula-indy-1.jpg';
        default:
            return'default.jpg';
    }
  }

}
