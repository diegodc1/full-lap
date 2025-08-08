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
  },

  {
    path: 'calendar',
    loadComponent: () =>
      import('./features/calendar/calendar.component').then(m => m.CalendarComponent)
  },

  {
    path: 'categories',
    loadComponent: () =>
      import('./features/categories/categories.component').then(m => m.CategoriesComponent)
  },

  {
    path: 'all-races',
    loadComponent: () =>
      import('./features/all-races/all-races.component').then(m => m.AllRacesComponent)
  }
];
