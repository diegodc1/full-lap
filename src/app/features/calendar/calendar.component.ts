import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';


@Component({
  selector: 'app-calendar',
  imports: [FullCalendarModule],
  standalone: true,
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {

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
