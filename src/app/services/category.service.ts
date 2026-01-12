import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Category } from '../models/category.model';
import { environment } from '../../environments/environment';
import { MenuItem } from 'primeng/api';

export interface CategoryData {
  value: string;
  label: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = `${environment.apiUrl}/categories`;

  // Gerenciamento de categoria selecionada
  private selectedCategorySubject = new BehaviorSubject<CategoryData>({
    value: 'FORMULA1',
    label: 'Fórmula 1'
  });

  selectedCategory$ = this.selectedCategorySubject.asObservable();

  menuItems: MenuItem[] = [
    {
      label: 'Fórmula 1',
      value: 'FORMULA1',
      icon: 'pi pi-circle-off',
      command: () => this.selectCategory('FORMULA1', 'Fórmula 1')
    },
    {
      label: 'Fórmula Indy',
      value: 'FORMULA_INDY',
      icon: 'pi pi-circle-off',
      command: () => this.selectCategory('FORMULA_INDY', 'Fórmula Indy'),
    },
    {
      label: 'Stock Car',
      value: 'STOCK_CAR',
      icon: 'pi pi-circle-off',
      command: () => this.selectCategory('STOCK_CAR', 'Stock Car')
    },
    {
      label: 'Nascar Brasil',
      value: 'NASCAR_BRASIL',
      icon: 'pi pi-circle-off',
      command: () => this.selectCategory('NASCAR_BRASIL', 'Nascar Brasil'),
      tooltip: 'Em breve'
    },
    {
      label: 'Fórmula Truck',
      value: 'FORMULA_TRUCK',
      icon: 'pi pi-circle-off',
      command: () => this.selectCategory('FORMULA_TRUCK', 'Fórmula Truck'),
      disabled: true,
      badge: 'Em breve',
      badgeStyleClass: 'badge-menu'
    },
    {
      label: 'Copa Truck',
      value: 'COPA_TRUCK',
      icon: 'pi pi-circle-off',
      command: () => this.selectCategory('COPA_TRUCK', 'Copa Truck'),
    },
    {
      label: 'Porsche Cup',
      value: 'PORSCHE_CUP',
      icon: 'pi pi-circle-off',
      command: () => this.selectCategory('PORSCHE_CUP', 'Porsche Cup'),
      disabled: false,
    },
    {
      label: 'WEC',
      value: 'WEC',
      icon: 'pi pi-circle-off',
      command: () => this.selectCategory('WEC', 'WEC'),
      disabled: true,
      badge: 'Em breve',
      badgeStyleClass: 'badge-menu'
    },
    {
      label: 'IMSA',
      value: 'IMSA',
      icon: 'pi pi-circle-off',
      command: () => this.selectCategory('IMSA', 'IMSA'),
      disabled: true,
      badge: 'Em breve',
      badgeStyleClass: 'badge-menu'
    }
  ];

constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

  createCategory(event: Event): Observable<Category> {
    console.log(event)
    return this.http.post<Category>(this.apiUrl, event);
  }

  updateCategory(id: string, event: Event): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${id}`, event);
  }

  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Métodos para gerenciar categoria selecionada
  selectCategory(value: string, label: string) {
    this.selectedCategorySubject.next({ value, label });
  }

  getCurrentCategory(): CategoryData {
    return this.selectedCategorySubject.value;
  }
}
