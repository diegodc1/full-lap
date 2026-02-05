import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-news-card',
  imports: [],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.scss'
})
export class NewsCardComponent {
  @Input() title: string = '';
  @Input() category: string = '';
  @Input() description: string = ''
  @Input() imageUrl: string = ''
  @Input() newsUrl: string = ''
  @Input() readMoreLink: string = ''
  @Input() source: string = ''

  
}
