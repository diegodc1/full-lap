import { Category } from './category.model';
import { Season } from './season.model';

export interface StandingDrivers {
  id: string;
  driverName: string;
  position: number;
  teamName: string;
  points: number;
  category: Category;
  season: Season;
}

export interface StandingDriversResponse {
  data: StandingDrivers[];
  success: boolean;
  message?: string;
}