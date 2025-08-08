import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event.service';
import { RaceWeekEventRes } from '../../models/event.model';
import { formatDateInfo, formatTime } from '../../utils/date.utils';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CardRaceWeekComponent } from '../home/components/card-race-week/card-race-week.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-races',
  standalone: true,
  imports: [CommonModule, ProgressSpinnerModule, CardRaceWeekComponent, RouterLink, FormsModule],
  templateUrl: './all-races.component.html',
  styleUrl: './all-races.component.scss'
})
export class AllRacesComponent implements OnInit {
  listEventsOfWeek: RaceWeekEventRes[] = [];
  filteredEvents: RaceWeekEventRes[] = [];
  searchTerm: string = '';
  weekDateInit: string = '';
  weekDateFinal: string = '';
  weekDateMonth: string = '';
  weekDateYear: string = '';
  formatDateInfo = formatDateInfo;
  formatTime = formatTime;

  isLoading: boolean = true;

  constructor(
    private eventsService: EventService
  ){}

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
        this.filteredEvents = [...value];
        this.isLoading = false;
      },
      error: (err) => {
        console.log("Não foi possível buscar as corridas da semana");
        this.isLoading = false;
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
    const raceSession = event.sessions?.find((session: any) => session.sessionType === 'RACE');
    return raceSession ? raceSession.datetime : '00:00';
  }

  searchRaces(event: any): void {
    const term = event.target.value.toLowerCase();
    this.searchTerm = term;
    
    if (!term) {
      this.filteredEvents = [...this.listEventsOfWeek];
      return;
    }
    
    this.filteredEvents = this.listEventsOfWeek.filter(event => 
      event.category.name.toLowerCase().includes(term) || 
      event.name.toLowerCase().includes(term) ||
      event.circuitName.toLowerCase().includes(term) ||
      event.country.toLowerCase().includes(term)
    );
  }
}