import { Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StructuredDataService {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  private removeStructuredData(): void {
    const existingScript = this.document.getElementById('structured-data');
    if (existingScript) {
      existingScript.remove();
    }
  }

  private insertStructuredData(data: any): void {
    this.removeStructuredData();
    
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'structured-data';
    script.text = JSON.stringify(data);
    
    this.document.head.appendChild(script);
  }

  addRaceEvent(raceData: {
    name: string;
    circuit: string;
    country: string;
    city: string;
    dateStart: string;
    dateEnd: string;
    url: string;
  }): void {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "SportsEvent",
      "name": raceData.name,
      "description": `Grande Prêmio de Fórmula 1 - ${raceData.name}`,
      "startDate": raceData.dateStart,
      "endDate": raceData.dateEnd,
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": {
        "@type": "Place",
        "name": raceData.circuit,
        "address": {
          "@type": "PostalAddress",
          "addressCountry": raceData.country,
          "addressLocality": raceData.city
        }
      },
      "organizer": {
        "@type": "Organization",
        "name": "Formula 1",
        "url": "https://www.formula1.com"
      },
      "sport": "Formula 1",
      "url": raceData.url,
      "image": "https://fulllap.com/assets/images/f1-logo.jpg",
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "price": "0",
        "priceCurrency": "BRL",
        "description": "Acompanhe gratuitamente no FullLap"
      }
    };

    this.insertStructuredData(structuredData);
  }

  addDriverProfile(driverData: {
    name: string;
    nationality: string;
    team: string;
    birthDate?: string;
    url: string;
  }): void {
    const structuredData: any = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": driverData.name,
      "nationality": driverData.nationality,
      "jobTitle": "Piloto de Fórmula 1",
      "worksFor": {
        "@type": "Organization",
        "name": driverData.team
      },
      "sport": "Formula 1",
      "url": driverData.url,
      "image": `https://fulllap.com/assets/images/drivers/${driverData.name.toLowerCase().replace(/\s+/g, '-')}.jpg`
    };

    if (driverData.birthDate) {
      structuredData.birthDate = driverData.birthDate;
    }

    this.insertStructuredData(structuredData);
  }

  addTeamProfile(teamData: {
    name: string;
    country: string;
    drivers: string[];
    url: string;
  }): void {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "SportsTeam",
      "name": teamData.name,
      "sport": "Formula 1",
      "location": {
        "@type": "Country",
        "name": teamData.country
      },
      "member": teamData.drivers.map(driver => ({
        "@type": "Person",
        "name": driver,
        "jobTitle": "Piloto de Fórmula 1"
      })),
      "url": teamData.url,
      "image": `https://fulllap.com/assets/images/teams/${teamData.name.toLowerCase().replace(/\s+/g, '-')}.jpg`
    };

    this.insertStructuredData(structuredData);
  }

  addCircuitInfo(circuitData: {
    name: string;
    country: string;
    city: string;
    length: string;
    turns: number;
    url: string;
  }): void {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Place",
      "name": circuitData.name,
      "description": `Circuito de Fórmula 1 com ${circuitData.length} de extensão e ${circuitData.turns} curvas`,
      "address": {
        "@type": "PostalAddress",
        "addressCountry": circuitData.country,
        "addressLocality": circuitData.city
      },
      "geo": {
        "@type": "GeoCoordinates"
      },
      "url": circuitData.url,
      "image": `https://fulllap.com/assets/images/circuits/${circuitData.name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "Extensão",
          "value": circuitData.length
        },
        {
          "@type": "PropertyValue",
          "name": "Número de Curvas",
          "value": circuitData.turns.toString()
        }
      ]
    };

    this.insertStructuredData(structuredData);
  }

  addWebsiteInfo(): void {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "FullLap",
      "description": "Plataforma completa para acompanhar a Fórmula 1",
      "url": "https://fulllap.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://fulllap.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "publisher": {
        "@type": "Organization",
        "name": "FullLap",
        "logo": {
          "@type": "ImageObject",
          "url": "https://fulllap.com/assets/images/logo.png"
        }
      }
    };

    this.insertStructuredData(structuredData);
  }

  removeStructuredDataFromPage(): void {
    this.removeStructuredData();
  }
}