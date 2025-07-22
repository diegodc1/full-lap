import { Category } from "./category.model";
import { Circuit } from "./circuit.model";
import { Season } from "./season.model";
import { Transmission } from "./transmission.model";

export interface RaceEvent {
  id?: string;
  name: string;
  description: string;
  dateInitial: string;
  dateFinal: string;
  city: string;
  country: string;
  season?: Season;
  category?: Category;
  circuit?: Circuit;
  transmission?: Transmission
}

export interface RaceEventRequest {
  name: string;
  description: string;
  dateInitial: string;
  dateFinal: string;
  city: string;
  country: string;
  seasonId: string;
  categoryId: string;
  circuitId: string;
  transmissionId: string
}
