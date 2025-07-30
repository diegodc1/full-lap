import { Component, Input } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { RaceEvent } from '../../../models/event.model';
import { CommonModule } from '@angular/common';
import { formatDateInfo, formatTime } from '../../../utils/date.utils';
import { RouterModule } from '@angular/router';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-category-content',
  imports: [CommonModule, RouterModule, SelectModule],
  templateUrl: './category-content.component.html',
  styleUrl: './category-content.component.scss'
})
export class CategoryContentComponent {
  @Input() categoryKey: string = '';

  raceEvents: RaceEvent[] = [];
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
        console.log(this.raceEvents)
      },
      error: (err) => {
        console.log("Não foi possível buscar os dados da categoria")
      }
    })
  }

  formatTextCountry(text: string): string {
    return text.toLowerCase();
  }
}
