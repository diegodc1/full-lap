import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
  imports: [FullCalendarModule, TimelineModule, CardModule, CommonModule, RouterModule],
  standalone: true,
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {


eventosPorPeriodo: Periodo[] = [
  {
    intervalo: '04-06 de Julho',
    eventos: [
      {
        id: 0,
        titulo: 'GP da Grã-Bretanha',
        categoria: 'F1',
        local: 'Silverstone',
        data: '06/07/2025 11:00',
        cor: '#EE6F17',
        circuit: {
          path: 'formula1/ferrari-2.jpg'
        }
      },
      {
        id: 0,
        titulo: '6 Horas de Monza',
        categoria: 'WEC',
        local: 'Monza',
        data: '06/07/2025 07:00',
        cor: '#E21A30',
        circuit: {
          path: 'formula-indy/formula-indy-1.jpg'
        }
      },
      {
        id: 0,
        titulo: 'Etapa de Cascavel',
        categoria: 'Nascar Brasil',
        local: 'Cascavel',
        data: '06/07/2025 14:00',
        cor: '#E21A30',
        circuit: {
          path: 'stock-car/stock-car-1.jpg'
        }
      }
    ]
  },
  {
    intervalo: '25-27 de Julho',
    eventos: [
      {
        id: 0,
        titulo: 'Etapa do Veloccita',
        categoria: 'Porsche Cup',
        local: 'Velocitta',
        data: '26/07/2025 15:00',
        cor: '#009639',
        circuit: {
          path: 'porsche-cup/porsche-cup-nao-usar.jpg'
        }
      }
    ]
  },
  {
    intervalo: '14-15 de Julho',
    eventos: [
      {
        id: 0,
        titulo: 'Etapa Interlagos',
        categoria: 'Nascar Brasil',
        local: 'Interlagos',
        data: '15/07/2025 10:00',
        cor: '#009639',
        circuit: {
          path: 'formula1/ferrari.jpg'
        }
      }
    ]
  }
];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: ptBrLocale, 
    plugins: [dayGridPlugin],
    headerToolbar: {  // diretamente aqui
      left: 'prev',
      center: 'title',
      right: 'next'
    },
    events: [
      { title: 'F1 GP Brasil', date: '2025-11-10', color: '#EE6F17' },
      { title: 'F1 GP Mexico', date: '2025-07-15', color: '#EE6F17' },
      { title: 'Stock Car Interlagos', date: '2025-07-15', color: '#1E90FF' },
      { title: 'Nascar Brasil', date: '2025-07-20', color: '#32CD32' }
    ],
    eventContent: function(arg) {
      return {
        html: `<div class="event-dot" style="background-color: ${arg.event.backgroundColor};"></div>`
      };
    },
    eventDidMount: function(info) {
      const categoria = info.event.extendedProps['categoria'] || '';
      tippy(info.el, {
        content: `${info.event.title}`,
        theme: 'light',
        placement: 'top'
      });
    }
  };

}
