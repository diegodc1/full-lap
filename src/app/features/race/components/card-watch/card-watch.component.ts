import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-card-watch',
  standalone: true,
  imports: [],
  templateUrl: './card-watch.component.html',
  styleUrl: './card-watch.component.scss'
})
export class CardWatchComponent {
  @Input({alias: 'watchTitle', required: true}) watchTitle = "";
  @Input({alias: 'watchColor', required: true}) watchColor = "";
  @Input({alias: 'type', required: true}) type = "";
  @Input({alias: 'url', required: true}) url = "";

  icon = '';
  isDisabled = false;

   ngOnChanges(changes: SimpleChanges) {
    if (changes['type']) {
      this.setImagePath();
    }
  }
  
  private setImagePath() {
    switch (this.type) {
      case 'TV':
        this.icon = 'tv';
        this.isDisabled = true;
        break;
      case 'YOUTUBE':
        this.icon = 'smart_display';
        this.isDisabled = false;
        break;
      case 'INTERNET':
        this.icon = 'captive_portal';
        this.isDisabled = false;
        break;
      default:
        this.icon = 'tv';
        this.isDisabled = false;
        break;
    }
  }
  
  handleClick(event: MouseEvent) {
    if (this.isDisabled) {
      event.preventDefault();
    }
  }
  
}
