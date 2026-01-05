import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { RaceEvent } from '../../../models/event.model';
import { CommonModule } from '@angular/common';
import { formatDateInfo, formatTime } from '../../../utils/date.utils';
import { RouterModule } from '@angular/router';
import { SelectModule } from 'primeng/select';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-category-content',
  imports: [CommonModule, RouterModule, SelectModule, ProgressSpinnerModule, ButtonModule, SelectButtonModule, FormsModule],
  templateUrl: './category-content.component.html',
  styleUrl: './category-content.component.scss'
})
export class CategoryContentComponent {
  @Input() categoryKey: string = '';
  @Output() seasonYearChange = new EventEmitter<number>();


  raceEvents: RaceEvent[] = [];
  filteredRaceEvents: RaceEvent[] = [];
  today: Date = new Date();
  isLoading: Boolean = true;
  showPastRaces: boolean = true;
  nextRaceId: string | null = null;
  formatDateInfo = formatDateInfo;
  formatTime = formatTime;
  selectedSeasonYear: number = 2026;

  stateOptions = [
    { label: '2025', value: 2025},
    { label: '2026', value: 2026}
  ];

  constructor(
    private eventsService: EventService
  ) {}

  ngOnChanges() {
    if (this.categoryKey) {
      this.loadCategoryData(this.categoryKey, this.selectedSeasonYear);
    }
  }

  loadCategoryData(key: string, numberYear: number): void {
    this.isLoading = true;
    this.showPastRaces = true;
    this.eventsService.getAllByCategoryNameAndSeasonYear(key, numberYear).subscribe({
      next: (value) => {
        this.raceEvents = value;
        this.identifyNextRace();
        this.applyFilter();
        this.isLoading = false;
      },
      error: (err) => {
        console.log("Não foi possível buscar os dados da categoria")
        this.isLoading = false;
      }
    })
  }

  onSeasonYearChange(): void {
    this.seasonYearChange.emit(this.selectedSeasonYear);
    this.loadCategoryData(this.categoryKey, this.selectedSeasonYear);
  }


  formatTextCountry(text: string): string {
    return text.toLowerCase();
  }

  isFutureRace(dateFinal: string): boolean {
    const dateAtual = new Date();
    let dateFinalF = new Date(dateFinal.includes('T') ? dateFinal : `${dateFinal}T12:00:00`);
    return dateFinalF < dateAtual;
  }

  identifyNextRace(): void {
    const currentDate = new Date();
    const futureRaces = this.raceEvents.filter(race => {
      const raceDate = new Date(race.dateFinal.includes('T') ? race.dateFinal : `${race.dateFinal}T12:00:00`);
      return raceDate >= currentDate;
    });
    
    if (futureRaces.length > 0) {
      // Ordena por data e pega a primeira (mais próxima)
      futureRaces.sort((a, b) => {
        const dateA = new Date(a.dateFinal.includes('T') ? a.dateFinal : `${a.dateFinal}T12:00:00`);
        const dateB = new Date(b.dateFinal.includes('T') ? b.dateFinal : `${b.dateFinal}T12:00:00`);
        return dateA.getTime() - dateB.getTime();
      });
      this.nextRaceId = futureRaces[0].id;
    }
  }

  togglePastRaces(): void {
    this.showPastRaces = !this.showPastRaces;
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.showPastRaces) {
      this.filteredRaceEvents = this.raceEvents;
    } else {
      const currentDate = new Date();
      this.filteredRaceEvents = this.raceEvents.filter(race => {
        const raceDate = new Date(race.dateFinal.includes('T') ? race.dateFinal : `${race.dateFinal}T12:00:00`);
        return raceDate >= currentDate;
      });
    }
  }

  isNextRace(raceId: string): boolean {
    return this.nextRaceId === raceId;
  }

}
