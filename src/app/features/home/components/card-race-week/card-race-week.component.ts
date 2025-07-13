import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-race-week',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './card-race-week.component.html',
  styleUrl: './card-race-week.component.scss'
})
export class CardRaceWeekComponent {
  @Input({alias: 'cardRaceId',      required: true}) cardRaceId = "0";
  @Input({alias: 'cardTitle',       required: true}) cardTitle = ''
  @Input({alias: 'cardRaceName',    required: true}) cardRaceName = ''
  @Input({alias: 'cardCircuit',     required: true}) cardCircuit = ''
  @Input({alias: 'cardTime',        required: true}) cardTime = ''
  @Input({alias: 'cardRaceDay',     required: true}) cardRaceDay = ''
  @Input({alias: 'cardRaceMonth',   required: true}) cardRaceMonth = ''
  @Input({alias: 'cardRaceWeekDay', required: true}) cardRaceWeekDay = ''
  @Input({alias: 'cardImagePath',   required: true}) cardImagePath = ''
}
