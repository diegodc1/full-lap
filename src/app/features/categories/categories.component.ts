import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-categories',
  imports: [MenuModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  menuItems: MenuItem[] = [
    {
      label: 'Todas as Categorias',
      icon: 'pi pi-circle-off',
      url: '/'
    },
    {
      label: 'Fórmula 1',
      icon: 'pi pi-circle-off',
      url: '/calendar'
    },
    {
      label: 'Stock Car',
      icon: 'pi pi-circle-off',
      url: '/calendar'
    },
    {
      label: 'Nascar Brasil',
      icon: 'pi pi-circle-off',
      url: '/calendar',
      tooltip: 'Em breve'
    },
    {
      label: 'Fórmula Indy',
      icon: 'pi pi-circle-off',
      url: '/calendar',
      disabled: true,
      badge: 'Em breve',
      badgeStyleClass: 'badge-menu'
    },
    {
      label: 'Fórmula Truck',
      icon: 'pi pi-circle-off',
      url: '/calendar',
      disabled: true,
      badge: 'Em breve',
      badgeStyleClass: 'badge-menu'
    },
    {
      label: 'Copa Truck',
      icon: 'pi pi-circle-off',
      url: '/calendar',
      disabled: true,
      badge: 'Em breve',
      badgeStyleClass: 'badge-menu'
    },
    {
      label: 'Porsche Cup',
      icon: 'pi pi-circle-off',
      url: '/calendar',
      disabled: true,
      badge: 'Em breve',
      badgeStyleClass: 'badge-menu'
    },
    {
      label: 'WEC',
      icon: 'pi pi-circle-off',
      url: '/calendar',
      disabled: true,
      badge: 'Em breve',
      badgeStyleClass: 'badge-menu'
    },
    {
      label: 'IMSA',
      icon: 'pi pi-circle-off',
      url: '/calendar',
      disabled: true,
      badge: 'Em breve',
      badgeStyleClass: 'badge-menu'
    },
  ]

  

}
