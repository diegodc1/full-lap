import { Component, Input } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { RaceEvent } from '../../../models/event.model';
import { CommonModule } from '@angular/common';
import { formatDateInfo, formatTime } from '../../../utils/date.utils';
import { RouterModule } from '@angular/router';
import { SelectModule } from 'primeng/select';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-category-content',
  imports: [CommonModule, RouterModule, SelectModule, ProgressSpinnerModule],
  templateUrl: './category-content.component.html',
  styleUrl: './category-content.component.scss'
})
export class CategoryContentComponent {
  @Input() categoryKey: string = '';

  raceEvents: RaceEvent[] = [];
  today: Date = new Date();
  isLoading: Boolean = true;
  formatDateInfo = formatDateInfo;
  formatTime = formatTime;


  constructor(
    private eventsService: EventService
  ) {}

  ngOnChanges() {
    if (this.categoryKey) {
      this.loadCategoryData(this.categoryKey);
    }
  }

  loadCategoryData(key: string) {
    this.eventsService.getAllByCategoryNameAndSeasonYear(this.categoryKey, 2025).subscribe({
      next: (value) => {
        this.raceEvents = value;
        this.isLoading = false;
      },
      error: (err) => {
        console.log("Não foi possível buscar os dados da categoria")
        this.isLoading = false;
      }
    })
  }

  formatTextCountry(text: string): string {
    return text.toLowerCase();
  }

  isFutureRace(dateFinal: string): boolean {
    const dateAtual = new Date();
    let dateFinalF = new Date(dateFinal.includes('T') ? dateFinal : `${dateFinal}T12:00:00`);
    return dateFinalF < dateAtual;
  }

}
