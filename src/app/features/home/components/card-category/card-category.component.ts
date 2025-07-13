import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-category',
  standalone: true,
  imports: [],
  templateUrl: './card-category.component.html',
  styleUrl: './card-category.component.scss'
})
export class CardCategoryComponent {
  @Input({alias: 'cardCategoryName', required: true}) cardCategoryName = '';
  @Input({alias: 'cardCategoryImagePath', required: true}) cardCategoryImagePath = '';
  @Input('cardHref') cardHref = '';
} 
