import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardWatchComponent } from "./components/card-watch/card-watch.component";
import { RaceEvent } from '../../models/event.model';
import { EventService } from '../../services/event.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { formatDateInfo, formatTime } from '../../utils/date.utils';
import { SessionRes } from '../../models/session.model';
import { SessionService } from '../../services/session.service';
import { Transmission } from '../../models/transmission.model';

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
  listSessions: SessionRes[] | undefined;
  mapSession: Map<string, SessionRes[]> = new Map();
  mapSessionArray: { date: string, sessions: SessionRes[] }[] = [];
  mapTransmission: Map<string, Transmission> = new Map();
  mapTransmissionArray: { name: string, transmission: Transmission }[] = [];

  eventDayInitial: string = '';
  eventDayFinal: string = '';
  eventMonth: string = '';
  eventYear: string = '';

  formatDateInfo = formatDateInfo;
  formatTime = formatTime;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private sessionService: SessionService
  ) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') ?? '';
    });
  }

  ngOnInit(): void {
    this.loadRaceData();
    this.loadSessions();
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

  loadSessions() {
    this.sessionService.getAllSessionsByEventId(this.id).subscribe({
        next: (value) => {
          this.listSessions = value;
          this.createMapDateSession(this.listSessions)
          this.createMapTransmissions(this.listSessions);
        },
        error: (err) => {
          console.error("Erro ao busca lista de sessões  a corrida", err)
        }
    })
  }

  createMapDateSession(sessions: SessionRes[]) {
    const tempMap = new Map<string, { iso: string, sessions: SessionRes[] }>();

    sessions.forEach(ses => {
      const key = formatDateInfo(ses.datetime, 'full');
      const isoDate = ses.datetime.split('T')[0];
      const entry = tempMap.get(key);

      if (entry) {
        entry.sessions.push(ses);
      } else {
        tempMap.set(key, {
          iso: isoDate,
          sessions: [ses]
        });
      }
    });

    this.mapSessionArray = Array.from(tempMap.entries())
      .map(([date, { iso, sessions }]) => ({
        date,
        iso,
        sessions
      }))
      .sort((a, b) => new Date(a.iso).getTime() - new Date(b.iso).getTime());
  }

  createMapTransmissions(sessions: SessionRes[]) {
    const transmissionMap = new Map<string, Transmission>();

    sessions.forEach(session => {
      session.transmissions.forEach(transmission => {
        if (!transmissionMap.has(transmission.name)) {
          transmissionMap.set(transmission.name, transmission);
        }
      });
    });

    this.mapTransmission = transmissionMap;
    this.mapTransmissionArray = Array.from(transmissionMap.entries()).map(([name, transmission]) => ({
      name,
      transmission
    }));
  }


}
