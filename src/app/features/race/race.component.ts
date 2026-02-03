import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CardWatchComponent } from "./components/card-watch/card-watch.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RaceEvent } from '../../models/event.model';
import { EventService } from '../../services/event.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { formatDateInfo, formatTime } from '../../utils/date.utils';
import { SessionRes } from '../../models/session.model';
import { SessionService } from '../../services/session.service';
import { Transmission } from '../../models/transmission.model';
import { SeoService } from '../../core/services/seo.service';
import { StructuredDataService } from '../../core/services/structured-data.service';
import { WeatherService, WeatherData } from '../../services/weather.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RaceAlertService } from '../../services/race-alert.service';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';




@Component({
  selector: 'app-race',
  standalone: true,
  imports: [CommonModule, CardWatchComponent, ProgressSpinnerModule, ReactiveFormsModule, ToastModule, ButtonModule],
  templateUrl: './race.component.html',
  styleUrl: './race.component.scss',
  providers: [MessageService],
  animations: [
    trigger('toggleRaceAlert', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(-12px)', maxHeight: 0}),
        animate('300ms ease-out', style({opacity: 1, transform: 'translateY(0)', maxHeight: '500px'}))
      ]),
      transition(':leave', [
        animate('50ms ease-in', style({opacity: 0, transform: 'translateY(-12px)', maxHeight: 0}))
      ])
    ])
  ]
})
export class RaceComponent implements OnInit, OnDestroy {
  id = '';
  slug = '';
  race: RaceEvent | undefined;
  listSessions: SessionRes[] | undefined;
  mapSession: Map<string, SessionRes[]> = new Map();
  mapSessionArray: { date: string, sessions: SessionRes[] }[] = [];
  mapTransmission: Map<string, Transmission> = new Map();
  mapTransmissionArray: { name: string, transmission: Transmission }[] = [];
  sessionsLoaded: boolean = false;
  alertForm!: FormGroup; 

  eventDayInitial: string = '';
  eventDayFinal: string = '';
  eventMonth: string = '';
  eventYear: string = '';

  // Race alert properties
  showAlertBox: boolean = false;

  // Countdown timer properties
  countdownTarget: Date | null = null;
  countdownDisplay: string = '';
  countdownInterval: any;
  showCountdown: boolean = false;

  // Weather properties
  weatherData: WeatherData | null = null;
  weatherLoading: boolean = false;
  showWeather: boolean = false;

  // Race status
  isRacePast: boolean = false;

  userEmail: string = '';

  formatDateInfo = formatDateInfo;
  formatTime = formatTime;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private sessionService: SessionService,
    private raceAlertService: RaceAlertService,
    private seoService: SeoService,
    private structuredDataService: StructuredDataService,
    private weatherService: WeatherService,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder, 
    private messageService: MessageService
  ) {
    this.route.paramMap.subscribe(params => {
      this.slug = params.get('slug') ?? '';
      console.log('Route params:', { slug: this.slug})
    });
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.loadRaceData();
    this.initializerRaceAlertForm();
  }

  initializerRaceAlertForm(): void {
    this.alertForm = this.fb.group({
      email: ['', Validators.required],
      time: ['', Validators.required],
      allRaces: ['', Validators.required],
    })
  }

  loadRaceData() {
    this.eventService.getEventBySlug(this.slug).subscribe({
      next: (value) => {
        this.id = value.id;
        this.race = value;
        this.eventDayInitial = formatDateInfo(value.dateInitial, 'day')
        this.eventDayFinal = formatDateInfo(value.dateFinal, 'day')
        this.eventMonth = formatDateInfo(value.dateFinal, 'monthLong').toLowerCase()
        this.eventYear = formatDateInfo(value.dateFinal, 'year')
        
        this.loadWeatherData();
        
        if (value.circuit?.name && value.circuit?.country) {
          this.seoService.updateRacePageMeta({
            name: value.name || 'Corrida F1',
            circuit: value.circuit.name,
            date: formatDateInfo(value.dateInitial, 'full'),
            country: value.circuit.country,
            category: value.category?.name || 'Automobilismo',
            year: this.eventYear ? parseInt(this.eventYear) : (new Date()).getFullYear()
          });
          
          this.structuredDataService.addRaceEvent({
            name: value.name || 'Corrida F1',
            circuit: value.circuit.name,
            country: value.circuit.country,
            city: value.circuit.country,
            dateStart: value.dateInitial || '',
            dateEnd: value.dateFinal || '',
            url: `https://fulllap.com/race/${this.slug}`
          });
        }
         this.loadSessions();
      }, 
      error: (err) => {
         console.error("Não foi possível buscar os dados da corrida")
       } 
     });
  }

  loadSessions() {
    this.sessionService.getAllSessionsByEventId(this.id).subscribe({
        next: (value) => {
          this.listSessions = value;
          this.createMapDateSession(this.listSessions)
          this.createMapTransmissions(this.listSessions);
          this.setupCountdown();
          this.sessionsLoaded = true;
        },
        error: (err) => {
          console.error("Erro ao busca lista de sessões  a corrida", err)
          this.sessionsLoaded = true;
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
        const isValidTransmission = !transmission.name.toLowerCase().includes('sem transmissão') &&
                                   !transmission.name.toLowerCase().includes('sem transmissao') 
        
        if (isValidTransmission && !transmissionMap.has(transmission.name)) {
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

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  private setupCountdown(): void {
    this.countdownTarget = this.getCountdownTargetDate();
    
    if (this.countdownTarget && this.countdownTarget > new Date()) {
      this.showCountdown = true;
      this.updateCountdown();
      this.countdownInterval = setInterval(() => {
        this.updateCountdown();
      }, 1000);
    } else {
      this.showCountdown = false;
    }
  }

  private getCountdownTargetDate(): Date | null {
    if (this.listSessions && this.listSessions.length > 0) {
      const sortedSessions = this.listSessions.sort((a, b) => 
        new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
      );
      return new Date(sortedSessions[0].datetime);
    }
  

    if (this.race?.dateInitial) {
      return new Date(this.race.dateInitial);
    }
    
    return null;
  }

  private updateCountdown(): void {
    if (!this.countdownTarget) {
      this.showCountdown = false;
      return;
    }

    const now = new Date();
    const timeDiff = this.countdownTarget.getTime() - now.getTime();

    if (timeDiff <= 0) {
      this.countdownDisplay = 'Evento iniciado!';
      this.showCountdown = false;
      if (this.countdownInterval) {
        clearInterval(this.countdownInterval);
      }
      return;
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    if (days > 0) {
      this.countdownDisplay = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else if (hours > 0) {
      this.countdownDisplay = `${hours}h ${minutes}m ${seconds}s`;
    } else {
      this.countdownDisplay = `${minutes}m ${seconds}s`;
     }
   }

  private loadWeatherData(): void {
    console.log('loadWeatherData called');
    console.log('Race data:', this.race);
    
    if (!this.race?.city || !this.race?.country || !this.race?.dateFinal) {
      console.log('Missing required data for weather:', {
        city: this.race?.city,
        country: this.race?.country,
        dateFinal: this.race?.dateFinal
      });
      return;
    }

    // Verificar se a corrida ainda não aconteceu
     const raceDate = new Date(this.race.dateFinal);
     const currentDate = new Date();
     
     // Comparar apenas as datas (sem horário)
     const raceDateOnly = new Date(raceDate.getFullYear(), raceDate.getMonth(), raceDate.getDate());
     const currentDateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
     
     this.isRacePast = raceDateOnly < currentDateOnly;
     
     if (this.isRacePast) {
       console.log('Race has already happened, skipping weather data');
       this.showWeather = false;
       return;
     }

    this.weatherLoading = true;
    this.showWeather = true;

    // Usar a data final do evento (último dia da corrida)
    const dateString = raceDate.toISOString().split('T')[0]; // YYYY-MM-DD format

    console.log('Weather request params:', { city: this.race.city, country: this.race.country, date: dateString });

    this.weatherService.getWeatherForDate(this.race.city, this.race.country, dateString)
      .subscribe({
        next: (weather) => {
          console.log('Weather data received:', weather);
          this.weatherData = weather;
          this.weatherLoading = false;
        },
        error: (error) => {
          console.error('Erro ao carregar dados meteorológicos:', error);
          this.weatherLoading = false;
          this.showWeather = false;
        }
      });
   }

  public clickRaceAlert() {
    this.showAlertBox = !this.showAlertBox;
  }

  public selectTime(value: string): void {
    this.alertForm.patchValue({
      time: value
    });
  }

  public selectAllRaces(value: string): void {
    this.alertForm.patchValue({
      allRaces: value
    });
  }


  onSubmit(): void {
    if (this.alertForm.invalid) {
      this.alertForm.markAllAsTouched();
      return;
    }
    const alertData = this.alertForm.value;

    this.raceAlertService.createAlert({
      eventId: this.id,
      email: alertData.email, 
      time: alertData.time,
      allRaces: alertData.allRaces,
    }).subscribe({
      next: (response) => {
        this.showSuccess("Alerta criado com sucesso!", "Você receberá um e-mail antes da corrida.");
        this.closeAlert();
      },
      error: (error) => {
        if (error.status === 409) {
          console.log(error)
          this.showWarnError(
            'Não foi possível criar o alerta',
            error.error || 'Alerta já existente'
          );
          return;
        }
        this.showError("Erro ao criar alerta", "Por favor, tente novamente mais tarde.");
        this.showAlertError(error.message);
      }
    })
  }

  closeAlert(): void {
    this.showAlertBox = false;
    this.alertForm.reset();
  }

  showAlertError(message: string): void {
    alert(`Erro ao criar alerta: ${message}`);
  }
   
  getYouTubeVideoId(url: string): string {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
  }

  getSafeUrl(videoUrl: string): SafeResourceUrl {
    const videoId = this.getYouTubeVideoId(videoUrl);
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  
  showSuccess(summary: string, message: string) {
    this.messageService.add({ severity: 'success', summary: summary, detail: message});
  }

  showWarnError(summary: string, message: string) {
    this.messageService.add({ severity: 'warn', summary: summary, detail: message});
  }

  showError(summary: string, message: string) {
    this.messageService.add({ severity: 'error',  summary: summary, detail: message});
  }
}
