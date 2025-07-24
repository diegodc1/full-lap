import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardWatchComponent } from "./components/card-watch/card-watch.component";
import { RaceEvent } from '../../models/event.model';
import { EventService } from '../../services/event.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { formatDateInfo, formatTime } from '../../utils/date.utils';

@Component({
  selector: 'app-race',
  standalone: true,
  imports: [CommonModule, CardWatchComponent, ProgressSpinnerModule],
  templateUrl: './race.component.html',
  styleUrl: './race.component.scss'
})
export class RaceComponent implements OnInit {
  id = '';
  race: RaceEvent | undefined;
  formatDateInfo = formatDateInfo;
  formatTime = formatTime;

  eventDayInitial: string = '';
  eventDayFinal: string = '';
  eventMonth: string = '';
  eventYear: string = '';

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') ?? '';
    });
  }

  ngOnInit(): void {
    this.loadRaceData();
  }

  loadRaceData() {
    this.eventService.getEventById(this.id).subscribe({
      next: (value) => {
        this.race = value;
        this.eventDayInitial = formatDateInfo(value.dateInitial, 'day')
        this.eventDayFinal = formatDateInfo(value.dateFinal, 'day')
        this.eventMonth = formatDateInfo(value.dateFinal, 'monthLong').toLowerCase()
        this.eventYear = formatDateInfo(value.dateFinal, 'year')
      }, 
      error: (err) => {
        console.error("Não foi possível buscar os dados da corrida")
      } 
    })
  }


}
