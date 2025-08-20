import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';

export interface WeatherData {
  temperature: number;
  weatherCode: number;
  windSpeed: number;
  humidity: number;
  description: string;
  icon: string;
}

export interface WeatherResponse {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
    wind_speed_10m_max: number[];
    relative_humidity_2m: number[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly baseUrl = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) {}

  getWeatherForDate(city: string, country: string, date: string): Observable<WeatherData | null> {
    console.log('🚀 Starting weather request for:', { city, country, date });
    
    return this.getCoordinates(city, country).pipe(
      switchMap(coords => {
        if (!coords) {
          console.log('❌ No coordinates found, returning null');
          return of(null);
        }
        console.log('✅ Got coordinates, fetching weather:', coords);
        return this.getWeatherByCoordinates(coords.lat, coords.lon, date);
      }),
      catchError(error => {
        console.error('❌ Error in getWeatherForDate:', error);
        return of(null);
      })
    );
  }

  private getCoordinates(city: string, country: string): Observable<{lat: number, lon: number} | null> {
    
    // Teste direto com dados conhecidos para circuitos
      const cityLower = city.toLowerCase();
      const countryLower = country.toLowerCase();
      
      // CIRCUITOS INTERNACIONAIS DA F1
      
      // Brasil - Interlagos
      if (cityLower.includes('interlagos') || cityLower.includes('são paulo') || cityLower.includes('sao paulo') || 
          (cityLower.includes('sao') && countryLower.includes('brasil'))) {
        return of({ lat: -23.5505, lon: -46.6333 });
      }
      
      // Monaco
      if (cityLower.includes('monaco') || cityLower.includes('monte carlo') || countryLower.includes('monaco')) {
        return of({ lat: 43.7384, lon: 7.4246 });
      }
      
      // Reino Unido - Silverstone
      if (cityLower.includes('silverstone') || cityLower.includes('northampton') || 
          (countryLower.includes('reino unido') || countryLower.includes('united kingdom'))) {
        return of({ lat: 52.0786, lon: -1.0169 });
      }
      
      // Itália - Monza
      if (cityLower.includes('monza') || (countryLower.includes('italia') || countryLower.includes('italy'))) {
        return of({ lat: 45.6156, lon: 9.2811 });
      }
      
      // Espanha - Barcelona
      if (cityLower.includes('barcelona') || cityLower.includes('montmelo') || countryLower.includes('espanha')) {
        return of({ lat: 41.5697, lon: 2.2611 });
      }
      
      // Áustria - Red Bull Ring
      if (cityLower.includes('spielberg') || countryLower.includes('austria')) {
        return of({ lat: 47.2197, lon: 14.7647 });
      }
      
      // Bélgica - Spa
      if (cityLower.includes('spa') || cityLower.includes('francorchamps') || countryLower.includes('belgica')) {
        return of({ lat: 50.4372, lon: 5.9714 });
      }
      
      // AUTÓDROMOS BRASILEIROS
      
      // Cascavel - PR
      if (cityLower.includes('cascavel') || cityLower.includes('cascavel')) {
        return of({ lat: -24.9555, lon: -53.4552 });
      }
      
      // Velopark - RS
      if (cityLower.includes('velopark') || cityLower.includes('nova santa rita')) {
        return of({ lat: -29.8833, lon: -51.2833 });
      }
      
      // Velo Città - SP
      if (cityLower.includes('velocitta') || cityLower.includes('velo citta') || cityLower.includes('mogi guacu') || cityLower.includes('mogi guaçu') ) {
        return of({ lat: -22.3686, lon: -46.9417 });
      }
      
      // Circuito dos Cristais - MG
      if (cityLower.includes('cristais') || cityLower.includes('curvelo')) {
        return of({ lat: -18.7575, lon: -44.4308 });
      }
      
      // Goiânia - GO
      if (cityLower.includes('goiania') || cityLower.includes('goiânia')) {
        return of({ lat: -16.6869, lon: -49.2648 });
      }
      
      // Brasília - DF
      if (cityLower.includes('brasilia') || cityLower.includes('brasília')) {
        return of({ lat: -15.7942, lon: -47.8822 });
      }
      
      // Belo Horizonte - MG (Mineirão)
      if (cityLower.includes('mineirao') || cityLower.includes('mineirão') || 
          (cityLower.includes('belo horizonte') && countryLower.includes('brasil'))) {
        return of({ lat: -19.9167, lon: -43.9345 });
      }
      
      // Tarumã - RS
      if (cityLower.includes('taruma') || cityLower.includes('tarumã') || cityLower.includes('viamao')) {
        return of({ lat: -30.0833, lon: -51.0167 });
      }
      
      // Londrina - PR
      if (cityLower.includes('londrina')) {
        return of({ lat: -23.3045, lon: -51.1696 });
      }
      
      // Campo Grande - MS
      if (cityLower.includes('campo grande') || cityLower.includes('orlando moura')) {
        return of({ lat: -20.4697, lon: -54.6201 });
      }
      
      // CIRCUITOS PORTUGUESES
      
      // Algarve - Portugal
      if (cityLower.includes('algarve') || cityLower.includes('portimao') || cityLower.includes('portimão')) {
        return of({ lat: 37.2272, lon: -8.6267 });
      }
      
      // Estoril - Portugal
      if (cityLower.includes('estoril')) {
        return of({ lat: 38.7506, lon: -9.3939 });
      }
      
      // Circuito de Potenza - Lima Duarte, MG
      if (cityLower.includes('potenza') || cityLower.includes('lima duarte')) {
        return of({ lat: -21.8547, lon: -43.8394 });
      }
      
      // CIRCUITOS IMSA
      
      // Daytona International Speedway
      if (cityLower.includes('daytona')) {
        return of({ lat: 29.1864, lon: -81.0712 });
      }
      
      // Sebring International Raceway
      if (cityLower.includes('sebring')) {
        return of({ lat: 27.4547, lon: -81.3481 });
      }
      
      // Long Beach Street Circuit
      if (cityLower.includes('long beach')) {
        return of({ lat: 33.7701, lon: -118.1937 });
      }
      
      // WeatherTech Raceway Laguna Seca
      if (cityLower.includes('laguna seca') || cityLower.includes('monterey')) {
        return of({ lat: 36.5844, lon: -121.7536 });
      }
      
      // Detroit Street Circuit
      if (cityLower.includes('detroit')) {
        return of({ lat: 42.3314, lon: -83.0458 });
      }
      
      // Watkins Glen International
      if (cityLower.includes('watkins glen')) {
        return of({ lat: 42.3369, lon: -76.9267 });
      }
      
      // Road America
      if (cityLower.includes('road america') || cityLower.includes('elkhart lake')) {
        return of({ lat: 43.8003, lon: -87.9889 });
      }
      
      // Michelin Raceway Road Atlanta
      if (cityLower.includes('road atlanta') || cityLower.includes('braselton')) {
        return of({ lat: 34.1547, lon: -83.7619 });
      }
      
      // Indianapolis Motor Speedway
      if (cityLower.includes('indianapolis')) {
        return of({ lat: 39.7950, lon: -86.2353 });
      }
      
      // Canadian Tire Motorsport Park
      if (cityLower.includes('bowmanville')) {
        return of({ lat: 43.9128, lon: -78.6881 });
      }
      
      // VIRginia International Raceway
      if (cityLower.includes('virginia international raceway') || cityLower.includes('alton')) {
        return of({ lat: 36.5881, lon: -79.2014 });
      }
      
      // CIRCUITOS WEC
      
      // Circuit de la Sarthe (Le Mans)
      if (cityLower.includes('le mans')) {
        return of({ lat: 47.9569, lon: 0.2075 });
      }
      
      // Fuji Speedway
      if (cityLower.includes('fuji') || cityLower.includes('oyama')) {
        return of({ lat: 35.3681, lon: 138.9275 });
      }
      
      // Bahrain International Circuit
      if (cityLower.includes('bahrain') || cityLower.includes('sakhir')) {
        return of({ lat: 26.0325, lon: 50.5106 });
      }
      
      // Losail International Circuit
      if (cityLower.includes('losail') || cityLower.includes('lusail') || cityLower.includes('qatar')) {
        return of({ lat: 25.4897, lon: 51.4539 });
      }
      
      // Circuit of the Americas
      if (cityLower.includes('austin') || cityLower.includes('circuit of the americas') || cityLower.includes('cota')) {
        return of({ lat: 30.1328, lon: -97.6411 });
      }
    
    // Normalizar caracteres especiais
    const normalizedCity = city
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ç/g, 'c')
      .replace(/Ç/g, 'C');
    
    
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(normalizedCity)}&count=1&language=en&format=json`;
    
    return this.http.get<any>(url).pipe(
      map(response => {
        if (response && 
            typeof response === 'object' && 
            'results' in response && 
            Array.isArray(response.results) && 
            response.results.length > 0) {
          
          const location = response.results[0];
          
          if (location && 
              typeof location.latitude === 'number' && 
              typeof location.longitude === 'number') {
            
            return {
              lat: location.latitude,
              lon: location.longitude
            };
          }
        }
        
        return null;
      }),
      catchError(error => {
        return of(null);
      })
    );
  }

  private getWeatherByCoordinates(lat: number, lon: number, date: string): Observable<WeatherData | null> {
    const url = `${this.baseUrl}?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,weather_code,wind_speed_10m_max&timezone=auto&start_date=${date}&end_date=${date}`;
    
    return this.http.get<WeatherResponse>(url).pipe(
      map(response => {
        if (response?.daily && 
            Array.isArray(response.daily.time) && 
            response.daily.time.length > 0) {
          
          const weatherCode = response.daily.weather_code[0];
          const weatherData = {
            temperature: Math.round(response.daily.temperature_2m_max[0]),
            weatherCode: weatherCode,
            windSpeed: Math.round(response.daily.wind_speed_10m_max[0]),
            humidity: 0, // Não disponível na resposta daily
            description: this.getWeatherDescription(weatherCode),
            icon: this.getWeatherIcon(weatherCode)
          };
          
          return weatherData;
        }
        
        return null;
      }),
      catchError(error => {
        return of(null);
      })
    );
  }

  private getWeatherDescription(code: number): string {
    const descriptions: { [key: number]: string } = {
      0: 'Céu limpo',
      1: 'Principalmente limpo',
      2: 'Parcialmente nublado',
      3: 'Nublado',
      45: 'Neblina',
      48: 'Neblina com geada',
      51: 'Garoa leve',
      53: 'Garoa moderada',
      55: 'Garoa intensa',
      56: 'Garoa gelada leve',
      57: 'Garoa gelada intensa',
      61: 'Chuva leve',
      63: 'Chuva moderada',
      65: 'Chuva intensa',
      66: 'Chuva gelada leve',
      67: 'Chuva gelada intensa',
      71: 'Neve leve',
      73: 'Neve moderada',
      75: 'Neve intensa',
      77: 'Granizo',
      80: 'Pancadas de chuva leves',
      81: 'Pancadas de chuva moderadas',
      82: 'Pancadas de chuva intensas',
      85: 'Pancadas de neve leves',
      86: 'Pancadas de neve intensas',
      95: 'Tempestade',
      96: 'Tempestade com granizo leve',
      99: 'Tempestade com granizo intenso'
    };
    return descriptions[code] || 'Condição desconhecida';
  }

  private getWeatherIcon(code: number): string {
    if (code === 0) return '☀️';
    if (code <= 3) return '⛅';
    if (code <= 48) return '🌫️';
    if (code <= 57) return '🌦️';
    if (code <= 67) return '🌧️';
    if (code <= 77) return '🌨️';
    if (code <= 86) return '🌦️';
    return '⛈️';
  }
}