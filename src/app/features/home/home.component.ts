import { Component } from '@angular/core';
import { CardCategoryComponent } from "./components/card-category/card-category.component";
import { CardRaceWeekComponent } from "./components/card-race-week/card-race-week.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardCategoryComponent, CardRaceWeekComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
