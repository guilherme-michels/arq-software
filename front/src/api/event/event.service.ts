import { eventsAPI } from "../index";

interface Event {
  id: string;
  name?: string;
  date: Date;
  location: string;
}

export function subscribeEvent(eventId: string) {
  return eventsAPI
    .get<Event>(`/events/${eventId}/subscribe`)
    .then((res) => res.data);
}

export function cancelSubscription(eventId: string) {
  return eventsAPI
    .get<Event>(`/events/${eventId}/cancel-subscription`)
    .then((res) => res.data);
}

export function getEvents() {
  return eventsAPI.get<Event[]>(`/events`).then((res) => res.data);
}
