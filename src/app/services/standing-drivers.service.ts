import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { StandingDrivers } from '../models/standing-drivers.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StandingDriversService {
  private apiUrl = `${environment.apiUrl}/standing-drivers`;

  constructor(private http: HttpClient) {}

  /**
   * Busca classificação de pilotos por categoria e temporada
   * @param categoryId UUID da categoria
   * @param seasonId UUID da temporada
   * @returns Observable com lista de classificação de pilotos
   */
  getByCategoryAndSeason(categoryId: string, seasonId: string): Observable<StandingDrivers[]> {
    const url = `${this.apiUrl}/category/${categoryId}/season/${seasonId}`;
    
    return this.http.get<StandingDrivers[]>(url).pipe(
      map(response => {
        // Ordenar por posição para garantir ordem correta
        return response.sort((a, b) => a.position - b.position);
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Tratamento de erros HTTP
   * @param error Erro HTTP
   * @returns Observable com erro tratado
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Erro desconhecido';
    
    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do lado do servidor
      switch (error.status) {
        case 404:
          errorMessage = 'Dados de classificação não encontrados';
          break;
        case 500:
          errorMessage = 'Erro interno do servidor';
          break;
        default:
          errorMessage = `Erro ${error.status}: ${error.message}`;
      }
    }
    
    console.error('Erro no serviço de classificação de pilotos:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}