import { Category } from "./category.model";
import { Circuit } from "./circuit.model";
import { Season } from "./season.model";
import { Session } from "./session.model";
import { Transmission } from "./transmission.model";

export interface RaceEvent {
  id?: string;
  name: string;
  description: string;
  dateInitial: string;
  dateFinal: string;
  city: string;
  country: string;
  countryFlagCode: string;
  season?: Season;
  category?: Category;
  circuit?: Circuit;
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

export interface RaceWeekEventRes {
  id: string;
  name: string;
  description: string;
  dateInitial: Date;
  dateFinal: Date;
  city: string;
  country: string;
  countryFlagCode: string;
  seasonName: string;
  category: Category;
  circuitName: string;
  circuitDescription: string;
  session: Session[]
}

export interface EventsCalendar {
  dateInic: Date,
  dateFinal: Date,
  events: EventCalendarResponse[]
}

export interface EventCalendarResponse {
  id: string;
  name: string;
  description: string;
  dateInitial: Date;
  dateFinal: Date;
  city: string;
  country: string;
  seasonName: string;
  categoryName: string;
  circuitName: string;
  categoryShort: string;
}