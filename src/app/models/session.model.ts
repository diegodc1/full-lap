import { RaceEvent } from "./event.model";
import { Transmission } from "./transmission.model";

export interface Session {
  id?: string;
  name: string;
  description: string;
  datetime: string;
  transmission: Transmission;
  sessionType: string;
  event: RaceEvent;
}

export interface SessionRequest {
  name: string;
  description: string;
  datetime: string;
  transmissionId: string;
  sessionType: string;
  eventId: string;
}

export interface SessionRes {
  id: string;
  name: string;
  description: string;
  datetime: string;
  transmissions: Transmission[];
  sessionType: string;
  categoryName: string;
  eventId: string
}

export interface SessionCalendar {
  id: string;
  name: string;
  description: string;
  datetime: string;
  sessionType: string;
  categoryName: string;
  eventName: string
  categoryColor: string;
}
