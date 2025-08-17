import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { StandingsService } from '../../../services/standings.service';
import { DriverStanding, TeamStanding, StandingsResponse } from '../../../models/standings.model';

@Component({
  selector: 'app-category-standings',
  standalone: true,
  imports: [CommonModule, ProgressSpinnerModule, TableModule, TabViewModule],
  templateUrl: './category-standings.component.html',
  styleUrl: './category-standings.component.scss'
})
export class CategoryStandingsComponent implements OnChanges {
  @Input() categoryKey: string = '';

  driverStandings: DriverStanding[] = [];
  teamStandings: TeamStanding[] = [];
  isLoading: boolean = true;
  hasError: boolean = false;
  errorMessage: string = '';

  constructor(private standingsService: StandingsService) {}

  ngOnChanges() {
    if (this.categoryKey) {
      this.loadStandings();
    }
  }

  loadStandings() {
    this.isLoading = true;
    this.hasError = false;
    
    this.standingsService.getStandingsByCategoryAndSeason(this.categoryKey, 2025).subscribe({
      next: (response: StandingsResponse) => {
        this.driverStandings = response.drivers || [];
        this.teamStandings = response.teams || [];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar classificação:', error);
        this.hasError = true;
        this.errorMessage = 'Não foi possível carregar a classificação desta categoria.';
        this.isLoading = false;
      }
    });
  }

  getPositionClass(position: number): string {
    if (position === 1) return 'position-first';
    if (position === 2) return 'position-second';
    if (position === 3) return 'position-third';
    return '';
  }
}
