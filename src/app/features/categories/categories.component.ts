import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryContentComponent } from "./category-content/category-content.component";
import { DriverStandingsComponent } from "./driver-standings/driver-standings.component";
import { ActivatedRoute } from '@angular/router';
import { CategoryService, CategoryData } from '../../services/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CategoryContentComponent, 
    DriverStandingsComponent
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit, OnDestroy {
  selectedCategory: string = 'FORMULA1';
  nameCategorySelected: string = 'Fórmula 1';
  private subscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {
    this.route.queryParamMap.subscribe(params => {
      const categoria = params.get('categoria');
      if (categoria) {
        const categoryItem = this.categoryService.menuItems.find(item => item['value'] === categoria);
        if (categoryItem) {
          this.categoryService.selectCategory(categoria, categoryItem.label || '');
        }
      }
    });
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    
    // Inscrever-se nas mudanças de categoria do serviço
    this.subscription.add(
      this.categoryService.selectedCategory$.subscribe((category: CategoryData) => {
        this.selectedCategory = category.value;
        this.nameCategorySelected = category.label;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  

}
