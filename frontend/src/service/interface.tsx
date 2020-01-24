export interface Password {
  old_password: string;
  new_password: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface Signup {
  email: string;
  password: string;
  username: string;
  phone: string;
}

export interface Contract {
  contract: string;
  userID: string;
  eventID: number;
}

export interface Event_Type {
  id: number;
  event_type: string;
}

export interface Event {
  id: number;
  event_name: string;
  location: string;
  event_start: Date;
  event_end: Date;
  personnel: string;
  description: string;
  archived: boolean;
  event_typeID: number;
}

export interface FullEvent {
  event_name: string;
  location: string;
  event_start: string;
  event_end: string;
  personnel: string;
  volunteers: number;
  description: string;
  event_typeID: number;
  artists: number[];
  riders: Rider[];
  tickets: Ticket[];
}

export interface Rider{
  additions: string;
  rider_typeID: number;
  userID: number
}
export interface Ticket{
  ticket_name: string;
  price: number;
  ticket_amount: number;
  date_start: string;
  date_end: string;
}

export interface Rider_Type {
  id: number;
  description: string;
}

export interface Riders {
  additions: string;
  rider_typeID: number;
  eventID: number;
  token?: string;
}

export interface Role {
  id: number;
  role_name: string;
}

export interface Ticket {
  id: number;
  ticket_name: string;
  price: number;
  ticket_amount: number;
  date_start: string;
  date_end: string;
  eventID: number;
}

export interface User {
  id?: number;
  username: string;
  email: string;
  phone: string;
  picture?: string;
  roleID: number;
  role?: string;
  pic_url?: string;
}
