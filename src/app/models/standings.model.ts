export interface DriverStanding {
  position: number;
  driver: {
    id: string;
    name: string;
    nationality: string;
    team: string;
    number: number;
  };
  points: number;
  wins: number;
  podiums: number;
  fastestLaps: number;
  dnfs: number;
}

export interface TeamStanding {
  position: number;
  team: {
    id: string;
    name: string;
    country: string;
    color: string;
  };
  points: number;
  wins: number;
  podiums: number;
}

export interface StandingsResponse {
  drivers: DriverStanding[];
  teams: TeamStanding[];
  season: {
    year: number;
    category: string;
  };
}

export interface StandingsRequest {
  categoryName: string;
  seasonYear: number;
}