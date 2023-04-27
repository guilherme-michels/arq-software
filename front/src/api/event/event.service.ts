import { eventsAPI } from "../index";

export interface Event {
  id: string;
  name?: string;
  date: Date;
  location: string;
  subscribed: boolean;
  attended: boolean;
}

export function subscribeEvent(eventId: string) {
  return eventsAPI.post(`/events/${eventId}/subscribe`).then((res) => res.data);
}

export function cancelSubscription(eventId: string) {
  return eventsAPI
    .delete(`/events/${eventId}/subscribe`)
    .then((res) => res.data);
}

export function getEvents() {
  return eventsAPI.get<Event[]>(`/events`).then((res) => res.data);
}
