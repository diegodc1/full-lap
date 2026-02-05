import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DatesSetArg } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { formatDateInfo, formatTime } from '../../utils/date.utils';
import { SessionCalendar } from '../../models/session.model';
import { SessionService } from '../../services/session.service';
import { EventService } from '../../services/event.service';
import { EventsCalendar } from '../../models/event.model';
import { CapitalizePipe } from '../../shared/pipes/capitalize.pipe';
import { CategoryImagePipe } from '../../shared/pipes/category-image.pipe';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

interface Evento {
  id: number;
  titulo: string;
  categoria: string;
  local: string;
  data: string;
  cor: string;
  circuit: Circuit;
}

interface Periodo {
  intervalo: string;
  eventos: Evento[];
}

interface Circuit {
  path: string;
}

@Component({
  selector: 'app-calendar',
  imports: [FullCalendarModule, TimelineModule, CardModule, CommonModule, RouterModule, CapitalizePipe, ProgressSpinnerModule, CategoryImagePipe],
  standalone: true,
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit{

  listSessionsCalendar: SessionCalendar[] | undefined;
  listEventsPerWeek: EventsCalendar[] | undefined;
  calendarReady = false;
  calendarOptions!: CalendarOptions; 
  categoriasLegenda: { nome: string; cor: string }[] = [];
  currentMonthSelected: string = '';
  isLoading: boolean = true;
  formatDateInfo = formatDateInfo;
  formatTime = formatTime;

  currentMonthDate!: Date;
  currentMonthLabel: string = '';


  constructor(
    private sessionsService: SessionService,
    private eventsService: EventService
  ){}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.currentMonthDate = new Date(); 
    this.updateMonthLabel();
    this.loadEventsByMonth(this.currentMonthDate);
  }

  changeMonth(step: number) {
    this.currentMonthDate = new Date(
      this.currentMonthDate.getFullYear(),
      this.currentMonthDate.getMonth() + step,
      1
    );

    this.updateMonthLabel();
    this.loadEventsByMonth(this.currentMonthDate);
  }

  updateMonthLabel() {
    this.currentMonthLabel = this.currentMonthDate.toLocaleDateString('pt-BR', {
      month: 'long',
      year: 'numeric'
    });
  }


  loadEventsByMonth(date: Date) {
    this.isLoading = true;
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const dateInic = firstDayOfMonth.toISOString().split('T')[0];
    const dateFinal = lastDayOfMonth.toISOString().split('T')[0];

    this.currentMonthSelected = firstDayOfMonth.toLocaleDateString('pt-BR', {
      month: 'long'
    });

    this.eventsService.getAllEventsPerWeekByDate(dateInic, dateFinal).subscribe({
      next: (events) => {
        this.listEventsPerWeek = events;
        this.isLoading = false;
        console.log('✅ Eventos recebidos:', events);
      },
      error: (err) => {
        console.error('❌ Erro ao buscar eventos:', err);
        this.listEventsPerWeek = [];
      }
    });
  }

  
  parseDate(datetime: string): string {
    return datetime.split('T')[0];
  }
}
