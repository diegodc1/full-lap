import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-watch',
  standalone: true,
  imports: [],
  templateUrl: './card-watch.component.html',
  styleUrl: './card-watch.component.scss'
})
export class CardWatchComponent {
  @Input('watchIcon') watchIcon = "live_tv";
  @Input({alias: 'watchTitle', required: true}) watchTitle = "";
  @Input({alias: 'watchColor', required: true}) watchColor = "";
  @Input({alias: 'url', required: true}) url = "";
}
