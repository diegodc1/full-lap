import { Routes } from '@angular/router';
import { RaceComponent } from './features/race/race.component';

export const routes: Routes = [
    {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'race/:id',
    loadComponent: () =>
      import('./features/race/race.component').then(m => m.RaceComponent)
  }
];
