<div align="center">
  <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Capacitor-119EFF?style=for-the-badge&logo=capacitor&logoColor=white" alt="Capacitor" />
  <img src="https://img.shields.io/badge/PrimeNG-2196F3?style=for-the-badge&logo=primeng&logoColor=white" alt="PrimeNG" />
</div>

<h1 align="center">🏎️ Full Lap</h1>

<p align="center">
  <strong>O seu portal definitivo para acompanhar o calendário dos principais campeonatos de automobilismo do mundo!</strong>
</p>

## 🏁 Sobre o Projeto

O **Full Lap** é uma plataforma feita para os apaixonados por velocidade. Ele reúne em um só lugar os calendários das principais categorias do automobilismo mundial (Fórmula 1, WEC, MotoGP, Stock Car, Indy, entre outras). Nunca mais perca o horário de uma corrida!

No Full Lap, você encontra:
- 📅 **Calendário Completo**: Datas de treinos livres, classificações e corridas.
- 📺 **Onde Assistir**: Informações sobre as emissoras e serviços de streaming que transmitirão os eventos na sua região.
- ⏰ **Fuso Horário Automático**: Horários já convertidos para o seu fuso local.
- 🛣️ **Informações das Pistas**: Detalhes sobre os circuitos, traçados e curiosidades.

## 🛠️ Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- **[Angular 19](https://angular.dev/)**: Framework principal para a construção da interface.
- **[Tailwind CSS](https://tailwindcss.com/)**: Para estilização rápida, responsiva e moderna.
- **[PrimeNG](https://primeng.org/)**: Biblioteca de componentes UI robustos.
- **[FullCalendar](https://fullcalendar.io/)**: Para renderização interativa dos calendários de corridas.
- **[Capacitor](https://capacitorjs.com/)**: Para empacotamento e compilação do projeto para dispositivos móveis (Android/iOS).

## 🚀 Como Executar o Projeto

Siga os passos abaixo para rodar o projeto localmente na sua máquina:

### Pré-requisitos
- Node.js (versão 18 ou superior)
- Angular CLI instalado globalmente (`npm install -g @angular/cli`)

### Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/diegodc1/full-lap.git
   ```

2. Acesse a pasta do projeto:
   ```bash
   cd full-lap
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run start
   ```

5. Abra o seu navegador e acesse: `http://localhost:4200`

## 📱 Versão Mobile

O projeto está configurado com o Capacitor para geração do app Android. Para compilar e sincronizar o projeto mobile, execute:

```bash
npm run build
npx cap sync android
npx cap open android
```

---

<p align="center">Desenvolvido com ⛽ e adrenalina!</p>
