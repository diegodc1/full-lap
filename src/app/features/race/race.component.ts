import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardWatchComponent } from "./components/card-watch/card-watch.component";

@Component({
  selector: 'app-race',
  standalone: true,
  imports: [CommonModule, CardWatchComponent],
  templateUrl: './race.component.html',
  styleUrl: './race.component.scss'
})
export class RaceComponent {
  id = '';

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') ?? '';
    });
  }
}
