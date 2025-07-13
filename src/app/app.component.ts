import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layout/header/header.component";
import { CardRaceWeekComponent } from "./features/home/components/card-race-week/card-race-week.component";
import { CardCategoryComponent } from "./features/home/components/card-category/card-category.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, CardRaceWeekComponent, CardCategoryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'full_lap';
}
