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
  imports: [FullCalendarModule, TimelineModule, CardModule, CommonModule, RouterModule, CapitalizePipe, CategoryImagePipe],
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
  formatDateInfo = formatDateInfo;
  formatTime = formatTime;

  constructor(
    private sessionsService: SessionService,
    private eventsService: EventService
  ){}

  ngOnInit(): void {
      this.loadListSessionsCalendar();
  }


  loadListSessionsCalendar() {
    const maxMonths = 6;

    this.sessionsService.getAllSessionsCalendarByMaxMonth(maxMonths).subscribe({
      next: (value) => {
        this.listSessionsCalendar = value;
        this.createCalendarEvents(this.listSessionsCalendar);
        this.createCalendarLegend(this.listSessionsCalendar)
      }, 
      error: (err) => {
        console.error("Erro ao buscar eventos do calendário", err)
      }
    })
  }

  createCalendarEvents(listSessions: SessionCalendar[]) {
  
    const eventosFormatados = listSessions.map(session => ({
      title: session.eventName + ' - ' + session.name,
      date: this.parseDate(session.datetime), 
      color: session.categoryColor,
      extendedProps: {
        sessionType: session.sessionType,
        description: session.description,
        eventName: session.eventName,
        sessionTime: formatTime(session.datetime),
        categoryName: session.categoryName,
        categoryColor: session.categoryColor
      }
    }));

    this.calendarOptions = {
      initialView: 'dayGridMonth',
      locale: ptBrLocale, 
      plugins: [dayGridPlugin],
      
      headerToolbar: {  
        left: 'prev',
        center: 'title',
        right: 'next'
      },
      events: eventosFormatados,
      eventContent: function(arg) {
        return {
          html: `<div class="event-dot" style="background-color: ${arg.event.backgroundColor};"></div>`
        };
      },
      eventDidMount: function(info) {
        tippy(info.el, {
          content: `
            <strong>${info.event.extendedProps['categoryName']}</strong><br>
            <span>${info.event.title}</span><br><br>
            <span>Horário: <strong>${info.event.extendedProps['sessionTime']}</strong></span>
            `,
          theme: 'light',
          placement: 'top',
          allowHTML: true
        });
      },
      datesSet: this.onMonthChange.bind(this),
    };

    this.calendarReady = true;
  }

  createCalendarLegend(listSessions:  SessionCalendar[]) {
    const mapaCategorias = new Map<string, string>();
      listSessions.forEach(session => {
        if (!mapaCategorias.has(session.categoryName)) {
          mapaCategorias.set(session.categoryName, session.categoryColor);
        }
    });

    this.categoriasLegenda = Array.from(mapaCategorias.entries()).map(([nome, cor]) => ({
      nome,
      cor
    }));
  }

  onMonthChange(info: DatesSetArg) {
    const viewStart = info.view.currentStart; 

    const firstDayOfMonth = new Date(viewStart.getFullYear(), viewStart.getMonth(), 1);
    const lastDayOfMonth = new Date(viewStart.getFullYear(), viewStart.getMonth() + 1, 0);

    const dateInic = firstDayOfMonth.toISOString().split('T')[0];
    const dateFinal = lastDayOfMonth.toISOString().split('T')[0];

    this.currentMonthSelected = firstDayOfMonth.toLocaleDateString('pt-BR', { month: 'long' });

    this.eventsService.getAllEventsPerWeekByDate(dateInic, dateFinal).subscribe({
      next: (events) => {
        this.listEventsPerWeek = events;
        console.log("✅ Eventos recebidos:", this.listEventsPerWeek);
      },
      error: (err) => {
        console.error('❌ Erro ao buscar eventos:', err);
      }
    });
  }
  
  parseDate(datetime: string): string {
    return datetime.split('T')[0];
  }
}
