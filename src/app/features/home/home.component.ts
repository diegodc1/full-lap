import { Component, OnInit } from '@angular/core';
import { CardCategoryComponent } from "./components/card-category/card-category.component";
import { CardRaceWeekComponent } from "./components/card-race-week/card-race-week.component";
import { RaceWeekEventRes } from '../../models/event.model';
import { EventService } from '../../services/event.service';
import { CommonModule } from '@angular/common';
import { Session, SessionRes } from '../../models/session.model';
import { formatDateInfo, formatTime } from '../../utils/date.utils';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardCategoryComponent, CardRaceWeekComponent, CommonModule, ProgressSpinnerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  listEventsOfWeek: RaceWeekEventRes[] = []
  weekDateInit: string = '';
  weekDateFinal: string = '';
  weekDateMonth: string = '';
  weekDateYear: string = '';
  formatDateInfo = formatDateInfo;
  formatTime = formatTime;

  

  constructor(
    private eventsService: EventService
  ){};

  ngOnInit(): void {
    this.loadListEventsOfWeek();
  }

  loadListEventsOfWeek(): void {
    const today = new Date();

    const dayOfWeek = today.getDay();
    const diffToMonday = dayOfWeek === 0 ? -6 : (1 - dayOfWeek);

    const dateInitial = new Date(today);
    dateInitial.setDate(today.getDate() + diffToMonday);

    const dateFinal = new Date(dateInitial);
    dateFinal.setDate(dateInitial.getDate() + 6);

    const dateInitialStr = dateInitial.toISOString().split('T')[0];  
    const dateFinalStr = dateFinal.toISOString().split('T')[0];      

    this.eventsService.getEventOfWeekByDate(dateInitialStr, dateFinalStr).subscribe({
      next: (value) => {
        this.listEventsOfWeek = value;
      },
      error: (err) => {
        console.log("Não foi possível buscar as corridas da semana")
      }
    });

    this.weekDateInit = formatDateInfo(dateInitial.toString(), 'day');
    this.weekDateFinal = formatDateInfo(dateFinal.toString(), 'day');

    const monthInitial = formatDateInfo(dateInitial.toString(), 'monthLong');
    const monthFinal = formatDateInfo(dateFinal.toString(), 'monthLong');

    if (monthInitial === monthFinal) {
      this.weekDateMonth = monthInitial;
    } else {
      this.weekDateMonth = `${monthInitial} / ${monthFinal}`;
    }
  }

  getRaceSessionTime(event: any): string {
    const raceSession = event.sessions?.find((session: SessionRes) => session.sessionType === 'RACE');
    return raceSession ? raceSession.datetime : '00:00';
  }
}
