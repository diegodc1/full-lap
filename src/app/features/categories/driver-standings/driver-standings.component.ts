import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { StandingDrivers } from '../../../models/standing-drivers.model';
import { StandingDriversService } from '../../../services/standing-drivers.service';
import { CategoryService } from '../../../services/category.service';
import { SeasonService } from '../../../services/season.service';

export interface DriverStanding {
  position: number;
  driverName: string;
  teamName?: string;
  points: number;
}

@Component({
  selector: 'app-driver-standings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './driver-standings.component.html',
  styleUrl: './driver-standings.component.scss'
})
export class DriverStandingsComponent implements OnInit, OnDestroy, OnChanges {
  @Input() categoryKey: string = '';
  @Input() seasonYear: number = 2026;

  driverStandings: DriverStanding[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  private subscriptions: Subscription = new Subscription();

  constructor(
    private standingDriversService: StandingDriversService,
    private categoryService: CategoryService,
    private seasonService: SeasonService
  ) {}

  ngOnInit() {
    this.loadStandingsForCategory();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['categoryKey'] && !changes['categoryKey'].firstChange) {
      this.loadStandingsForCategory();
    }
  }

  private loadStandingsForCategory() {
    if (!this.categoryKey) {
      this.driverStandings = [];
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.subscriptions.add(
      this.categoryService.getAllCategories().subscribe({
        next: (categories) => {
          const category = categories.find(cat => {
            const nameMatch = cat.name === this.categoryKey;
            const shortMatch = cat.categoryShort === this.categoryKey;
            const formattedMatch = cat.name.toUpperCase().replace(/\s+/g, '') === this.categoryKey;
            return nameMatch || shortMatch || formattedMatch;
          });
          
          if (!category) {
            this.handleError('Categoria não encontrada');
            return;
          }
          
          this.subscriptions.add(
            this.seasonService.getCurrentSeasonByCategoryId(category.id).subscribe({
              next: (season) => {
      
                this.subscriptions.add(
                  this.standingDriversService.getByCategoryAndSeason(category.id, season.id).subscribe({
                    next: (standings) => {
                      this.driverStandings = this.mapStandingsToDriverStanding(standings);
                      this.isLoading = false;
                    },
                    error: (error) => {
                      this.handleError(error.message || 'Erro ao carregar classificação');
                    }
                  })
                );
              },
              error: (error) => {
                this.handleError('Erro ao carregar temporadas');
              }
            })
          );
        },
        error: (error) => {
          this.handleError('Erro ao carregar categorias');
        }
      })
    );
  }

  private mapStandingsToDriverStanding(standings: StandingDrivers[]): DriverStanding[] {
    return standings.map(standing => ({
      position: standing.position,
      driverName: standing.driverName,
      teamName: standing.teamName,
      points: standing.points
    }));
  }

  private handleError(message: string) {
    this.errorMessage = message;
    this.isLoading = false;
    this.driverStandings = [];
    console.error('Erro no componente de classificação:', message);
  }
}