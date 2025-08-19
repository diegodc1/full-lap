import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router
  ) { }

  updateTitle(title: string): void {
    this.title.setTitle(`${title} | FullLap`);
  }

  updateMetaTags(config: {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: string;
  }): void {
    if (config.title) {
      this.updateTitle(config.title);
      this.meta.updateTag({ property: 'og:title', content: `${config.title} | FullLap` });
      this.meta.updateTag({ name: 'twitter:title', content: `${config.title} | FullLap` });
    }

    if (config.description) {
      this.meta.updateTag({ name: 'description', content: config.description });
      this.meta.updateTag({ property: 'og:description', content: config.description });
      this.meta.updateTag({ name: 'twitter:description', content: config.description });
    }

    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }

    if (config.image) {
      this.meta.updateTag({ property: 'og:image', content: config.image });
      this.meta.updateTag({ name: 'twitter:image', content: config.image });
    }

    if (config.url) {
      this.meta.updateTag({ property: 'og:url', content: config.url });
      // Para canonical link, precisamos usar o DOM diretamente
      const existingCanonical = document.querySelector('link[rel="canonical"]');
      if (existingCanonical) {
        existingCanonical.setAttribute('href', config.url);
      } else {
        const link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        link.setAttribute('href', config.url);
        document.head.appendChild(link);
      }
    }

    if (config.type) {
      this.meta.updateTag({ property: 'og:type', content: config.type });
    }
  }

  updateRacePageMeta(raceData: {
    name: string;
    circuit: string;
    date: string;
    country: string;
  }): void {
    const title = `${raceData.name} - ${raceData.circuit}`;
    const description = `${raceData.name} no ${raceData.circuit}, ${raceData.country} - ${raceData.date}. Acompanhe transmissões ao vivo, horários de treinos, classificação e corrida. Resultados em tempo real, estatísticas e análises completas do automobilismo.`;
    const keywords = `${raceData.name}, ${raceData.circuit}, ${raceData.country}, automobilismo, corrida, motorsport, Stock Car, NASCAR Brasil, Porsche Cup, Fórmula 1, ${raceData.date}`;
    
    this.updateMetaTags({
      title,
      description,
      keywords,
      type: 'article',
      url: `https://fulllap.com${this.router.url}`
    });
  }

  updateDriverPageMeta(driverData: {
    name: string;
    team: string;
    nationality: string;
  }): void {
    const title = `${driverData.name} - ${driverData.team}`;
    const description = `${driverData.name} - Piloto ${driverData.nationality} da ${driverData.team}. Estatísticas detalhadas, histórico de resultados, vitórias, pódios, pole positions e campeonatos no automobilismo. Acompanhe a carreira completa do piloto.`;
    const keywords = `${driverData.name}, ${driverData.team}, ${driverData.nationality}, piloto, automobilismo, motorsport, Stock Car, NASCAR Brasil, Porsche Cup, Fórmula 1, estatísticas`;
    
    this.updateMetaTags({
      title,
      description,
      keywords,
      type: 'profile',
      url: `https://fulllap.com${this.router.url}`
    });
  }

  updateTeamPageMeta(teamData: {
    name: string;
    drivers: string[];
    country: string;
  }): void {
    const title = `${teamData.name} - Equipe`;
    const description = `${teamData.name} - Equipe do automobilismo com pilotos ${teamData.drivers.join(' e ')}. História da escuderia, estatísticas de construtores, vitórias, campeonatos e desenvolvimento técnico. Análise completa da performance da equipe.`;
    const keywords = `${teamData.name}, ${teamData.drivers.join(', ')}, ${teamData.country}, equipe, automobilismo, motorsport, Stock Car, NASCAR Brasil, Porsche Cup, Fórmula 1, construtores`;
    
    this.updateMetaTags({
      title,
      description,
      keywords,
      type: 'organization',
      url: `https://fulllap.com${this.router.url}`
    });
  }

  updateCircuitPageMeta(circuitData: {
    name: string;
    country: string;
    length: string;
    turns: number;
  }): void {
    const title = `${circuitData.name} - ${circuitData.country}`;
    const description = `Circuito ${circuitData.name}, ${circuitData.country} - ${circuitData.length} de extensão com ${circuitData.turns} curvas. Layout detalhado, características técnicas, recordes de volta, história das corridas e análise das principais zonas de ultrapassagem.`;
    const keywords = `${circuitData.name}, ${circuitData.country}, circuito, pista, automobilismo, motorsport, Stock Car, NASCAR Brasil, Porsche Cup, Fórmula 1, ${circuitData.turns} curvas`;
    
    this.updateMetaTags({
      title,
      description,
      keywords,
      type: 'place',
      url: `https://fulllap.com${this.router.url}`
    });
  }

  resetToDefault(): void {
    this.updateMetaTags({
      title: 'Acompanhe o Automobilismo em Tempo Real',
      description: 'FullLap - Sua plataforma completa para Fórmula 1, Stock Car, NASCAR e automobilismo mundial. Calendário atualizado, transmissões ao vivo, resultados em tempo real, estatísticas detalhadas de pilotos e equipes, análises técnicas e cobertura completa das principais categorias do motorsport.',
      keywords: 'Fórmula 1, F1, Stock Car, NASCAR Brasil, Porsche Cup, automobilismo, corridas, ao vivo, resultados, calendário, pilotos, equipes, circuitos, transmissão, FullLap',
      type: 'website',
      url: 'https://fulllap.com'
    });
  }
}