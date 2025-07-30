import { Component, NgModule } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule, NgModel } from '@angular/forms';
import { CategoryContentComponent } from "./category-content/category-content.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [MenuModule, AutoCompleteModule, FormsModule, CategoryContentComponent, CategoryContentComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  selectedCategory: string = 'ALL';
  searchText: string = '';

  items: string[] = [];

  constructor(private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe(params => {
      const categoria = params.get('categoria');
      if (categoria) {
        this.selectCategory(categoria);
      }
    });
  }

  
  menuItems: MenuItem[] = [ 
    {
      label: 'Fórmula 1',
      icon: 'pi pi-circle-off',
      command: () => this.selectCategory('FORMULA1')
    },
    {
      label: 'Stock Car',
      icon: 'pi pi-circle-off',
      command: () => this.selectCategory('STOCK_CAR')
    },
    {
      label: 'Nascar Brasil',
      icon: 'pi pi-circle-off',
      command: () => this.selectCategory('NASCAR_BRASIL'),
      tooltip: 'Em breve'
    },
    {
      label: 'Fórmula Indy',
      icon: 'pi pi-circle-off',
      command: () => this.selectCategory('FORMULA_INDY'),
      disabled: true,
      badge: 'Em breve',
      badgeStyleClass: 'badge-menu'
    },
    {
      label: 'Fórmula Truck',
      icon: 'pi pi-circle-off',
      command: () => this.selectCategory('FORMULA_TRUCK'),
      disabled: true,
      badge: 'Em breve',
      badgeStyleClass: 'badge-menu'
    },
    {
      label: 'Copa Truck',
      icon: 'pi pi-circle-off',
      command: () => this.selectCategory('COPA_TRUCK'),
      disabled: true,
      badge: 'Em breve',
      badgeStyleClass: 'badge-menu'
    },
    {
      label: 'Porsche Cup',
      icon: 'pi pi-circle-off',
      command: () => this.selectCategory('PORSCHE_CUP'),
      disabled: true,
      badge: 'Em breve',
      badgeStyleClass: 'badge-menu'
    },
    {
      label: 'WEC',
      icon: 'pi pi-circle-off',
      command: () => this.selectCategory('WEC'),
      disabled: true,
      badge: 'Em breve',
      badgeStyleClass: 'badge-menu'
    },
    {
      label: 'IMSA',
      icon: 'pi pi-circle-off',
      command: () => this.selectCategory('IMSA'),
      disabled: true,
      badge: 'Em breve',
      badgeStyleClass: 'badge-menu'
    },
  ]

  selectCategory(category: string) {
    this.selectedCategory = category;
    console.log("Mudou:", this.selectedCategory)
  }

  search(event: any) {
    const query = event.query.toLowerCase();
    const allSuggestions = ['Fórmula 1', 'Stock Car', 'Nascar', 'Indy', 'WEC'];

    this.items = allSuggestions.filter(s => s.toLowerCase().includes(query));
  }


  

}
