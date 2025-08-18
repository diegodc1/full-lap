import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { CategoryService, CategoryData } from '../../services/category.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sub-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sub-header.component.html',
  styleUrl: './sub-header.component.scss'
})
export class SubHeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('categoriesContainer', { static: false }) categoriesContainer!: ElementRef;
  
  selectedCategory: string = 'FORMULA1';
  categoryOptions: any[] = [];
  visibleCategories: any[] = [];
  overflowCategories: any[] = [];
  currentCategoryLabel: string = 'Fórmula 1';
  showDropdown: boolean = false;
  isOnCategoriesPage: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.categoryOptions = this.categoryService.menuItems.map(item => ({
      label: item.label,
      value: item['value'],
      disabled: item.disabled,
      badge: item.badge
    }));

    this.subscription.add(
      this.categoryService.selectedCategory$.subscribe((category: CategoryData) => {
        this.selectedCategory = category.value;
        this.currentCategoryLabel = category.label;
      })
    );

    // Verificar rota atual e monitorar mudanças de rota
    this.checkCurrentRoute();
    this.subscription.add(
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        this.checkCurrentRoute();
      })
    );
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.calculateVisibleCategories();
    }, 0);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.calculateVisibleCategories();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onCategoryClick(categoryValue: string | null) {
    // Encontra o label da categoria selecionada
    let categoryLabel = 'Todas as categorias';
    if (categoryValue) {
      const category = this.categoryOptions.find(cat => cat.value === categoryValue);
      categoryLabel = category ? category.label : categoryValue;
    }
    
    // Seleciona a categoria no serviço
    if (categoryValue) {
      this.categoryService.selectCategory(categoryValue, categoryLabel);
    }
    
    // Navega para a página de categorias com o parâmetro
    if (categoryValue) {
      this.router.navigate(['/categories'], { queryParams: { categoria: categoryValue } });
    } else {
      this.router.navigate(['/categories']);
    }
  }

  getCurrentCategoryLabel(): string {
    return this.currentCategoryLabel;
  }

  calculateVisibleCategories() {
    if (!this.categoriesContainer) return;

    const container = this.categoriesContainer.nativeElement;
    const containerWidth = container.offsetWidth;
    const maxWidth = containerWidth * 0.8; // 80% da largura
    
    let currentWidth = 0;
    const buttonPadding = 32; // padding estimado para cada botão
    const buttonMargin = 8; // margem entre botões
    
    this.visibleCategories = [];
    this.overflowCategories = [];
    
    // Sempre incluir "Todas as categorias" se couber
    const allCategoriesWidth = 150; // largura estimada do botão "Todas as categorias"
    if (currentWidth + allCategoriesWidth <= maxWidth) {
      currentWidth += allCategoriesWidth + buttonMargin;
    }
    
    for (const category of this.categoryOptions) {
      if (category.disabled) continue;
      
      // Estimar largura do botão baseado no texto
      const estimatedWidth = (category.label.length * 8) + buttonPadding + buttonMargin;
      
      if (currentWidth + estimatedWidth <= maxWidth) {
        this.visibleCategories.push(category);
        currentWidth += estimatedWidth;
      } else {
        this.overflowCategories.push(category);
      }
    }
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  closeDropdown() {
    this.showDropdown = false;
  }

  checkCurrentRoute() {
    this.isOnCategoriesPage = this.router.url.includes('/categories');
  }

  isCategoryActive(categoryValue: string | null): boolean {
    if (!this.isOnCategoriesPage) {
      return false;
    }
    
    if (categoryValue === null) {
      return !this.selectedCategory;
    }
    
    return this.selectedCategory === categoryValue;
  }
}