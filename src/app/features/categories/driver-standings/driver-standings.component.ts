import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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
export class DriverStandingsComponent {
  @Input() categoryKey: string = '';

  // Dados estáticos para demonstração
  driverStandings: DriverStanding[] = [
    { position: 1, driverName: 'Max Verstappen', teamName: 'Red Bull Racing', points: 575 },
    { position: 2, driverName: 'Lando Norris', teamName: 'McLaren', points: 374 },
    { position: 3, driverName: 'Charles Leclerc', teamName: 'Ferrari', points: 356 },
    { position: 4, driverName: 'Oscar Piastri', teamName: 'McLaren', points: 292 },
    { position: 5, driverName: 'Carlos Sainz', teamName: 'Ferrari', points: 290 },
    { position: 6, driverName: 'George Russell', teamName: 'Mercedes', points: 245 },
    { position: 7, driverName: 'Lewis Hamilton', teamName: 'Mercedes', points: 223 },
    { position: 8, driverName: 'Sergio Pérez', teamName: 'Red Bull Racing', points: 152 },
    { position: 9, driverName: 'Fernando Alonso', teamName: 'Aston Martin', points: 68 },
    { position: 10, driverName: 'Nico Hülkenberg', teamName: 'Haas', points: 37 },
    { position: 11, driverName: 'Yuki Tsunoda', teamName: 'RB', points: 30 },
    { position: 12, driverName: 'Pierre Gasly', teamName: 'Alpine', points: 26 },
    { position: 13, driverName: 'Lance Stroll', teamName: 'Aston Martin', points: 24 },
    { position: 14, driverName: 'Esteban Ocon', teamName: 'Alpine', points: 23 },
    { position: 15, driverName: 'Kevin Magnussen', teamName: 'Haas', points: 16 },
    { position: 16, driverName: 'Alexander Albon', teamName: 'Williams', points: 12 },
    { position: 17, driverName: 'Daniel Ricciardo', teamName: 'RB', points: 12 },
    { position: 18, driverName: 'Oliver Bearman', points: 7 },
    { position: 19, driverName: 'Franco Colapinto', teamName: 'Williams', points: 5 },
    { position: 20, driverName: 'Liam Lawson', teamName: 'RB', points: 4 }
  ];

  constructor() {}

  ngOnChanges() {
    // Aqui futuramente será implementada a lógica para buscar dados baseados na categoria
    this.loadStandingsForCategory();
  }

  private loadStandingsForCategory() {
    // Por enquanto mantém os dados estáticos
    // Futuramente aqui será feita a integração com o backend
    console.log(`Carregando classificação para categoria: ${this.categoryKey}`);
  }
}