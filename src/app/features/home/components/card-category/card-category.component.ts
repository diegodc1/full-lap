import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-category',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './card-category.component.html',
  styleUrl: './card-category.component.scss'
})
export class CardCategoryComponent {
  @Input({alias: 'cardCategoryName', required: true}) cardCategoryName = '';
  @Input({alias: 'cardCategoryImagePath', required: true}) cardCategoryImagePath = '';
  @Input({alias: 'cardCategoryShortName', required: true}) cardCategoryShortName = '';
  @Input('cardHref') cardHref = '';
} 
