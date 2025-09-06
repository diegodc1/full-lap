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
        case 'NASCAR_BRASIL':
            return 'nascar/nascar.jpg';
        case 'PORSCHE_CUP':
            return 'porsche-cup/porsche-cup.jpg';
        case 'COPA_TRUCK':
            return 'copa-truck/copa-truck.jpg';
        case 'DRIFT':
            return 'cdrift/drift.jpg';
        default:
            return'default.jpg';
    }
  }

}
