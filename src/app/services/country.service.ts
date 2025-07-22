
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 

export interface Country {
  name: string; 
  code: string;
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1/lang/portuguese?fields=name,cca2';

  constructor(private http: HttpClient) { }

  getCountries(): Observable<Country[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data => {
        return data.map(country => ({
          name: country.name.nativeName.por.common,
          code: country.cca2
        })).sort((a, b) => a.name.localeCompare(b.name));
      })
    );
  }
}